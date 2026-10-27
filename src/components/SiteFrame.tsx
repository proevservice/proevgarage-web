"use client";
import { usePathname } from "next/navigation";
import DesignShell from "@/components/designs/DesignShell";
import type { Settings } from "@/lib/site";

export default function SiteFrame({settings,children,legacyHeader,legacyFooter}:{settings:Settings;children:React.ReactNode;legacyHeader:React.ReactNode;legacyFooter:React.ReactNode}) {
 const pathname=usePathname();
 if(pathname === "/ev-repair" || pathname === "/ev-repair/")return <>{legacyHeader}<main className="flex-1 w-full">{children}</main>{legacyFooter}</>;
 if(pathname.startsWith("/designs"))return <main className="flex-1 w-full">{children}</main>;
 return <DesignShell id="1" settings={settings} review={false}><main className="flex-1 w-full">{children}</main></DesignShell>;
}
