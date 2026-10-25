import fs from "fs";
import path from "path";
export interface RepairCase { slug:string; title:string; model:string; summary:string; body:string; image?:string; images?:string[]; videoUrls?:string[]; sourceUrl?:string; date?:string; updated?:string; }
export function getRepairCases():RepairCase[] {
 const dir=path.join(process.cwd(),"content","work");
 if(!fs.existsSync(dir)) return [];
 return fs.readdirSync(dir).filter(n=>n.endsWith(".json")).map(n=>JSON.parse(fs.readFileSync(path.join(dir,n),"utf8")) as RepairCase).sort((a,b)=>(b.date||"").localeCompare(a.date||""));
}
