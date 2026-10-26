export async function getPostPhotos(post,{token,version,fetchImpl=fetch}) {
 const fields='media,media_type,type,url,target,subattachments.limit(100){media,media_type,type,url,target}';
 const photos=[];const videos=[];
 async function collect(edge){
  if(!Array.isArray(edge?.data))throw new Error('Invalid attachment response');
  for(const attachment of edge.data){
   if(attachment.subattachments){await collect(attachment.subattachments);continue;}
   const isVideo=/video/i.test(attachment.media_type||attachment.type||'');
   if(isVideo){if(attachment.url)videos.push(attachment.url);continue;}
   let src=attachment.media?.image?.src;
   // Photo-node renditions preserve more detail than attachment previews.
   if(/^\d+$/.test(attachment.target?.id||'')){
    const photoUrl=new URL('https://graph.facebook.com/'+version+'/'+attachment.target.id);
    photoUrl.searchParams.set('fields','images');
    const photo=await request(photoUrl);
    const variants=(photo.images||[]).filter(image=>image.source&&Number(image.width)>0&&Number(image.height)>0);
    variants.sort((a,b)=>b.width*b.height-a.width*a.height);
    const best=variants[0];
    if(best&&(!attachment.media?.image?.width||best.width*best.height>=attachment.media.image.width*attachment.media.image.height))src=best.source;
   }
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
