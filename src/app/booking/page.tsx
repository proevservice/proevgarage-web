import { getSettings } from "@/lib/site";
import { MessageCircle, Phone, Calendar, CheckSquare, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
    const settings = getSettings();

    return (
        <main className="min-h-screen bg-bg">
            <div className="bg-surface pt-24 pb-16 text-center text-text border-b border-border shadow-sm">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">ขั้นตอนการจองคิว</h1>
                <p className="text-muted">สะดวกรวดเร็ว ไม่ต้องรอนาน</p>
            </div>

            <div className="container px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Steps */}
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-lg shadow-accent/20">1</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-text">เตรียมข้อมูลรถ</h3>
                                <p className="text-muted">แจ้งยี่ห้อ รุ่น และปีจดทะเบียน (เช่น NETA V ปี 2023)</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-lg shadow-accent/20">2</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-text">ถ่ายรูป/วีดีโออาการ</h3>
                                <p className="text-muted">หากมีไฟเตือนโชว์ หรือเสียงผิดปกติ ควรถ่ายรูป/วีดีโอส่งให้ช่างวิเคราะห์ก่อน</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-bold text-white shadow-lg shadow-accent/20">3</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold text-text">ทักแชทจองคิว</h3>
                                <p className="text-muted">ส่งข้อมูลทั้งหมดทาง Facebook Messenger เพื่อคอนเฟิร์มวันเวลา</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Card */}
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-8 shadow-2xl border border-border">
                        <MessageCircle className="mb-6 h-16 w-16 text-[#0084FF]" />
                        <h2 className="mb-4 text-2xl font-bold text-center text-text">จองคิวผ่าน Facebook</h2>
                        <p className="mb-8 text-center text-muted">
                            แอดมินและช่างเทคนิคพร้อมตอบคำถาม<br />เวลาทำการ 09:00 - 19:00 น.
                        </p>
                        <Link
                            href={settings.messenger}
                            target="_blank"
                            className="w-full inline-flex items-center justify-center rounded-full bg-[#0084FF] px-6 py-3 text-white transition-all hover:bg-[#0073e6] active:scale-95 text-base font-bold shadow-lg"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" /> เปิด Facebook Messenger
                        </Link>

                        <div className="my-6 w-full border-t border-border" />

                        <div className="flex w-full gap-4">
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="flex flex-1 items-center justify-center rounded-xl bg-surface border border-border py-3 font-semibold text-[#06C755] transition-colors hover:bg-bg"
                            >
                                LINE OA
                            </Link>
                            <Link
                                href={`tel:${settings.phone}`}
                                className="flex flex-1 items-center justify-center rounded-xl bg-surface border border-border py-3 font-semibold text-text transition-colors hover:bg-bg"
                            >
                                <Phone className="mr-2 h-4 w-4" /> โทรเลย
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
