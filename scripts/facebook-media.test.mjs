import test from 'node:test';import assert from 'node:assert/strict';
import {getPostPhotos} from './facebook-media.mjs';
test('collects album children and later pages without duplicate cover',async()=>{
 let calls=0;const requests=[];const media=await getPostPhotos({id:'123_456',full_picture:'cover'},{token:'placeholder',version:'v26.0',fetchImpl:async url=>{requests.push(String(url));return new Response(JSON.stringify(++calls===1?{data:[{subattachments:{data:[{media:{image:{src:'photo1'}}},{media:{image:{src:'photo2'}}}],paging:{next:'https://graph.facebook.com/v26.0/child/subattachments?after=next&access_token=secret'}}}]}:{data:[{media:{image:{src:'photo2'}}},{media:{image:{src:'photo3'}}}]}));}});assert.deepEqual(media.photos,['photo1','photo2','photo3']);assert.equal(requests[1].includes('access_token'),false);
});
test('video remains a source link and is not falsely imported as a photo',async()=>{const result=await getPostPhotos({id:'1_2',full_picture:'thumbnail'},{token:'placeholder',version:'v26.0',fetchImpl:async()=>new Response(JSON.stringify({data:[{media_type:'video',url:'https://www.facebook.com/video'}]}))});assert.deepEqual(result.photos,[]);assert.equal(result.videos.length,1);});
test('attachment failure stops import rather than publishing incomplete galleries',async()=>{await assert.rejects(getPostPhotos({id:'1_2'},{token:'placeholder',version:'v26.0',fetchImpl:async()=>new Response('',{status:503})}));});

test('uses largest photo-node rendition regardless of API ordering',async()=>{
 const result=await getPostPhotos({id:'1_2'},{token:'placeholder',version:'v26.0',fetchImpl:async url=>new Response(JSON.stringify(String(url).includes('/attachments')?{data:[{media_type:'photo',target:{id:'123'},media:{image:{src:'preview',width:720,height:1280}}}]}:{images:[{source:'small',width:360,height:640},{source:'original',width:1440,height:2560},{source:'medium',width:720,height:1280}]}))});
 assert.deepEqual(result.photos,['original']);
});
test('keeps attachment photo when rendition list is empty',async()=>{
 const result=await getPostPhotos({id:'1_2'},{token:'placeholder',version:'v26.0',fetchImpl:async url=>new Response(JSON.stringify(String(url).includes('/attachments')?{data:[{target:{id:'123'},media:{image:{src:'preview'}}}]}:{images:[]}))});
 assert.deepEqual(result.photos,['preview']);
});
