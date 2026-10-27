"use client";
import {usePathname} from "next/navigation";
import {LANGUAGE_COOKIE,isEnglishPath,languagePath} from "@/lib/language.mjs";
export default function LanguageSwitcher(){
 const pathname=usePathname();const english=isEnglishPath(pathname);
 function remember(event:React.MouseEvent<HTMLAnchorElement>,language:"th"|"en"){
  document.cookie=LANGUAGE_COOKIE+"="+language+"; Path=/; Max-Age=31536000; SameSite=Lax"+(location.protocol==="https:"?"; Secure":"");
  event.currentTarget.href=languagePath(pathname,language)+location.search+location.hash;
 }
 return <nav className="language-switcher" aria-label={english?"Website language":"เลือกภาษาเว็บไซต์"}>
  <a href={languagePath(pathname,"th")} hrefLang="th" lang="th" aria-current={!english?"page":undefined} onClick={event=>remember(event,"th")}>ไทย</a>
  <span aria-hidden="true">|</span>
  <a href={languagePath(pathname,"en")} hrefLang="en" lang="en" aria-current={english?"page":undefined} onClick={event=>remember(event,"en")}>EN</a>
 </nav>;
}
