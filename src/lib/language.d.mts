export const LANGUAGE_COOKIE:string;
export function isEnglishPath(path:string):boolean;
export function languagePath(path:string,language:"th"|"en"):string;
export function preferredLanguage(cookie:string|undefined,acceptLanguage:string|null):"th"|"en";
export function shouldSuggestEnglish(path:string,cookie:string|undefined,acceptLanguage:string|null,userAgent:string|null,query:string):boolean;
