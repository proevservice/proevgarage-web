// Match the repair topic, not workshop signatures or promotional hashtags.
const topics = {
  "ev-air-conditioning": ["แอร์", "คอมเพรสเซอร์", "คอมแอร์", "air conditioning", "a/c"],
  "ev-battery-bms": ["แบตเตอรี่", "ถาดแบต", "บาลานซ์", "bcu", "bms", "battery", "soc"],
  "ev-charging": ["ชาร์จ", "obc", "cdu", "charging"],
  "ev-diagnostics": ["ระบบไฟ", "ไฟเตือน", "fault", "ready", "วงจร"],
  "ev-suspension": ["ช่วงล่าง", "โช้ค", "โช๊ค", "ลูกหมาก", "ปีกนก", "บูช"],
  "ev-maintenance": ["เช็กระยะ", "เช็คระยะ", "บำรุงรักษา", "12v", "12 v"]
};
function match(text) {
  const normalized = text.toLowerCase();
  return Object.entries(topics).filter(([,words]) => words.some(word => normalized.includes(word))).map(([slug]) => slug);
}
export function serviceSlugsForCase(item) {
  const title = String(item.title || "").split(/#|https?:\/\//)[0];
  const fromTitle = match(title);
  if (fromTitle.length) return fromTitle;
  const summary = String(item.summary || item.body || "")
    .split(/\r?\n/).filter(line => !/#|https?:\/\/|📍|📞|💬|🌐/.test(line))
    .join(" ").slice(0, 400);
  return match(summary);
}
export function casesForService(cases, slug) {
  return cases.filter(item => serviceSlugsForCase(item).includes(slug));
}
