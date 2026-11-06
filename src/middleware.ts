import {NextRequest,NextResponse} from "next/server";
import {LANGUAGE_COOKIE,languagePath,shouldSuggestEnglish} from "@/lib/language.mjs";
export function middleware(request:NextRequest){
 const {pathname,search}=request.nextUrl;
 if(shouldSuggestEnglish(pathname,request.cookies.get(LANGUAGE_COOKIE)?.value,request.headers.get("accept-language"),request.headers.get("user-agent"),search.slice(1))){
  const destination=request.nextUrl.clone();destination.pathname=languagePath(pathname,"en");
  const response=NextResponse.redirect(destination,307);
  response.headers.set("Cache-Control","private, no-store");
  response.headers.set("Vary","Accept-Language, Cookie");
  return response;
 }
 return NextResponse.next();
}
// Only the home page can redirect, so skip middleware everywhere else.
export const config={matcher:["/"]};
