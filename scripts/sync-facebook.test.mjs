import test from "node:test";
import assert from "node:assert/strict";
import {toCase} from "./sync-facebook.mjs";
const post={id:"123_456",message:"NETA X ????????????????\n????????? #?????PROEV",permalink_url:"https://www.facebook.com/proevservice/posts/456",created_time:"2026-10-21T10:00:00Z"};
test("stable post identity and unmodified source body",()=>{const c=toCase(post);assert.equal(c.slug,"facebook-123_456");assert.equal(c.body,post.message);assert.equal(c.date,"2026-10-21T10:00:00.000Z");});
test("reject invalid source URLs and dates",()=>{assert.throws(()=>toCase({...post,permalink_url:"javascript:alert(1)"}));assert.throws(()=>toCase({...post,created_time:"invalid"}));assert.throws(()=>toCase({...post,id:"../escape"}));});
test("skip empty content",()=>assert.equal(toCase({...post,message:""}),null));


test("remove import hashtag from title",()=>{const c=toCase({...post,message:"NETA X #?????PROEV\nRepair details"});assert.equal(c.title,"NETA X");});
