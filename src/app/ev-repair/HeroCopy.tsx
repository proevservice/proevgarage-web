"use client";
// Message match for Google Ads: append ?topic=<key> to an ad group's final URL
// and the hero headline matches what the customer searched for.
// Unknown or missing topic → the general headline. No tracking changes here.
import {useEffect, useState} from "react";

type Copy = {title: string; em: string; text: string};

// Default copy answers the most common search: "อู่/ร้านซ่อมรถไฟฟ้าใกล้ฉัน".
const GENERAL: Copy = {
 title: "อู่ซ่อมรถไฟฟ้าใกล้คุณ",
 em: "ปากเกร็ด · นนทบุรี",
 text: "ล้างแอร์ ซ่อมแอร์ แบตเตอรี่ ระบบชาร์จ ไฟเตือน ช่วงล่าง และเช็คระยะ ดูแลรถไฟฟ้าหลายยี่ห้อ ตรวจวิเคราะห์ก่อนซ่อม และแจ้งค่าใช้จ่ายก่อนเริ่มงานทุกครั้ง",
};

const brand = (name: string): Copy => ({
 title: `ซ่อม / เช็คระยะ ${name}`,
 em: "ทางเลือกนอกศูนย์",
 text: `ดูแล ${name} ทั้งเช็คระยะ ล้างแอร์ ซ่อมแอร์ แบตเตอรี่ ระบบชาร์จ และช่วงล่าง ตรวจวิเคราะห์ก่อนซ่อม แจ้งค่าใช้จ่ายก่อนเริ่มงาน`,
});

export const TOPICS: Record<string, Copy> = {
 clean: {title: "ล้างแอร์รถไฟฟ้า EV", em: "แอร์เย็นฉ่ำ ลมแรงขึ้น", text: "ล้างแอร์และแผงแอร์รถไฟฟ้า ตรวจระบบแอร์ไฟฟ้าไปพร้อมกัน หากพบความผิดปกติ ทีมงานแจ้งให้ทราบก่อนดำเนินการเพิ่ม"},
 neta: brand("NETA V"),
 mg: brand("MG"),
 byd: brand("BYD"),
 deepal: brand("Deepal"),
 aion: brand("GAC AION"),
 geely: brand("Geely"),
 ac: {title: "แอร์รถไฟฟ้าไม่เย็น?", em: "ตรวจหาสาเหตุก่อนซ่อม", text: "แอร์มีแต่ลม เย็นบ้างไม่เย็นบ้าง หรือคอมแอร์ไม่ทำงาน ตรวจระบบแอร์ไฟฟ้า การรั่ว และการควบคุม ก่อนสรุปว่าต้องเปลี่ยนอะไหล่"},
 battery: {title: "แบตเตอรี่ EV ผิดปกติ?", em: "ตรวจ BCU/BMS ก่อนตัดสินใจ", text: "เปอร์เซ็นต์แบตลดเร็ว ขึ้นรูปเต่า หรือไฟเตือนแบตเตอรี่ ตรวจข้อมูลเซลล์และระบบจัดการแบตเตอรี่ ก่อนประเมินว่าต้องเปลี่ยนทั้งแพ็กหรือไม่"},
 charging: {title: "ชาร์จไม่เข้า / ชาร์จแล้วตัด?", em: "แยกปัญหาให้ชัดก่อนซ่อม", text: "ชาร์จ AC หรือ DC ไม่เข้า ชาร์จแล้วตัด ตรวจตั้งแต่พอร์ตชาร์จ OBC และ CDU เพื่อหาจุดที่เสียจริง"},
 warning: {title: "ไฟเตือนขึ้น / รถไม่เข้า READY?", em: "อ่านค่าระบบก่อนซ่อม", text: "System Fault ไฟเตือนระบบแรงดันสูง หรือเปิดระบบไม่ได้ ตรวจรหัสปัญหาและวงจรที่เกี่ยวข้องด้วยเครื่องมือวิเคราะห์"},
 suspension: {title: "ช่วงล่างรถไฟฟ้าดัง?", em: "หาตำแหน่งเสียงให้เจอ", text: "เสียงดังขณะขับ ช่วงล่างย้วย โช้คหรือลูกหมากเสื่อม ตรวจสภาพชิ้นส่วนร่วมกับการทดสอบขับจริง"},
 maintenance: {title: "เช็กระยะรถไฟฟ้า", em: "และแบตเตอรี่ 12V", text: "ดูแลรายการบำรุงรักษาตามรุ่นและระยะทาง ตรวจแบตเตอรี่ 12V ของเหลว และระบบที่ควรเช็กตามรอบ"},
};

// Keyword → topic, for a single account-wide Final URL suffix kw={keyword}.
const RULES: [RegExp, string][] = [
 [/ล้าง.*แอร์|ล้างแผง/, "clean"],
 [/แอร์/, "ac"],
 [/neta|เนต้า/i, "neta"],
 [/\bmg\b|เอ็มจี/i, "mg"],
 [/byd|บีวายดี/i, "byd"],
 [/deepal|ดีพอล/i, "deepal"],
 [/aion|ไอออน/i, "aion"],
 [/geely|จีลี่/i, "geely"],
 [/แบต|battery|bms|bcu/i, "battery"],
 [/ชาร์จ|charg/i, "charging"],
 [/ไฟเตือน|ready|เต่า|fault/i, "warning"],
 [/ช่วงล่าง|โช้ค|โช๊ค|เสียง/, "suspension"],
 [/เช็คระยะ|เช็กระยะ|12v/i, "maintenance"],
];

export function topicFrom(search: string): string | null {
 const q = new URLSearchParams(search);
 const topic = q.get("topic")?.toLowerCase();
 if (topic && TOPICS[topic]) return topic;
 const kw = (q.get("kw") || q.get("utm_term") || "").replace(/\+/g, " ");
 for (const [re, key] of RULES) if (re.test(kw)) return key;
 return null;
}

export function HeroCopy() {
 const [copy, setCopy] = useState<Copy>(GENERAL);
 useEffect(() => {
  const topic = topicFrom(location.search);
  if (topic) setCopy(TOPICS[topic]);
 }, []);
 return <>
  <h1>{copy.title}<br/><em>{copy.em}</em></h1>
  <p>{copy.text}</p>
 </>;
}
