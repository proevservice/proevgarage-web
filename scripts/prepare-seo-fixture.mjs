// Ephemeral CI fixture only; never called by Vercel or committed to content.
import {mkdir,writeFile} from "node:fs/promises";
if(process.env.SEO_TEST_ARTICLE_FIXTURE!=="true")throw Error("CI fixture requires explicit opt-in");
await mkdir("content/articles",{recursive:true});
await writeFile("content/articles/facebook-123_456.json",JSON.stringify({slug:"facebook-123_456",title:"บทความทดสอบสำหรับตรวจ SEO เท่านั้น",summary:"ข้อมูลทดสอบ ไม่ใช่บทความเผยแพร่",body:"บทความทดสอบ\nเนื้อหาจากโพสต์สำหรับทดสอบ\n#บทความ",date:"2026-10-26T00:00:00.000Z",updated:"2026-10-26T01:00:00.000Z",sourceUrl:"https://www.facebook.com/proevservice/posts/456",image:"/images/service-diagnostics.jpg",images:["/images/service-diagnostics.jpg","/images/service-battery.jpg"]}));
