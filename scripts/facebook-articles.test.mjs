import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {sync,toCase} from "./sync-facebook.mjs";
import {IMPORT_TAG,ARTICLE_TAG,classifyPost} from "./facebook-tag.mjs";
const env={FACEBOOK_PAGE_ID:"123",FACEBOOK_PAGE_ACCESS_TOKEN:"test-placeholder",FACEBOOK_GRAPH_VERSION:"v26.0"};
const source={id:"123_456",message:"ดูแลรถไฟฟ้า\nเนื้อหาครบ\n"+ARTICLE_TAG,created_time:"2026-10-26T00:00:00Z",permalink_url:"https://www.facebook.com/proevservice/posts/456",full_picture:"https://scontent.fbcdn.net/article.jpg"};
const json=data=>new Response(JSON.stringify(data),{headers:{"content-type":"application/json"}});
test("exact article tag boundaries",()=>{for(const message of ["#บทความ","#บทความ\nเนื้อหา","เนื้อหา (#บทความ)"])assert.equal(classifyPost({message},ARTICLE_TAG).status,"publish");for(const message of ["#บทความอื่น","##บทความ","บทความ","https://example.com/#บทความอื่น"])assert.equal(classifyPost({message},ARTICLE_TAG).status,"skip");});
test("dual-tag post survives in articles when removed from work, with shared photos retained",async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),"proev-article-"));
 try{
  let posts=[{...source,message:"ชื่อบทความ\n"+IMPORT_TAG+" "+ARTICLE_TAG}];
  const fetchImpl=async url=>String(url).startsWith("https://graph.facebook.com/")?json({data:posts}):new Response("photo",{headers:{"content-type":"image/jpeg"}});
  const run=()=>sync({root,env,fetchImpl}),work=path.join(root,"content/work/facebook-123_456.json"),article=path.join(root,"content/articles/facebook-123_456.json");
  await run();assert.equal((await fs.readFile(work,"utf8")),(await fs.readFile(article,"utf8")));assert.equal(toCase(posts[0]).title,"ชื่อบทความ");
  posts=[source];await run();await assert.rejects(fs.access(work));const a=JSON.parse(await fs.readFile(article,"utf8"));assert.equal(a.body,source.message);await fs.access(path.join(root,"public",a.image));
  posts=[{...source,message:"แก้ไขบทความ\nเนื้อหาใหม่\n"+ARTICLE_TAG,updated_time:"2026-10-26T01:00:00Z",full_picture:"https://scontent.fbcdn.net/changed.jpg"}];
  await run();const updated=JSON.parse(await fs.readFile(article,"utf8"));assert.equal(updated.title,"แก้ไขบทความ");assert.equal(updated.updated,"2026-10-26T01:00:00.000Z");
  posts=[{...source,message:"ถอดแท็กแล้ว"}];await run();await assert.rejects(fs.access(article));assert.deepEqual(await fs.readdir(path.join(root,"public/images/facebook")),[]);
  posts=[source];await run();await fs.access(article);posts=[];await run();await assert.rejects(fs.access(article));
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test("article-only posts do not replace independent work, and failures preserve both collections",async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),"proev-article-safe-"));
 try{
  const work={...source,id:"123_789",message:"งานซ่อม\n"+IMPORT_TAG};
  const fetchImpl=async url=>String(url).startsWith("https://graph.facebook.com/")?json({data:[source,work]}):new Response("photo",{headers:{"content-type":"image/jpeg"}});
  await sync({root,env,fetchImpl});
  const workFile=path.join(root,"content/work/facebook-123_789.json"),articleFile=path.join(root,"content/articles/facebook-123_456.json");
  await assert.rejects(fs.access(path.join(root,"content/work/facebook-123_456.json")));
  const beforeWork=await fs.readFile(workFile,"utf8"),beforeArticle=await fs.readFile(articleFile,"utf8");
  let calls=0;await assert.rejects(sync({root,env,fetchImpl:async()=>++calls===1?json({data:[],paging:{next:"present",cursors:{after:"later"}}}):new Response("",{status:503})}));
  assert.equal(await fs.readFile(workFile,"utf8"),beforeWork);assert.equal(await fs.readFile(articleFile,"utf8"),beforeArticle);
  await assert.rejects(sync({root,env,fetchImpl:async url=>String(url).startsWith("https://graph.facebook.com/")?json({data:[source,work]}):new Response("",{status:503})}));
  assert.equal(await fs.readFile(workFile,"utf8"),beforeWork);assert.equal(await fs.readFile(articleFile,"utf8"),beforeArticle);
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
