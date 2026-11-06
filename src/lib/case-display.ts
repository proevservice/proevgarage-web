// Display helpers for repair cases imported from Facebook posts.
import { vehicles } from "@/lib/website-v3";
export const plainTitle = (t: string) => t.replace(new RegExp("[\\p{Extended_Pictographic}\\u{FE0F}\\u{200D}]", "gu"), "").replace(/\s{2,}/g, " ").trim();
export const caseBrand = (t: string) => { const low = t.toLowerCase(); return vehicles.find(v => v.keywords.some(k => low.includes(k.toLowerCase())))?.name; };
export const caseDate = (d?: string, locale = "th-TH") => d ? new Date(d).toLocaleDateString(locale, { day: "numeric", month: "short", timeZone: "Asia/Bangkok" }) : "";
