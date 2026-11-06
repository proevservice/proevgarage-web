"use client";
import {useEffect} from "react";
import {LANGUAGE_COOKIE,languagePath,shouldSuggestEnglish} from "@/lib/language.mjs";

// Static hosting has no middleware, so a first visit to the Thai home page from
// an English-language browser is sent to /en here, using the same rules.
export default function EnglishRedirect(){
 useEffect(()=>{
  const cookie=document.cookie.split("; ").find(c=>c.startsWith(LANGUAGE_COOKIE+"="))?.split("=")[1];
  const languages=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language]).join(",");
  if(shouldSuggestEnglish(location.pathname,cookie,languages,navigator.userAgent,location.search.slice(1))){
   location.replace(languagePath(location.pathname,"en")+location.search+location.hash);
  }
 },[]);
 return null;
}
