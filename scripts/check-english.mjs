import {chromium} from "playwright";
import {spawn} from "node:child_process";
import {mkdir} from "node:fs/promises";
import assert from "node:assert/strict";
const server=spawn("node",["node_modules/next/dist/bin/next","start","-p","3100"],{stdio:"inherit",env:{...process.env,NEXT_PUBLIC_GTM_ID:"GTM-P7WNQQNH"}});
let browser;
try{
 for(let count=0;count<120;count++){try{if((await fetch("http://localhost:3100/en")).ok)break;}catch{}if(count===119)throw Error("Server did not start");await new Promise(resolve=>setTimeout(resolve,500));}
 await mkdir("output/english-qa",{recursive:true});
 browser=await chromium.launch();
 const context=await browser.newContext({locale:"en-US"});
 await context.route(/https?:\\/\\/[^/]*(googletagmanager|google-analytics|googleadservices|doubleclick|googlesyndication)\\./,route=>route.abort());
 const page=await context.newPage();
 await page.goto("http://localhost:3100/");
 assert.equal(new URL(page.url()).pathname,"/en");
 assert.equal(await page.locator("html").getAttribute("lang"),"en");
 await page.locator('.language-switcher a[lang="th"]').click();
 assert.equal(new URL(page.url()).pathname,"/");
 await page.reload();assert.equal(new URL(page.url()).pathname,"/");
 await page.goto("http://localhost:3100/services/ev-charging?utm_source=test#details");
 await page.locator('.language-switcher a[lang="en"]').click();
 assert.equal(new URL(page.url()).pathname,"/en/services/ev-charging");
 assert.equal(new URL(page.url()).search,"?utm_source=test");assert.equal(new URL(page.url()).hash,"#details");
 await page.goto("http://localhost:3100/ev-repair?gclid=test");
 assert.equal(new URL(page.url()).pathname,"/ev-repair");
 assert.equal(await page.locator("[data-lead-type]").count(),9);
 for(const route of ["","services","problems","vehicles","work","blog","contact","booking","ev-repair","services/ev-battery-bms","problems/ac-not-cold","vehicles/neta","work/facebook-726316847241779_122147244123039582","blog/facebook-726316847241779_122147014665039582"]){
  const errors=[];const listener=error=>errors.push(error.message);page.on("pageerror",listener);
  const response=await page.goto("http://localhost:3100/en"+(route?"/"+route:""));assert.equal(response.status(),200,route);
  assert.equal(await page.locator("html").getAttribute("lang"),"en",route);
  assert.equal(await page.locator("h1").count(),1,route);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute("href"),"https://www.proevgarage.com/en"+(route?"/"+route:""),route);
  await page.locator('script#gtm-script').waitFor();assert.equal(await page.locator('script#gtm-script').count(),1,route);
  const thai=await page.locator("main").innerText();assert.ok(!/[ก-๙]/.test(thai),route+" contains Thai body copy");
  const internal=await page.locator('main a[href^="/"]').evaluateAll(elements=>elements.map(a=>a.getAttribute("href")));assert.ok(internal.every(href=>href.startsWith("/en")),route+" links out of English");
  assert.deepEqual(errors,[],route);page.off("pageerror",listener);
 }
 await page.goto("http://localhost:3100/en");
 await page.setViewportSize({width:1440,height:900});
 await page.getByRole("link",{name:"Facebook chat ↗",exact:true}).first().hover();
 const state=await page.getByRole("link",{name:"Facebook chat ↗",exact:true}).first().evaluate(a=>({background:getComputedStyle(a).backgroundColor,decoration:getComputedStyle(a).textDecorationLine}));
 assert.equal(state.decoration,"none");assert.notEqual(state.background,"rgba(0, 0, 0, 0)");
 await page.screenshot({path:"output/english-qa/home-desktop.png"});
 await page.setViewportSize({width:390,height:844});
 assert.ok(await page.locator(".language-switcher").isVisible());
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth));
 await page.getByRole("button",{name:"Menu +",exact:true}).click();assert.ok(await page.getByRole("link",{name:"Services",exact:true}).first().isVisible());
 await page.screenshot({path:"output/english-qa/home-mobile-menu.png"});
 await page.goto("http://localhost:3100/en/work/facebook-726316847241779_122147244123039582");
 await page.getByRole("button",{name:"Enlarge photo",exact:true}).click();assert.ok(await page.getByRole("dialog",{name:"Enlarged photo"}).isVisible());
 await page.keyboard.press("Escape");assert.equal(await page.getByRole("dialog").count(),0);
 await page.goto("http://localhost:3100/en/ev-repair");assert.equal(await page.locator("[data-lead-type]").count(),9);
 // Suppress outbound navigation and inspect the existing helper in isolation.
 await page.route("https://m.me/**",route=>route.abort());
 await page.getByRole("link",{name:"Chat with our team ↗",exact:true}).click();
 const events=await page.evaluate(()=>window.dataLayer.filter(item=>item.event==="generate_lead_message"));assert.equal(events.length,1);assert.equal(events[0].click_location,"hero");
 const thaiContext=await browser.newContext({locale:"th-TH"});const thaiPage=await thaiContext.newPage();await thaiPage.goto("http://localhost:3100/");assert.equal(new URL(thaiPage.url()).pathname,"/");
 const englishContext=await browser.newContext({locale:"en-US"});const ad=await englishContext.newPage();await ad.goto("http://localhost:3100/?gclid=test");assert.equal(new URL(ad.url()).pathname,"/");
 console.log("PASS: English routes, SEO, language choice, ad safety, mobile menu, gallery and isolated lead event");
}finally{await browser?.close();server.kill("SIGTERM");}
