import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DesignShell from "@/components/designs/DesignShell";
import DesignHome from "@/components/designs/DesignHome";
import { DesignWorkIndex, DesignBlogIndex, DesignContact, DesignBooking } from "@/components/designs/DesignPages";
import { getSettings } from "@/lib/site";
import { designOptions } from "@/lib/design-options";
import Services from "@/app/services/page";
import ServiceDetail from "@/app/services/[slug]/page";
import CaseDetail from "@/app/work/[slug]/page";
import BlogDetail from "@/app/blog/[slug]/page";
import Problems from "@/app/problems/page";
import ProblemDetail from "@/app/problems/[slug]/page";
import Vehicles from "@/app/vehicles/page";
import VehicleDetail from "@/app/vehicles/[slug]/page";
type Props={params:{variant:string;path?:string[]}};
export const dynamicParams=true;
export function generateStaticParams(){return designOptions.flatMap(d=>["","services","work","blog","contact","booking","problems","vehicles"].map(path=>({variant:d.id,path:path?path.split("/"):[]})));}
export function generateMetadata({params}:Props):Metadata{const option=designOptions.find(d=>d.id===params.variant);return {title:option?option.name+" · PRO EV SERVICE | Design Preview":"Design Preview",robots:{index:false,follow:false},alternates:{canonical:"https://www.proevgarage.com/"+(params.path||[]).join("/")}};}
export default function DesignOptionPage({params}:Props){
 if(!designOptions.some(d=>d.id===params.variant))notFound();
 const [page,slug,...rest]=params.path||[];if(rest.length)notFound();
 let content:React.ReactNode;
 if(!page)content=<DesignHome id={params.variant}/>;
 else if(page==="services")content=slug?<ServiceDetail params={{slug}}/>:<Services/>;
 else if(page==="work")content=slug?<CaseDetail params={{slug}}/>:<DesignWorkIndex/>;
 else if(page==="blog")content=slug?<BlogDetail params={{slug}}/>:<DesignBlogIndex/>;
 else if(page==="contact"&&!slug)content=<DesignContact/>;
 else if(page==="booking"&&!slug)content=<DesignBooking/>;
 else if(page==="problems")content=slug?<ProblemDetail params={{slug}}/>:<Problems/>;
 else if(page==="vehicles")content=slug?<VehicleDetail params={{slug}}/>:<Vehicles/>;
 else notFound();
 return <DesignShell id={params.variant} settings={getSettings()}>{content}</DesignShell>;
}
