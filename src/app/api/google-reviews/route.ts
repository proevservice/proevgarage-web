import { NextResponse } from "next/server";
import { getGoogleReviews } from "@/lib/google";

export async function GET() {
    try {
        const data = await getGoogleReviews();

        if (data.isFallback) {
            // Optional: Return a different status or header if needed, but 200 OK with fallback data is often safer for UI stability.
            // However, for monitoring, you might want to know.
            // We'll keep it simple: return the data.
        }

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200'
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 502 }
        );
    }
}
