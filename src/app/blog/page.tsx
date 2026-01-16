import { getAllPosts } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <main className="min-h-screen bg-bg">
            <div className="bg-surface pt-24 pb-16 text-center text-text border-b border-border">
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">บทความน่ารู้</h1>
                <p className="text-muted">
                    สาระความรู้เกี่ยวกับการดูแลรถยนต์ไฟฟ้า
                </p>
            </div>
            <div className="container px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all hover:shadow-accent/10 hover:border-accent/30 hover:-translate-y-1">
                            <div className="relative h-48 w-full bg-surface border-b border-border overflow-hidden">
                                {post.thumbnail ? (
                                    <Image
                                        src={post.thumbnail}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-muted">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-2 text-sm text-muted">{new Date(post.date).toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <h2 className="mb-2 text-xl font-bold text-text group-hover:text-accent transition-colors line-clamp-2">{post.title}</h2>
                                <p className="text-sm text-muted line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <span className="mt-4 text-sm font-medium text-accent underline decoration-transparent transition-all group-hover:decoration-accent">
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
