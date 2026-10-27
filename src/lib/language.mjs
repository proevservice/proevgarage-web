export const LANGUAGE_COOKIE = "proev_language";
export function isEnglishPath(path) { return path === "/en" || path.startsWith("/en/"); }
export function languagePath(path, language) {
 const clean = isEnglishPath(path) ? path.slice(3) || "/" : path;
 return language === "en" ? "/en" + (clean === "/" ? "" : clean) : clean;
}
export function preferredLanguage(cookie, acceptLanguage) {
 if (cookie === "th" || cookie === "en") return cookie;
 const ranked = (acceptLanguage || "").split(",").map((part,index) => {
  const [tag,...parameters]=part.trim().split(";");
  const q=parameters.find(value=>value.trim().startsWith("q="));
  return {tag:tag.toLowerCase(),q:q?Number(q.trim().slice(2)):1,index};
 }).filter(item=>item.tag && Number.isFinite(item.q) && item.q>0).sort((a,b)=>b.q-a.q||a.index-b.index);
 const first=ranked[0]?.tag;
 return !first || first === "*" || first === "th" || first.startsWith("th-") ? "th" : "en";
}
export function shouldSuggestEnglish(path, cookie, acceptLanguage, userAgent, query) {
 // Explicit URLs stay stable. Only a fresh home-page visit chooses a default.
 if(path !== "/" || /bot|crawler|spider|lighthouse/i.test(userAgent || "")) return false;
 if(/(?:^|&)(?:gclid|gbraid|wbraid|fbclid|utm_[^=]*)=/i.test(query || "")) return false;
 return preferredLanguage(cookie,acceptLanguage)==="en";
}
