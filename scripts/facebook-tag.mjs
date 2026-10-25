export const IMPORT_TAG = '#\u0e1c\u0e25\u0e07\u0e32\u0e19PROEV';

export function classifyPost(post, tag = IMPORT_TAG) {
  const text = (post.message || '').normalize('NFC');
  if (!text.trim()) return {status: 'skip', reason: 'empty'};
  const escaped = tag.normalize('NFC').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('(^|[^\\p{L}\\p{M}\\p{N}_#])' + escaped + '(?![\\p{L}\\p{M}\\p{N}_])', 'iu');
  return pattern.test(text)
    ? {status: 'publish', reason: 'tagged'}
    : {status: 'skip', reason: 'untagged'};
}
