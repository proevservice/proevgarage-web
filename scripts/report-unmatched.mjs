// After the Facebook import, list newly imported repair cases that match no
// service page (and no known brand). The sync workflow turns the output into a
// GitHub issue so the owner can decide whether a new service page is needed.
// Usage: node scripts/report-unmatched.mjs content/work/a.json content/work/b.json
import {readFileSync, writeFileSync} from "node:fs";
import {serviceSlugsForCase} from "../src/lib/service-work.mjs";

// Brand keywords come from the vehicles list in src/lib/website-v3.ts.
const src = readFileSync(new URL("../src/lib/website-v3.ts", import.meta.url), "utf8");
const block = src.slice(src.indexOf("export const vehicles"), src.indexOf("];", src.indexOf("export const vehicles")));
const words = [...block.matchAll(/keywords:(\[[^\]]*\])/g)].flatMap(m => JSON.parse(m[1]));
const brands = new RegExp(words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");

const files = process.argv.slice(2).filter(f => f.endsWith(".json"));
const rows = [];
for (const file of files) {
 let item;
 try { item = JSON.parse(readFileSync(file, "utf8")); } catch { continue; }
 const services = serviceSlugsForCase(item);
 const text = String(item.title || "") + " " + String(item.summary || "").slice(0, 400);
 const brand = brands.test(text);
 if (!services.length || !brand) {
  const title = String(item.title || item.slug).split(/#|https?:\/\//)[0].trim().slice(0, 120);
  rows.push(`- **${title}** — ${!services.length ? "ไม่ตรงกับบริการไหน" : ""}${!services.length && !brand ? " · " : ""}${!brand ? "ไม่พบชื่อยี่ห้อที่รู้จัก" : ""}\n  https://www.proevgarage.com/work/${item.slug}`);
 }
}
if (rows.length) {
 const body = `ผลงานใหม่จาก Facebook ที่ระบบยังจัดเข้าหน้าบริการหรือหน้ายี่ห้อไม่ได้:\n\n${rows.join("\n")}\n\nถ้าเป็นงานประเภทใหม่ที่ร้านรับเป็นประจำ ควรเพิ่มหน้าบริการ (src/lib/website-v3.ts + คำค้นใน src/lib/service-work.mjs) ถ้าเป็นยี่ห้อหรือรุ่นที่ยังไม่มี ให้เพิ่มในรายการ vehicles ใน src/lib/website-v3.ts`;
 writeFileSync("unmatched-report.md", body);
 console.log(body);
} else console.log("All new cases match a service and a brand.");
