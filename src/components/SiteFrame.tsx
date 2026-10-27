"use client";
import { usePathname } from "next/navigation";
import DesignShell from "@/components/designs/DesignShell";
import type { Settings } from "@/lib/site";

export default function SiteFrame({settings,children,legacyHeader,legacyFooter}:{settings:Settings;children:React.ReactNode;legacyHeader:React.ReactNode;legacyFooter:React.ReactNode}) {
 const pathname=usePathname();
 const english=pathname==="/en"||pathname.startsWith("/en/");
 const displaySettings=english?{...settings,address:"Major Hollywood, Pak Kret, Nonthaburi 11120, Thailand",hours:"09:00–19:00 · Closed Wednesdays"}:settings;
 if(pathname === "/ev-repair" || pathname === "/ev-repair/")return <>{legacyHeader}<main className="flex-1 w-full">{children}</main>{legacyFooter}</>;
 if(pathname.startsWith("/designs"))return <main className="flex-1 w-full">{children}</main>;
 return <DesignShell id="1" settings={displaySettings} review={false}><main className="flex-1 w-full">{children}</main></DesignShell>;
}
