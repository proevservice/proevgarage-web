"use client";
import { usePathname } from "next/navigation";
export default function ProductionChrome({children}:{children:React.ReactNode}) {
 const pathname=usePathname();
 return pathname.startsWith("/designs") ? null : <>{children}</>;
}
