import { getSettings } from "@/lib/site";
import { MessageCircle, Phone, Calendar, CheckSquare, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
    const settings = getSettings();

    return (
        <main className="min-h-screen bg-white">
            <div className="bg-brand-black/5 py-12 text-center">
                <h1 className="mb-2 text-3xl font-bold">ขั้นตอนการจองคิว</h1>
                <p className="text-gray-600">สะดวกรวดเร็ว ไม่ต้องรอนาน</p>
            </div>

            <div className="container px-4 py-12">
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Steps */}
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-white">1</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold">เตรียมข้อมูลรถ</h3>
                                <p className="text-gray-600">แจ้งยี่ห้อ รุ่น และปีจดทะเบียน (เช่น NETA V ปี 2023)</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-white">2</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold">ถ่ายรูป/วีดีโออาการ</h3>
                                <p className="text-gray-600">หากมีไฟเตือนโชว์ หรือเสียงผิดปกติ ควรถ่ายรูป/วีดีโอส่งให้ช่างวิเคราะห์ก่อน</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-green text-xl font-bold text-white">3</div>
                            <div>
                                <h3 className="mb-2 text-xl font-bold">ทักแชทจองคิว</h3>
                                <p className="text-gray-600">ส่งข้อมูลทั้งหมดทาง Facebook Messenger เพื่อคอนเฟิร์มวันเวลา</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Card */}
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border">
                        <MessageCircle className="mb-6 h-16 w-16 text-blue-600" />
                        <h2 className="mb-4 text-2xl font-bold text-center">จองคิวผ่าน Facebook</h2>
                        <p className="mb-8 text-center text-gray-500">
                            แอดมินและช่างเทคนิคพร้อมตอบคำถาม<br />เวลาทำการ 09:00 - 19:00 น.
                        </p>
                        <Link
                            href={settings.messenger}
                            target="_blank"
                            className="btn-primary w-full bg-blue-600 hover:bg-blue-700"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" /> เปิด Facebook Messenger
                        </Link>

                        <div className="my-6 w-full border-t" />

                        <div className="flex w-full gap-4">
                            <Link
                                href={settings.line}
                                target="_blank"
                                className="flex flex-1 items-center justify-center rounded-xl bg-gray-50 py-3 font-semibold text-[#06C755] transition-colors hover:bg-green-50"
                            >
                                LINE OA
                            </Link>
                            <Link
                                href={`tel:${settings.phone}`}
                                className="flex flex-1 items-center justify-center rounded-xl bg-gray-50 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
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
