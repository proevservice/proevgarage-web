export async function getPostPhotos(post,{token,version,fetchImpl=fetch}) {
 const fields='media,media_type,type,url,subattachments.limit(100){media,media_type,type,url}';
 const photos=[];const videos=[];
 async function collect(edge){
  if(!Array.isArray(edge?.data))throw new Error('Invalid attachment response');
  for(const attachment of edge.data){
   if(attachment.subattachments){await collect(attachment.subattachments);continue;}
   const isVideo=/video/i.test(attachment.media_type||attachment.type||'');
   if(isVideo){if(attachment.url)videos.push(attachment.url);continue;}
   const src=attachment.media?.image?.src;
   if(src&&!photos.includes(src))photos.push(src);
  }
  if(edge.paging?.next){
   const next=new URL(edge.paging.next);
   if(next.protocol!=='https:'||next.hostname!=='graph.facebook.com')throw new Error('Invalid attachment pagination');
   next.searchParams.delete('access_token');
   await collect(await request(next));
  }
 }
 async function request(url){const res=await fetchImpl(url,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(30000)});if(!res.ok)throw new Error('Attachment request failed: HTTP '+res.status);return res.json();}
 const url=new URL('https://graph.facebook.com/'+version+'/'+post.id+'/attachments');
 url.searchParams.set('fields',fields);url.searchParams.set('limit','100');
 await collect(await request(url));
 if(!photos.length&&post.full_picture&&!videos.length)photos.push(post.full_picture);
 return {photos,videos};
}
