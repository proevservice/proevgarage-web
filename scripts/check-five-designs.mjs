import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";
import sharp from "sharp";
import ts from "typescript";
import vm from "node:vm";
import {readFile} from "node:fs/promises";
const pushes=[];
const trackingContext={exports:{},process:{env:{}},window:{dataLayer:pushes},console:{log(){},warn(){}}};
vm.runInNewContext(ts.transpileModule(await readFile("src/lib/tracking.ts","utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,trackingContext);
assert.equal(pushes.length,0,"loading tracking creates no lead");
for(const [type,event] of Object.entries({phone_call:"generate_lead_call",line_chat:"generate_lead_line",facebook_chat:"generate_lead_message",navigation:"generate_lead_navigation"})){
 trackingContext.exports.sendLeadEvent(type,"qa");
 trackingContext.exports.sendLeadEvent(type,"qa");
 assert.equal(pushes.filter(item=>item.event===event).length,1,"one event per immediate double click");
}
console.log("PASS isolated conversion names and duplicate suppression");
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY="1";
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","3000"],{stdio:"ignore"});
let browser;
const base="http://127.0.0.1:3000";
const out="public/design-previews";
const names=["Signature","Precision","Workshop Journal","Private Garage","Service Desk"];
const results=[];
try {
 for(let i=0;i<90;i++){try{if((await fetch(base+"/designs")).ok)break;}catch{}if(i===89)throw Error("preview server did not start");await new Promise(r=>setTimeout(r,500));}
 await mkdir(out,{recursive:true});
 browser=await chromium.launch();
 let page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 await page.route("**/*",route=>new URL(route.request().url()).hostname==="127.0.0.1"?route.continue():route.abort());
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 async function check(path){
  const response=await page.goto(base+path,{waitUntil:"load"});
  assert.equal(response.status(),200,path);
  await page.locator("h1").waitFor({state:"visible"});
  await page.waitForFunction(()=>document.fonts.status==="loaded",null,{timeout:20000});
  assert.equal(await page.locator("h1").count(),1,"one h1: "+path);
  assert.ok((await page.locator('meta[name="robots"]').getAttribute("content")).includes("noindex"));
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(overflow)console.log("OVERFLOW "+path+" "+JSON.stringify(await page.evaluate(()=>[...document.querySelectorAll("*")].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(-16).map(e=>({tag:e.tagName,class:e.className,left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,width:getComputedStyle(e).width,text:e.textContent?.slice(0,60)})))));
  assert.equal(overflow,false,"no overflow: "+path);
 }
 for(const part of ["","services","work","blog","contact","booking","problems","vehicles","ev-repair"]){
  await check("/"+part);
  if(!part){await page.waitForFunction(()=>[...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight;}).every(i=>i.complete&&i.naturalWidth>0));await page.screenshot({path:out+"/version3-home.png"});}
 }

 await page.goto(base+"/",{waitUntil:"load"});
 // Exercise actual header clicks after a page transition, not just direct URLs.
 for(const part of ["work","blog","contact","booking","services",""]){
  const href="/"+part;
  await page.locator('#design-navigation a[href="'+href+'"]').click();
  await page.waitForURL(base+href);
  await page.locator("h1").waitFor({state:"visible"});
 }
 for(const size of [{width:1366,height:768},{width:1280,height:720}]){
  await page.setViewportSize(size);
  for(const part of ["contact","booking"]){
   await check("/"+part);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1),"compact page fits viewport: "+part+" "+size.width);
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 await page.goto(base+"/services",{waitUntil:"load"});
 await page.locator("#ev-air-conditioning a[aria-label]").click();
 await page.waitForURL(new RegExp("^"+base+"/work/facebook-"));
 assert.equal(await page.locator('button[aria-label^="ดูภาพที่"]').count(),9);
 const coverBefore=await page.getByRole("button",{name:"ขยายรูปภาพ",exact:true}).evaluate(e=>({width:e.getBoundingClientRect().width,src:e.querySelector("img").getAttribute("src")}));
 await page.getByRole("button",{name:"ขยายรูปภาพ",exact:true}).click();
 assert.equal(await page.getByRole("button",{name:"ขยายรูปภาพ",exact:true}).evaluate(e=>e.getBoundingClientRect().width),coverBefore.width,"opening viewer preserves page width");
 await page.getByRole("button",{name:"ปิด ✕",exact:true}).focus();
 await page.keyboard.press("Shift+Tab");
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("aria-label")),"ภาพถัดไป");
 await page.keyboard.press("Tab");
 assert.equal(await page.evaluate(()=>document.activeElement?.textContent),"ปิด ✕");
 await page.keyboard.press("Escape");
 assert.equal(await page.getByRole("dialog").count(),0);
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute("aria-label")),"ขยายรูปภาพ");
 await page.getByRole("button",{name:"ดูภาพที่ 8",exact:true}).click();
 assert.equal(await page.getByRole("dialog").count(),1,"thumbnail opens viewer");
 assert.equal(await page.getByRole("button",{name:"ขยายรูปภาพ",exact:true}).evaluate(e=>e.querySelector("img").getAttribute("src")),coverBefore.src,"viewer does not replace the page cover");
 const viewerBefore=await page.getByRole("dialog").locator("img").boundingBox();
 await page.keyboard.press("ArrowRight");
 const viewerAfter=await page.getByRole("dialog").locator("img").boundingBox();
 assert.equal(viewerAfter.width,viewerBefore.width,"viewer image frame width stays fixed");
 assert.equal(viewerAfter.height,viewerBefore.height,"viewer image frame height stays fixed");
 await page.keyboard.press("Escape");
 await page.setViewportSize({width:390,height:844});
 for(const part of ["","services","work","blog","contact","booking"])await check("/"+part);
 await page.setViewportSize({width:1440,height:1000});
 console.log("PASS unified Version 3 primary pages, mobile, gallery and preserved ad landing");
 await check("/designs/4/services");
 for(let id=1;id<=5;id++){
  if(id>1){await page.close();page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});await page.route("**/*",route=>new URL(route.request().url()).hostname==="127.0.0.1"?route.continue():route.abort());page.on("pageerror",e=>errors.push(e.message));}
  for(const part of ["","services","work","blog","contact","booking","problems","vehicles"]){
   await check("/designs/"+id+(part?"/"+part:""));
   if(!part){await page.waitForFunction(()=>[...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight;}).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:20000});await page.screenshot({path:out+"/design-"+id+".png"});}
  }
  await page.goto(base+"/designs/"+id);
  await page.locator("#design-navigation").getByRole("link",{name:"บริการของเรา",exact:true}).click();
  await page.waitForURL(base+"/designs/"+id+"/services");
  await page.locator("#ev-air-conditioning a[aria-label]").click();
  await page.waitForURL(new RegExp("/designs/"+id+"/work/facebook-"));
  assert.equal(await page.locator('button[aria-label^="ดูภาพที่"]').count(),9,"full original gallery");
  assert.ok((await page.locator("main").innerText()).includes("#ผลงานPROEV"),"full original post");
  await page.getByRole("button",{name:"ดูภาพที่ 9",exact:true}).click();
  assert.equal(await page.getByRole("button",{name:"ดูภาพที่ 9",exact:true}).getAttribute("aria-pressed"),"true");
  await page.goto(base+"/designs/"+id+"/contact");
  assert.ok(await page.locator('a[href="tel:098-9794116"]').count());
  assert.ok(await page.locator('a[href="https://line.me/R/ti/p/@869msrge"]').count());
  assert.ok(await page.locator('a[href="https://m.me/proevservice"]').count());
  await page.setViewportSize({width:390,height:844});
  for(const part of ["","services","contact","booking"]){
   await check("/designs/"+id+(part?"/"+part:""));
   if(!part){await page.waitForFunction(()=>[...document.images].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight;}).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:20000});await page.screenshot({path:out+"/design-"+id+"-mobile.png"});}
  }
  await page.goto(base+"/designs/"+id);
  await page.getByRole("button",{name:"เมนู +",exact:true}).click();
  await page.locator("#design-navigation").getByRole("link",{name:"ผลงานซ่อม",exact:true}).click();
  await page.waitForURL(base+"/designs/"+id+"/work");
  await page.setViewportSize({width:1440,height:1000});
  results.push({design:id,name:names[id-1],pages:"8 desktop / 4 mobile",navigation:true,galleryPhotos:9,conversionLinks:"unchanged"});
  console.log("PASS design "+id+" "+names[id-1]);
 }
 assert.deepEqual(errors,[],"browser errors");
 const tiles=[];
 for(let id=1;id<=5;id++){
  const screenshot=await sharp(out+"/design-"+id+".png").resize(600,417).toBuffer();
  const label=Buffer.from('<svg width="600" height="40"><rect width="600" height="40" fill="#182431"/><text x="18" y="27" fill="#f2f5f3" font-family="Arial" font-size="18">'+id+' / '+names[id-1]+'</text></svg>');
  const tile=await sharp({create:{width:600,height:457,channels:3,background:"#0b1220"}}).composite([{input:label,top:0,left:0},{input:screenshot,top:40,left:0}]).png().toBuffer();
  tiles.push({input:tile,left:((id-1)%2)*600,top:Math.floor((id-1)/2)*457});
 }
 await sharp({create:{width:1200,height:1371,channels:3,background:"#0b1220"}}).composite(tiles).png().toFile(out+"/comparison.png");
 await writeFile(out+"/validation.json",JSON.stringify({results,browserErrors:errors},null,2));
 console.log("PASS all five design previews, 60 page checks, original gallery and conversion URL contracts");
} finally {await browser?.close();server.kill();}
