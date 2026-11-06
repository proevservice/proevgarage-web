// After `next build`, mark the prerendered English pages as lang="en".
// The shared root layout renders lang="th"; static hosting can't vary it per
// request, so the exported HTML under /en is corrected here.
import {readdir,readFile,writeFile,stat} from "node:fs/promises";
import path from "node:path";

const OUT=path.resolve("out");
const targets=[path.join(OUT,"en.html"),path.join(OUT,"en")];
let count=0;
async function fix(file){
 const html=await readFile(file,"utf8");
 const next=html.replace('<html lang="th"','<html lang="en"');
 if(next!==html){await writeFile(file,next);count++;}
}
async function walk(p){
 const s=await stat(p).catch(()=>null);if(!s)return;
 if(s.isDirectory()){for(const e of await readdir(p))await walk(path.join(p,e));}
 else if(p.endsWith(".html"))await fix(p);
}
for(const t of targets)await walk(t);
console.log(`set-html-lang: ${count} English pages marked lang="en"`);
