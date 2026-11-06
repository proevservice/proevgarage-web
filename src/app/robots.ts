import type {MetadataRoute} from "next";
import {SITE_URL} from "@/lib/website-v3";
import {isPreviewDeploy} from "@/lib/deploy-env";
export default function robots():MetadataRoute.Robots{
 if(isPreviewDeploy)return {rules:{userAgent:"*",disallow:"/"}};
 const disallow=["/admin","/api/","/designs","/directions","/design-previews/"];
 return {rules:[{userAgent:"*",allow:"/",disallow},{userAgent:"OAI-SearchBot",allow:"/",disallow}],sitemap:SITE_URL+"/sitemap.xml",host:SITE_URL};
}
