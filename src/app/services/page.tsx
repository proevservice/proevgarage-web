import { getAllLegacyServices, getSettings } from "@/lib/site";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function ServicesPage() {
    const settings = getSettings();
    const services = getAllLegacyServices(); // using legacy loader to get MD content

    return (
        <div className="bg-bg min-h-screen pb-20">
            {/* Header */}
            <div className="bg-surface pt-24 pb-16 text-center text-text border-b border-border shadow-sm">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">บริการของเรา</h1>
                <p className="text-muted">ดูแลรถไฟฟ้าของคุณด้วยมาตรฐานมืออาชีพ</p>
            </div>

            <div className="container px-4 py-12">
                <div className="space-y-16">
                    {services.map((service: any, index: number) => {
                        const Icon = (LucideIcons as any)[service.icon] || LucideIcons.Wrench;
                        const isEven = index % 2 === 0;

                        return (
                            <div key={index} className={`flex flex-col gap-8 lg:items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                {/* Content */}
                                <div className="flex-1 space-y-6">
                                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-card border border-border text-accent shadow-lg shadow-accent/10">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-text">{service.title}</h2>
                                    <div className="prose prose-lg dark:prose-invert text-muted">
                                        {service.content}
                                    </div>

                                    {/* Mini Q&A if present */}
                                    {service.qna && service.qna.length > 0 && (
                                        <div className="mt-6 rounded-xl border border-border bg-card p-6">
                                            <h4 className="mb-4 font-bold text-accent">คำถามที่พบบ่อย</h4>
                                            <div className="space-y-4">
                                                {service.qna.map((qa: any, qIdx: number) => (
                                                    <div key={qIdx}>
                                                        <p className="font-semibold text-text text-sm">Q: {qa.question}</p>
                                                        <p className="text-sm text-muted">A: {qa.answer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <Link
                                            href={settings.facebook}
                                            target="_blank"
                                            className="inline-flex items-center justify-center rounded-full border border-accent/50 px-6 py-3 text-accent transition-all hover:bg-accent hover:text-white active:scale-95 text-base font-bold"
                                        >
                                            จองคิวซ่อมรายการนี้
                                        </Link>
                                    </div>
                                </div>

                                {/* Image Placeholder */}
                                <div className="flex-1">
                                    <div className="aspect-video w-full overflow-hidden rounded-2xl bg-card border border-border shadow-2xl">
                                        <div className="flex h-full w-full items-center justify-center text-muted">
                                            {service.image ? (
                                                // Ideally use next/image but for external/cms images simple img is safer if domains not optimized
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <span>รูปภาพ {service.title}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
