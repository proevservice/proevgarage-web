import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {sync,toCase} from './sync-facebook.mjs';
import {IMPORT_TAG} from './facebook-tag.mjs';
const base={id:'123_456',message:'Repair original\n'+IMPORT_TAG,created_time:'2026-10-25T00:00:00Z',permalink_url:'https://www.facebook.com/proevservice/posts/456',full_picture:'https://scontent.fbcdn.net/first.jpg'};
const env={FACEBOOK_PAGE_ID:'123',FACEBOOK_PAGE_ACCESS_TOKEN:'test-placeholder',FACEBOOK_GRAPH_VERSION:'v26.0'};
const json=data=>new Response(JSON.stringify(data),{headers:{'content-type':'application/json'}});
test('add, edit text/image, remove tag, add back and delete source',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'proev-sync-'));
 try{
  let posts=[base,{...base,id:'123_789',message:'NETA repair resolved without tag'}];
  const fetchImpl=async url=>String(url).startsWith('https://graph.facebook.com/')?json({data:posts}):new Response(String(url),{headers:{'content-type':'image/jpeg'}});
  const run=()=>sync({root,env,fetchImpl});
  const file=path.join(root,'content/work/facebook-123_456.json');
  await run();assert.equal(JSON.parse(await fs.readFile(file)).title,'Repair original');
  await assert.rejects(fs.access(path.join(root,'content/work/facebook-123_789.json')));
  posts=[{...base,message:'Updated repair\n'+IMPORT_TAG,full_picture:'https://scontent.fbcdn.net/changed.jpg'}];
  await run();assert.equal(JSON.parse(await fs.readFile(file)).title,'Updated repair');
  const changed=JSON.parse(await fs.readFile(file));
  assert.match(await fs.readFile(path.join(root,'public',changed.image),'utf8'),/changed/);
  assert.equal((await fs.readdir(path.join(root,'public/images/facebook'))).length,1);
  posts=[{...base,message:'Updated repair without tag'}];await run();await assert.rejects(fs.access(file));
  assert.deepEqual(await fs.readdir(path.join(root,'public/images/facebook')),[]);
  posts=[base];await run();await fs.access(file);
  await fs.writeFile(path.join(root,'content/work/manual-case.json'),'{}');
  posts=[];await run();await assert.rejects(fs.access(file));await fs.access(path.join(root,'content/work/manual-case.json'));
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test('a failed later page or image leaves existing work intact',async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'proev-sync-'));
 try{
  const dir=path.join(root,'content/work');await fs.mkdir(dir,{recursive:true});
  const file=path.join(dir,'facebook-123_456.json');await fs.writeFile(file,'original');
  let call=0;
  await assert.rejects(sync({root,env,fetchImpl:async()=>++call===1?json({data:[base],paging:{next:'present',cursors:{after:'cursor'}}}):new Response('',{status:503})}));
  assert.equal(await fs.readFile(file,'utf8'),'original');
  await assert.rejects(sync({root,env,fetchImpl:async url=>String(url).startsWith('https://graph.facebook.com/')?json({data:[base]}):new Response('',{status:503})}));
  assert.equal(await fs.readFile(file,'utf8'),'original');
 }finally{await fs.rm(root,{recursive:true,force:true});}
});
test('hashtag on its own first line still produces a work title',()=>{
 assert.equal(toCase({...base,message:IMPORT_TAG+'\nActual repair title'}).title,'Actual repair title');
});
