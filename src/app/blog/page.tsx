import {DesignBlogIndex} from "@/components/designs/DesignPages";
import {Schema} from "@/components/WebsiteV3";
import {pageMetadata,webPageSchema} from "@/lib/seo";
const title="บทความดูแลรถไฟฟ้า | Pro EV Service",description="ข้อมูลการดูแลรถไฟฟ้าและอาการที่ควรรู้ก่อนเข้ารับบริการ";
export const metadata=pageMetadata(title,description,"/blog");
export default function Blog(){return <><Schema data={webPageSchema(title,description,"/blog","CollectionPage")}/><DesignBlogIndex/></>}
