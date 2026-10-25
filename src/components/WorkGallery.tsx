"use client";
import {useEffect,useState} from "react";
import styles from "./work.module.css";
export default function WorkGallery({images,title}:{images:string[];title:string}){
 const [active,setActive]=useState(0);const [open,setOpen]=useState(false);
 useEffect(()=>{if(!open)return;const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='ArrowRight')setActive(a=>(a+1)%images.length);if(e.key==='ArrowLeft')setActive(a=>(a-1+images.length)%images.length);};window.addEventListener('keydown',onKey);const before=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',onKey);document.body.style.overflow=before;};},[open,images.length]);
 if(!images.length)return null;
 return <section aria-label="รูปภาพทั้งหมดของงานซ่อม" className={styles.gallery}>
  <button className={styles.mainPhoto} onClick={()=>setOpen(true)} aria-label="ขยายรูปภาพ"><img src={images[active]} alt={`${title} ภาพที่ ${active+1}`} /><span className={styles.photoCount}>{active+1} / {images.length} · ขยายภาพ ↗</span></button>
  <div className={styles.thumbs}>{images.map((src,i)=><button key={src} onClick={()=>setActive(i)} aria-label={`ดูภาพที่ ${i+1}`} aria-pressed={active===i} className={active===i?styles.selected:''}><img loading="lazy" src={src} alt={`ภาพงานซ่อม ${i+1}`}/></button>)}</div>
  <p className={styles.hint}>รูปภาพจากโพสต์ต้นฉบับ · {images.length} ภาพ</p>
  {open&&<div role="dialog" aria-modal="true" aria-label="ภาพงานซ่อมขนาดใหญ่" className={styles.lightbox}><button autoFocus className={styles.close} onClick={()=>setOpen(false)}>ปิด ✕</button><button className={styles.previous} aria-label="ภาพก่อนหน้า" onClick={()=>setActive((active-1+images.length)%images.length)}>‹</button><img src={images[active]} alt={`${title} ภาพที่ ${active+1}`}/><button className={styles.next} aria-label="ภาพถัดไป" onClick={()=>setActive((active+1)%images.length)}>›</button><span>{active+1} / {images.length}</span></div>}
 </section>;
}
