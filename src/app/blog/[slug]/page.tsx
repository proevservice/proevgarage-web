import type { Metadata } from "next";
import {pageMetadata,articleImage,articleSchema,webPageSchema,articleServices} from "@/lib/seo";
import {services} from "@/lib/website-v3";
import {Schema,Breadcrumbs} from "@/components/WebsiteV3";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/site";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function generateMetadata({params}:{params:{slug:string}}):Metadata {
 const post=getPostBySlug(params.slug);
 if(!post)return {};
 const meta=pageMetadata(post.title+" | Pro EV Service",post.excerpt,"/blog/"+post.slug,articleImage(post));
 return {...meta,openGraph:{...meta.openGraph,type:"article",publishedTime:post.date}};
}
export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-bg"><Schema data={articleSchema(post)}/><Schema data={webPageSchema(post.title,post.excerpt,"/blog/"+post.slug)}/>
            <article>
                {/* Hero / Header */}
                <div className="bg-surface border-b border-border pt-24 pb-12">
                    <div className="container px-4 max-w-4xl mx-auto">
                        <Breadcrumbs items={[{label:"บทความ",href:"/blog"},{label:post.title}]}/><Link href="/blog" className="mb-6 inline-flex items-center text-sm font-medium text-muted hover:text-accent transition-colors">
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
                                <span>บทความโดยทีม Pro EV Service</span>
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
                                src={articleImage(post)}
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

                    <section className="mt-12 pt-8 border-t border-border"><h2 className="text-2xl font-semibold mb-4">บริการและผลงานที่เกี่ยวข้อง</h2>{services.filter(item=>(articleServices[post.slug]||[]).includes(item.slug)).map(item=><p className="mb-3" key={item.slug}><Link className="text-accent" href={"/services/"+item.slug}>{item.title} ที่ Pro EV Service ปากเกร็ด →</Link></p>)}<Link className="text-accent" href="/work">ดูผลงานซ่อมจริงของอู่ →</Link></section><div className="mt-16 pt-8 border-t border-border">
                        <Link href="/blog" className="btn-outline w-full md:w-auto text-center justify-center">
                            <ArrowLeft className="mr-2 h-4 w-4" /> อ่านบทความอื่น
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
