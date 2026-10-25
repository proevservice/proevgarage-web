import { MetadataRoute } from "next";
import { getRepairCases } from "@/lib/repair-cases";
import { getAllPosts } from "@/lib/site";
import { services,problems,vehicles,SITE_URL } from "@/lib/website-v3";
export default function sitemap():MetadataRoute.Sitemap{return [
...["","/services","/ev-repair","/problems","/vehicles","/work","/contact","/booking","/blog"].map(path=>({url:SITE_URL+path})),
...services.map(i=>({url:SITE_URL+"/services/"+i.slug})),
...problems.map(i=>({url:SITE_URL+"/problems/"+i.slug})),
...vehicles.map(i=>({url:SITE_URL+"/vehicles/"+i.slug})),
...getRepairCases().map(c=>({url:SITE_URL+"/work/"+c.slug,lastModified:c.updated||c.date})),
...getAllPosts().map(p=>({url:SITE_URL+"/blog/"+p.slug,lastModified:p.date}))
];}
