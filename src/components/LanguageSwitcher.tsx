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
   <span>{english?"ไทย":"English"}</span>
  </a>
 </nav>;
}
