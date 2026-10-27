import {NextRequest,NextResponse} from "next/server";
import {LANGUAGE_COOKIE,isEnglishPath,languagePath,shouldSuggestEnglish} from "@/lib/language.mjs";
export function middleware(request:NextRequest){
 const {pathname,search}=request.nextUrl;
 if(shouldSuggestEnglish(pathname,request.cookies.get(LANGUAGE_COOKIE)?.value,request.headers.get("accept-language"),request.headers.get("user-agent"),search.slice(1))){
  const destination=request.nextUrl.clone();destination.pathname=languagePath(pathname,"en");
  const response=NextResponse.redirect(destination,307);
  response.headers.set("Cache-Control","private, no-store");
  response.headers.set("Vary","Accept-Language, Cookie");
  return response;
 }
 const requestHeaders=new Headers(request.headers);
 requestHeaders.set("x-site-language",isEnglishPath(pathname)?"en":"th");
 return NextResponse.next({request:{headers:requestHeaders}});
}
export const config={matcher:["/((?!api|_next|images|admin|.*\\..*).*)"]};
