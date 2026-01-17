import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, MessageSquareQuote, CheckCircle } from "lucide-react";
import { GooglePlaceDetails } from "@/lib/google";

interface GoogleReviewsProps {
    data: GooglePlaceDetails;
}

export function GoogleReviews({ data }: GoogleReviewsProps) {
    const { reviews, ratingAvg, reviewCount, googleMapsUrl } = data;

    // Use a subset of reviews (max 4 or 5) for display if needed, but API usually returns 5.
    const displayReviews = reviews.slice(0, 5);

    return (
        <section id="reviews" aria-label="Customer Reviews" className="bg-brand-black py-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container px-4 relative z-10">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-brand-green mb-4">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verified Reviews</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-white md:text-5xl mb-4">
                        เสียงจากลูกค้า
                    </h2>
                    <p className="text-brand-muted text-lg max-w-2xl mx-auto">
                        ความประทับใจจากลูกค้าตัวจริงที่ใช้บริการกับเรา
                    </p>

                    {/* Rating Summary */}
                    {ratingAvg && (
                        <div className="mt-8 flex flex-col items-center justify-center gap-2">
                            <div className="flex items-center gap-1">
                                <span className="text-4xl font-black text-white">{ratingAvg}</span>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-6 w-6 ${i < Math.round(ratingAvg) ? 'fill-yellow-500' : 'fill-white/10 text-white/10'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="text-sm text-brand-muted">
                                จาก {reviewCount} รีวิวบน <span className="text-brand-green font-bold">Google Maps</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {displayReviews.map((review, i) => (
                        <div key={i} className="flex flex-col rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 hover:border-brand-green/50 transition-colors duration-300">
                            <div className="mb-6 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {review.profile_photo_url ? (
                                        <Image
                                            src={review.profile_photo_url}
                                            alt={review.author_name}
                                            width={48}
                                            height={48}
                                            className="rounded-full border border-white/10"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 rounded-full bg-brand-green text-brand-black font-bold flex items-center justify-center text-lg">
                                            {review.author_name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-white text-base leading-tight">
                                            {review.author_name}
                                        </div>
                                        <div className="text-xs text-brand-muted mt-0.5">
                                            {review.relative_time_description}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <MessageSquareQuote className="h-8 w-8 text-white/5" />
                                </div>
                            </div>

                            <div className="flex text-yellow-500 mb-4 h-4">
                                {[...Array(5)].map((_, stars) => (
                                    <Star key={stars} className={`h-4 w-4 ${stars < review.rating ? 'fill-yellow-500' : 'fill-white/10 text-white/10'}`} />
                                ))}
                            </div>

                            <p className="text-brand-muted font-light leading-relaxed line-clamp-4 flex-1">
                                &quot;{review.text}&quot;
                            </p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    {googleMapsUrl && (
                        <Link
                            href={googleMapsUrl}
                            target="_blank"
                            className="inline-flex items-center gap-2 btn-outline border-white/20 text-white hover:bg-white hover:text-brand-black hover:border-transparent transition-all px-8 py-3 rounded-full font-bold"
                        >
                            <MapPin className="h-4 w-4" />
                            ดูรีวิวทั้งหมดบน Google
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
