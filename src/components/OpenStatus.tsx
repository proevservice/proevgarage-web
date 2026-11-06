"use client";
// Live open/closed status. Shop hours: 09:00–19:00 Bangkok time, closed Wednesdays.
import {useEffect, useState} from "react";
import s from "./shop.module.css";

function status(now: Date) {
 const bkk = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Bangkok"}));
 const day = bkk.getDay(), mins = bkk.getHours() * 60 + bkk.getMinutes();
 const openToday = day !== 3;
 if (openToday && mins >= 540 && mins < 1140) return {open: true, text: "เปิดอยู่ตอนนี้ · ปิด 19:00 น."};
 if (openToday && mins < 540) return {open: false, text: "ปิดอยู่ · เปิดวันนี้ 09:00 น."};
 if (day === 3 && mins < 1140) return {open: false, text: "วันนี้หยุด (วันพุธ) · เปิดพรุ่งนี้ 09:00 น."};
 if ((day + 1) % 7 === 3) return {open: false, text: "ปิดอยู่ · เปิดวันพฤหัสบดี 09:00 น. (หยุดวันพุธ)"};
 return {open: false, text: "ปิดอยู่ · เปิดพรุ่งนี้ 09:00 น."};
}

export default function OpenStatus() {
 const [state, setState] = useState<{open: boolean; text: string} | null>(null);
 useEffect(() => {
  const tick = () => setState(status(new Date()));
  tick();
  const id = setInterval(tick, 60000);
  return () => clearInterval(id);
 }, []);
 if (!state) return null;
 return <p className={s.openStatus}><span className={state.open ? s.dotOpen : s.dotClosed}/>{state.text}{!state.open && " · ทักแชทไว้ได้ ทีมงานตอบกลับเมื่อเปิดร้าน"}</p>;
}
