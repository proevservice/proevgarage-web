import { UserPlus } from "lucide-react";
import Link from "next/link";

export function MobileSaveContactBtn() {
    return (
        <Link
            href="/proevservice.vcf"
            className="md:hidden w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#1e293b]/80 px-6 py-4 text-center backdrop-blur-md transition-all active:scale-95 active:bg-[#1e293b] mb-8"
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <UserPlus className="h-5 w-5 text-accent" />
            </div>
            <div className="flex flex-col items-start">
                <span className="text-base font-bold text-white leading-tight">บันทึกเบอร์ร้าน</span>
                <span className="text-xs text-white/60 font-light">
                    แตะเพื่อเมมเบอร์ลงมือถือทันที
                </span>
            </div>
        </Link>
    );
}
