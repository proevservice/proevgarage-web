// Preserve the source wording while shortening at Thai word boundaries.
export function sourceTitle(text, maxLength = 90) {
 const first = text.split(/\r?\n/).map(line => line.trim()).find(Boolean);
 if (!first) return null;
 const graphemes = new Intl.Segmenter("th", {granularity:"grapheme"});
 const length = value => [...graphemes.segment(value)].length;
 if (length(first) <= maxLength) return first;
 let title = "";
 for (const {segment} of new Intl.Segmenter("th", {granularity:"word"}).segment(first)) {
  if (length(title + segment) > maxLength - 1) break;
  title += segment;
 }
 if (!title.trim()) title = [...graphemes.segment(first)].slice(0,maxLength-1).map(item=>item.segment).join("");
 return title.trimEnd() + "…";
}
