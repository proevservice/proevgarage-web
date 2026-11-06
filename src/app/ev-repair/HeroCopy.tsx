"use client";
// Message match for Google Ads: append ?topic=<key> to an ad group's final URL
// and the hero headline matches what the customer searched for.
// Unknown or missing topic → the general headline. No tracking changes here.
import {useEffect, useState} from "react";

type Copy = {title: string; em: string; text: string};

const GENERAL: Copy = {
 title: "ซ่อมรถไฟฟ้า EV",
 em: "ตรวจวิเคราะห์ก่อนซ่อม",
 text: "แอร์ไม่เย็น แบตเตอรี่ ระบบชาร์จ ไฟเตือน และช่วงล่าง แจ้งรุ่นรถและอาการ ทีมงานช่วยประเมินแนวทางตรวจ และแจ้งค่าใช้จ่ายก่อนเริ่มงานทุกครั้ง",
};

export const TOPICS: Record<string, Copy> = {
 ac: {title: "แอร์รถไฟฟ้าไม่เย็น?", em: "ตรวจหาสาเหตุก่อนซ่อม", text: "แอร์มีแต่ลม เย็นบ้างไม่เย็นบ้าง หรือคอมแอร์ไม่ทำงาน ตรวจระบบแอร์ไฟฟ้า การรั่ว และการควบคุม ก่อนสรุปว่าต้องเปลี่ยนอะไหล่"},
 battery: {title: "แบตเตอรี่ EV ผิดปกติ?", em: "ตรวจ BCU/BMS ก่อนตัดสินใจ", text: "เปอร์เซ็นต์แบตลดเร็ว ขึ้นรูปเต่า หรือไฟเตือนแบตเตอรี่ ตรวจข้อมูลเซลล์และระบบจัดการแบตเตอรี่ ก่อนประเมินว่าต้องเปลี่ยนทั้งแพ็กหรือไม่"},
 charging: {title: "ชาร์จไม่เข้า / ชาร์จแล้วตัด?", em: "แยกปัญหาให้ชัดก่อนซ่อม", text: "ชาร์จ AC หรือ DC ไม่เข้า ชาร์จแล้วตัด ตรวจตั้งแต่พอร์ตชาร์จ OBC และ CDU เพื่อหาจุดที่เสียจริง"},
 warning: {title: "ไฟเตือนขึ้น / รถไม่เข้า READY?", em: "อ่านค่าระบบก่อนซ่อม", text: "System Fault ไฟเตือนระบบแรงดันสูง หรือเปิดระบบไม่ได้ ตรวจรหัสปัญหาและวงจรที่เกี่ยวข้องด้วยเครื่องมือวิเคราะห์"},
 suspension: {title: "ช่วงล่างรถไฟฟ้าดัง?", em: "หาตำแหน่งเสียงให้เจอ", text: "เสียงดังขณะขับ ช่วงล่างย้วย โช้คหรือลูกหมากเสื่อม ตรวจสภาพชิ้นส่วนร่วมกับการทดสอบขับจริง"},
 maintenance: {title: "เช็กระยะรถไฟฟ้า", em: "และแบตเตอรี่ 12V", text: "ดูแลรายการบำรุงรักษาตามรุ่นและระยะทาง ตรวจแบตเตอรี่ 12V ของเหลว และระบบที่ควรเช็กตามรอบ"},
};

export function HeroCopy() {
 const [copy, setCopy] = useState<Copy>(GENERAL);
 useEffect(() => {
  const topic = new URLSearchParams(location.search).get("topic")?.toLowerCase();
  if (topic && TOPICS[topic]) setCopy(TOPICS[topic]);
 }, []);
 return <>
  <h1>{copy.title}<br/><em>{copy.em}</em></h1>
  <p>{copy.text}</p>
 </>;
}

// Shop hours: 09:00–19:00 Bangkok time, closed Wednesdays.
function status(now: Date) {
 const bkk = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Bangkok"}));
 const day = bkk.getDay(), mins = bkk.getHours() * 60 + bkk.getMinutes();
 const openToday = day !== 3;
 if (openToday && mins >= 540 && mins < 1140) return {open: true, text: "เปิดอยู่ตอนนี้ · ปิด 19:00 น."};
 if (openToday && mins < 540) return {open: false, text: "ปิดอยู่ · เปิดวันนี้ 09:00 น."};
 const tomorrowIsWed = (day + 1) % 7 === 3;
 return {open: false, text: tomorrowIsWed ? "ปิดอยู่ · เปิดวันพฤหัสบดี 09:00 น. (หยุดวันพุธ)" : day === 3 && mins < 1140 ? "วันนี้หยุด (วันพุธ) · เปิดพรุ่งนี้ 09:00 น." : "ปิดอยู่ · เปิดพรุ่งนี้ 09:00 น."};
}

export function OpenStatus({className, dotOpen, dotClosed}: {className?: string; dotOpen?: string; dotClosed?: string}) {
 const [state, setState] = useState<{open: boolean; text: string} | null>(null);
 useEffect(() => {
  const tick = () => setState(status(new Date()));
  tick();
  const id = setInterval(tick, 60000);
  return () => clearInterval(id);
 }, []);
 if (!state) return null;
 return <p className={className}><span className={state.open ? dotOpen : dotClosed}/>{state.text}{!state.open && " · ทักแชทไว้ได้ ทีมงานตอบกลับเมื่อเปิดร้าน"}</p>;
}
