import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Placeholder for now as we don't have getAllPosts implemented in lib/content yet
// In a real app we'd fetch the specific post by slug.
// Ensure to implement getPostBySlug in content.ts later.

export default function BlogPost({ params }: { params: { slug: string } }) {
    // Mock data matching the list page for now to pass build and show structure
    const post = {
        title: "5 วิธีดูแลรถไฟฟ้าให้แบตเตอรี่ทนทาน",
        date: "2024-03-20",
        content: `
การดูแลรักษาแบตเตอรี่รถยนต์ไฟฟ้า (EV Battery) เป็นเรื่องสำคัญมาก...

1. อย่าปล่อยให้แบตหมดเกลี้ยง (Deep Discharge)
2. หลีกเลี่ยงการจอดตากแดดจัด
3. ชาร์จแบบ AC บ่อยกว่า DC
    `,
        cover: "/uploads/blog-battery.jpg"
    };

    return (
        <main className="min-h-screen py-16">
            <article className="container mx-auto max-w-3xl px-4">
                <Link href="/blog" className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600">
                    <ArrowLeft className="mr-2 h-4 w-4" /> กลับไปหน้าบทความ
                </Link>

                <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
                <div className="mb-8 text-gray-500">{post.date}</div>

                <div className="prose prose-lg max-w-none">
                    {/* simple whitespace rendering for now, normally use <Markdown> */}
                    <div className="whitespace-pre-wrap">{post.content}</div>
                </div>
            </article>
        </main>
    );
}
