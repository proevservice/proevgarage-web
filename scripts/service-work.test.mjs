import test from "node:test";
import assert from "node:assert/strict";
import { serviceSlugsForCase, casesForService } from "../src/lib/service-work.mjs";
test("repair title takes precedence over generic workshop promotion",()=>{
 const ac={title:"ORA Good Cat แอร์ไม่ทำงาน คอมแอร์พัง",body:"รับซ่อมแบตเตอรี่ BCU ช่วงล่าง #ชาร์จไม่เข้า",summary:"ซ่อมแอร์ไฟฟ้า"};
 const battery={title:"น้ำเข้าถาดแบตเตอรี่ EV ซ่อมได้",body:"#ซ่อมแอร์รถไฟฟ้า #ช่วงล่าง #BCU"};
 assert.deepEqual(serviceSlugsForCase(ac),["ev-air-conditioning"]);
 assert.deepEqual(serviceSlugsForCase(battery),["ev-battery-bms"]);
 assert.deepEqual(casesForService([ac,battery],"ev-air-conditioning"),[ac]);
 assert.deepEqual(casesForService([ac,battery],"ev-battery-bms"),[battery]);
});
test("neutral titles use repair summary while ignoring hashtag and contact lines",()=>{
 assert.deepEqual(serviceSlugsForCase({title:"ขอบคุณลูกค้า MG",summary:"เปลี่ยนโช้คหน้าและลูกหมาก\n#ซ่อมแอร์ #BCU\n📍 ซ่อมแบตเตอรี่"}),["ev-suspension"]);
 assert.deepEqual(serviceSlugsForCase({title:"ขอบคุณครับ",summary:"#ซ่อมแอร์ #BCU\nhttps://example.com/battery"}),[]);
});
test("multiple explicitly named repairs may appear under both relevant services",()=>{
 assert.deepEqual(serviceSlugsForCase({title:"NETA V ซ่อมแอร์และระบบชาร์จ"}),["ev-air-conditioning","ev-charging"]);
 assert.deepEqual(casesForService([],"ev-charging"),[]);
});
test("classification is computed from current cases, without retaining removed entries",()=>{
 const ac={slug:"old",title:"ซ่อมแอร์ ORA"};
 assert.equal(casesForService([ac],"ev-air-conditioning").length,1);
 assert.deepEqual(casesForService([],"ev-air-conditioning"),[]);
 assert.deepEqual(serviceSlugsForCase({...ac,title:"เปลี่ยนโช้ค ORA"}),["ev-suspension"]);
});
