import {sourceTitle} from "./facebook-title.mjs";
import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createHash} from "node:crypto";
import {IMPORT_TAG, ARTICLE_TAG, classifyPost} from "./facebook-tag.mjs";
import {facebookRequestError} from "./facebook-auth.mjs";
// Import the largest available Facebook photo rendition for clear cover crops.
import {getPostPhotos} from "./facebook-media.mjs";
export function toCase(post, tag = IMPORT_TAG){
 if(!/^\d+_\d+$/.test(post.id||""))throw new Error("Invalid post ID");
 const body=(post.message||"").trim();
 if(!body)return null;
 const clean=[tag,ARTICLE_TAG].reduce((text,tag)=>text.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), ""),body);
 const title=sourceTitle(clean);
 if(!title)return null;
 const link=new URL(post.permalink_url);
 if(!["www.facebook.com","facebook.com","m.facebook.com"].includes(link.hostname)||link.protocol!=="https:")throw new Error("Invalid permalink");
 const date=new Date(post.created_time);
 if(Number.isNaN(date.getTime()))throw new Error("Invalid post date");
 const updated=new Date(post.updated_time||post.created_time);
 if(Number.isNaN(updated.getTime()))throw new Error("Invalid update date");
 return {slug:"facebook-"+post.id,title,model:"PRO EV SERVICE",summary:body.replace(/\s+/g," ").slice(0,180),body,sourceUrl:link.href,date:date.toISOString(),updated:updated.toISOString()};
}
export async function sync({root=process.cwd(), fetchImpl=fetch, env=process.env}={}){
 const token=env.FACEBOOK_PAGE_ACCESS_TOKEN;
 const page=env.FACEBOOK_PAGE_ID;
 const version=env.FACEBOOK_GRAPH_VERSION;
 if(!token||!/^\d+$/.test(page||"")||!/^v\d+\.\d+$/.test(version||""))throw new Error("Set FACEBOOK_PAGE_ACCESS_TOKEN, FACEBOOK_PAGE_ID and FACEBOOK_GRAPH_VERSION in server secrets");
 const tag=env.FACEBOOK_IMPORT_TAG||IMPORT_TAG;
 const dirs={work:path.resolve(root,"content/work"),articles:path.resolve(root,"content/articles")};
 const images=path.resolve(root,"public/images/facebook");
 let after;const records=[];let finished=false;
 for(let n=0;n<50;n++){
  const url=new URL("https://graph.facebook.com/"+version+"/"+page+"/posts");
  url.searchParams.set("fields","id,message,created_time,updated_time,permalink_url,full_picture");
  url.searchParams.set("limit","100");if(after)url.searchParams.set("after",after);
  const res=await fetchImpl(url,{headers:{Authorization:"Bearer "+token},signal:AbortSignal.timeout(30000)});
  if(!res.ok)throw await facebookRequestError(res);
  const json=await res.json();if(!Array.isArray(json.data))throw new Error("Invalid Facebook response");
  for(const post of json.data){
   const kinds=[];
   if(classifyPost(post,tag).status==="publish")kinds.push("work");
   if(classifyPost(post,ARTICLE_TAG).status==="publish")kinds.push("articles");
   if(!kinds.length)continue;
   const item=toCase(post,tag);if(!item)continue;
   records.push({item,post,kinds});
  }
  if(!json.paging?.next){finished=true;break;}
  const cursor=json.paging?.cursors?.after;if(!cursor||cursor===after)throw new Error("Invalid Facebook pagination");
  after=cursor;
 }
 if(!finished)throw new Error("Pagination limit reached; no content changed");
 // Validate and download all selected records before changing published content.
 const seen={work:new Set(),articles:new Set()};const stagedImages=new Map();
 for(const {item,post,kinds} of records){
  for(const kind of kinds)seen[kind].add(item.slug+".json");
  const media=await getPostPhotos(post,{token,version,fetchImpl});
  item.images=[];item.videoUrls=media.videos;
  for(const picture of media.photos){
   const u=new URL(picture);
   if(u.protocol!=="https:"||!/(^|\.)(fbcdn\.net|fbsbx\.com)$/.test(u.hostname))throw new Error("Untrusted image host");
   const r=await fetchImpl(u,{redirect:"error",signal:AbortSignal.timeout(30000)});
   if(!r.ok)throw new Error("Image download failed");
   const mime=r.headers.get("content-type")?.split(";")[0];
   const ext={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"}[mime];
   if(!ext)throw new Error("Unsupported image format");
   if(Number(r.headers.get("content-length")||0)>12000000)throw new Error("Image too large");
   const reader=r.body.getReader();let size=0;const parts=[];
   for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>12000000){await reader.cancel();throw new Error("Image too large");}parts.push(value);}
   const bytes=Buffer.concat(parts);
   const digest=createHash("sha256").update(bytes).digest("hex").slice(0,16);
   const file=item.slug+"-"+digest+"."+ext;stagedImages.set(file,bytes);
   if(!item.images.includes("/images/facebook/"+file))item.images.push("/images/facebook/"+file);
  }
  item.image=item.images[0];
 }
 for(const dir of Object.values(dirs))await fs.mkdir(dir,{recursive:true});await fs.mkdir(images,{recursive:true});
 for(const [file,bytes] of stagedImages)await fs.writeFile(path.join(images,file),bytes);
 for(const {item,kinds} of records)for(const kind of kinds)await fs.writeFile(path.join(dirs[kind],item.slug+".json"),JSON.stringify(item,null,2)+"\n");
 // Remove posts deleted from Facebook or no longer carrying the import tag, only after a complete fetch.
 for(const [kind,dir] of Object.entries(dirs))for(const file of await fs.readdir(dir))if(/^facebook-\d+_\d+\.json$/.test(file)&&!seen[kind].has(file))await fs.unlink(path.join(dir,file));
 for(const file of await fs.readdir(images))if(/^facebook-\d+_\d+(?:-[a-f0-9]{16})?\.(jpg|png|webp)$/.test(file)&&!stagedImages.has(file))await fs.unlink(path.join(images,file));
 console.log("Facebook posts synchronized: work="+seen.work.size+", articles="+seen.articles.size);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))sync().catch(e=>{console.error(e.message);process.exitCode=1;});

