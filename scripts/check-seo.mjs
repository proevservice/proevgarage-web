import assert from "node:assert/strict";
import {spawn} from "node:child_process";
import {readFile} from "node:fs/promises";
const base="http://127.0.0.1:3100",site="https://www.proevgarage.com",preview=process.env.VERCEL_ENV==="preview";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","3100"],{stdio:"ignore"});
const readJson=async p=>JSON.parse(await readFile(p,"utf8"));
const settings=await readJson("content/settings.json");
function schemas(html){return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1])).flatMap(s=>s["@graph"]||[s]);}
function visible(html){return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;/g,"'");}
try{
 for(let i=0;i<90;i++){try{if((await fetch(base)).ok)break;}catch{}if(i===89)throw Error("SEO test server did not start");await new Promise(r=>setTimeout(r,500));}
 const sitemap=await (await fetch(base+"/sitemap.xml")).text();
 assert.ok(sitemap.includes(site+"/services/ev-air-conditioning"));
 assert.ok(!/designs|directions|vercel\.app/.test(sitemap),"only canonical public pages in sitemap");
 const paths=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
 const titles=new Set(),assets=new Set();
 for(const path of paths){
  const response=await fetch(base+path);assert.equal(response.status,200,path);
  const html=await response.text(),data=schemas(html),text=visible(html);
  assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,"one heading "+path);
  const title=html.match(/<title>(.*?)<\/title>/)?.[1];assert.ok(title,"title "+path);assert.ok(!titles.has(title),"unique title "+path);titles.add(title);
  const canonicals=[...html.matchAll(/<link\b(?=[^>]*rel="canonical")[^>]*>/g)];assert.equal(canonicals.length,1,"one canonical "+path);
  assert.ok(canonicals[0][0].includes('href="'+site+(path==="/"?"":path)),"canonical "+path);
  const robots=html.match(/<meta\b(?=[^>]*name="robots")[^>]*>/)?.[0]||"";
  assert.equal(robots.includes("noindex"),preview,"index policy "+path);
  const business=data.filter(s=>s["@type"]==="AutoRepair");assert.equal(business.length,1,"one business "+path);
  assert.equal(business[0].name,settings.brand_name);assert.equal(business[0].address.streetAddress,settings.address);assert.equal(business[0].hasMap,settings.maps);
  assert.equal(business[0].telephone,"+66989794116");assert.equal(business[0].aggregateRating,undefined);assert.equal(business[0].review,undefined);
  assert.ok(!business[0].openingHoursSpecification[0].dayOfWeek.includes("Wednesday"));
  for(const s of data){
   assert.ok(!JSON.stringify(s).includes("vercel.app"),"no preview identity "+path);
   for(const src of [s.image,s.logo].flat().filter(x=>typeof x==="string"))if(src.startsWith(site+"/"))assets.add(new URL(src).pathname);
   if(s["@type"]==="FAQPage")for(const q of s.mainEntity){assert.ok(text.includes(q.name),"visible FAQ question "+path);assert.ok(text.includes(q.acceptedAnswer.text),"visible FAQ answer "+path);}
  }
  if(path.startsWith("/services/")){
   const service=data.find(s=>s["@type"]==="Service");assert.equal(service?.provider["@id"],site+"/#business");assert.equal(service?.url,site+path);
   assert.ok(data.some(s=>s["@type"]==="BreadcrumbList"));assert.ok(data.some(s=>s["@type"]==="FAQPage"));
  }
  if(path.startsWith("/blog/")){const article=data.find(s=>s["@type"]==="BlogPosting");assert.ok(article?.datePublished);assert.ok(text.includes("#บทความ"));assert.ok(article?.isBasedOn?.startsWith("https://www.facebook.com/"));assert.ok(html.includes("ดูภาพที่ 2"));assert.equal(article?.publisher["@id"],site+"/#business");assert.ok(data.some(s=>s["@type"]==="BreadcrumbList"));}
  if(path.startsWith("/work/")){assert.ok(data.some(s=>s["@type"]==="Article"));assert.ok(text.includes("#ผลงานPROEV"));assert.ok(data.some(s=>s["@type"]==="BreadcrumbList"));}
 }
 for(const path of assets)assert.equal((await fetch(base+path)).status,200,"schema image "+path);
 assert.ok(!sitemap.includes("/blog/ev-battery-degradation-signs"));
 assert.equal((await fetch(base+"/blog/ev-battery-degradation-signs")).status,404);
 const robots=await (await fetch(base+"/robots.txt")).text();
 if(preview){assert.ok(robots.includes("Disallow: /"));assert.ok(!robots.includes("Sitemap:"));}
 else {assert.ok(robots.includes("User-Agent: OAI-SearchBot"));assert.ok(robots.includes("Allow: /"));assert.ok(robots.includes("Disallow: /designs"));assert.ok(robots.includes("Sitemap: "+site+"/sitemap.xml"));}
 console.log("PASS SEO "+(preview?"preview":"production")+": "+paths.length+" canonical pages, visible FAQs, business identity, schema images, articles, cases and crawl rules");
}finally{server.kill();}
