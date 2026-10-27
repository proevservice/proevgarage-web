"use client";
import {usePathname} from "next/navigation";
import {LANGUAGE_COOKIE,isEnglishPath,languagePath} from "@/lib/language.mjs";
export default function LanguageSwitcher(){
 const pathname=usePathname();const english=isEnglishPath(pathname);
 function remember(event:React.MouseEvent<HTMLAnchorElement>,language:"th"|"en"){
  document.cookie=LANGUAGE_COOKIE+"="+language+"; Path=/; Max-Age=31536000; SameSite=Lax"+(location.protocol==="https:"?"; Secure":"");
  event.currentTarget.href=languagePath(pathname,language)+location.search+location.hash;
 }
 const target=english?"th":"en";
 return <nav className="language-switcher" aria-label={english?"Website language":"เลือกภาษาเว็บไซต์"}>
  <a href={languagePath(pathname,target)} hrefLang={target} lang={target} aria-label={english?"Switch to Thai":"เปลี่ยนเป็นภาษาอังกฤษ"} onClick={event=>remember(event,target)}>
   <svg aria-hidden="true" width="22" height="16" viewBox="0 0 60 40" style={{flexShrink:0,borderRadius:2}}>
    {english?<><path fill="#a51931" d="M0 0h60v40H0z"/><path fill="#fff" d="M0 7h60v26H0z"/><path fill="#2d2a4a" d="M0 13h60v14H0z"/></>:<><path fill="#012169" d="M0 0h60v40H0z"/><path stroke="#fff" strokeWidth="9" d="m0 0 60 40m0-40L0 40"/><path stroke="#c8102e" strokeWidth="3" d="m0 0 60 40m0-40L0 40"/><path stroke="#fff" strokeWidth="13" d="M30 0v40M0 20h60"/><path stroke="#c8102e" strokeWidth="7" d="M30 0v40M0 20h60"/></>}
   </svg><span>{english?"ไทย":"English"}</span>
  </a>
 </nav>;
}
