"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {isEnglishPath} from "@/lib/language.mjs";

// Keeps <html lang> in sync on /en pages without reading request headers in the
// root layout (headers() forced every page to render dynamically, uncached).
export default function HtmlLang(){
 const pathname=usePathname()||"/";
 useEffect(()=>{document.documentElement.lang=isEnglishPath(pathname)?"en":"th";},[pathname]);
 return null;
}
