import test from "node:test";
import assert from "node:assert/strict";
import {facebookRequestError} from "./facebook-auth.mjs";
test("token diagnostic reports codes without exposing provider text or credentials",async()=>{
 const response=new Response(JSON.stringify({error:{code:190,error_subcode:463,message:"sensitive-token-and-session-details",fbtrace_id:"trace"}}),{status:401});
 const error=await facebookRequestError(response);assert.match(error.message,/code=190, subcode=463/);assert.match(error.message,/Re-authorize/);assert.ok(!error.message.includes("sensitive"));assert.ok(!error.message.includes("trace"));
});
test("non-JSON failure remains safe and actionable",async()=>assert.match((await facebookRequestError(new Response("secret proxy body",{status:502}))).message,/HTTP 502/));
test("permission errors give permission guidance",async()=>assert.match((await facebookRequestError(new Response(JSON.stringify({error:{code:200}}),{status:403}))).message,/pages_read_engagement/));
