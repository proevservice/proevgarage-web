import { getSettings } from "@/lib/content";
import Link from "next/link";
// We need a function to get posts. 
// I'll add a dummy list for now or I should update lib/content.ts first?
// Let's assume I'll add getPosts() to content.ts or just inline dummy data for now to keep build green,
// then update content.ts. 
// Actually I'll use a placeholder array here and implement getPosts later or now.
// It's better to implement real logic.

const posts = [
    {
        slug: "ev-maintenance-tips",
        title: "5 วิธีดูแลรถไฟฟ้าให้แบตเตอรี่ทนทาน",
        excerpt: "เคล็ดลับการดูแลรักษาแบตเตอรี่รถยนต์ไฟฟ้าให้ใช้งานได้ยาวนาน...",
        date: "2024-03-20",
        cover: "/uploads/blog-battery.jpg"
    },
    {
        slug: "ev-maintenance-tips",
        title: "5 วิธีดูแลรถไฟฟ้าให้แบตเตอรี่ทนทาน",
        excerpt: "เคล็ดลับการดูแลรักษาแบตเตอรี่รถยนต์ไฟฟ้าให้ใช้งานได้ยาวนาน...",
        date: "2024-03-20",
        cover: "/uploads/blog-battery.jpg"
    },
    {
        slug: "ev-maintenance-tips",
        title: "5 วิธีดูแลรถไฟฟ้าให้แบตเตอรี่ทนทาน",
        excerpt: "เคล็ดลับการดูแลรักษาแบตเตอรี่รถยนต์ไฟฟ้าให้ใช้งานได้ยาวนาน...",
        date: "2024-03-20",
        cover: "/uploads/blog-battery.jpg"
    },
    {
        slug: "ac-warning-signs",
        title: "แอร์รถไฟฟ้าไม่เย็น เกิดจากอะไร?",
        excerpt: "วิเคราะห์อาการแอร์รถไฟฟ้าไม่เย็น มีเสียงดัง หรือมีแต่ลม...",
        date: "2024-03-15",
        cover: "/uploads/blog-ac.jpg"
    }
];

export default function BlogPage() {
    return (
        <main className="min-h-screen py-16">
            <div className="container px-4">
                <h1 className="mb-4 text-center text-4xl font-bold">บทความน่ารู้</h1>
                <p className="mb-12 text-center text-gray-600">
                    สาระความรู้เกี่ยวกับการดูแลรถยนต์ไฟฟ้า
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:shadow-lg">
                            <div className="h-48 w-full bg-gray-200">
                                {/* Image Placeholder */}
                                <div className="flex h-full w-full items-center justify-center text-gray-400">
                                    Image: {post.title}
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-2 text-sm text-gray-500">{post.date}</div>
                                <h2 className="mb-2 text-xl font-bold group-hover:text-green-600">{post.title}</h2>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <span className="mt-4 text-sm font-medium text-green-600 underline decoration-transparent transition-all group-hover:decoration-green-600">
                                    อ่านต่อ
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
