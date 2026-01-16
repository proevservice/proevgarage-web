import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/site";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-bg">
            <article>
                {/* Hero / Header */}
                <div className="bg-surface border-b border-border pt-24 pb-12">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <Link href="/blog" className="mb-6 inline-flex items-center text-sm font-medium text-muted hover:text-accent transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" /> กลับไปหน้าบทความ
                        </Link>

                        <h1 className="mb-6 text-3xl font-extrabold text-text md:text-5xl leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-sm text-muted">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-accent" />
                                <span>{new Date(post.date).toLocaleDateString("th-TH", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-accent" />
                                <span>อ่าน 5 นาที</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container px-4 py-12 max-w-4xl mx-auto">
                    {/* Featured Image */}
                    {post.thumbnail && (
                        <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted prose-headings:text-text prose-a:text-accent prose-strong:text-text prose-li:text-muted">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-border">
                        <Link href="/blog" className="btn-outline w-full md:w-auto text-center justify-center">
                            <ArrowLeft className="mr-2 h-4 w-4" /> อ่านบทความอื่น
                        </Link>
                    </div>
                </div>
            </article>
        </main>
    );
}
