export interface GoogleReview {
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface GooglePlaceDetails {
    ratingAvg: number | null;
    reviewCount: number | null;
    googleMapsUrl: string | null;
    reviews: GoogleReview[];
    isFallback?: boolean;
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID; // ChIJTT7ZGtmF4jARliFimSKcTKw

const FALLBACK_REVIEWS: GooglePlaceDetails = {
    ratingAvg: 4.8,
    reviewCount: 18,
    googleMapsUrl: "https://maps.google.com/?cid=12415469945169781142",
    isFallback: true,
    reviews: [
        {
            author_name: "Nawat Sripathar",
            rating: 5,
            text: "มาล้างแอร์แล้วโอเคมาก บริการดี ละเอียด สุภาพ ช่างให้คำแนะนำดีมาก อุปกรณ์ครบ มีความรู้ระบบการทำงานของรถ",
            relative_time_description: "1 เดือนที่ผ่านมา",
            time: Date.now() / 1000 - 2592000,
        },
        {
            author_name: "คุณอารดา",
            rating: 5,
            text: "ช่างมีความรู้จริง อธิบายละเอียดมาก รถมีปัญหาเรื่องระบบไฟ เข้ามาที่นี่วันเดียวหาย ประทับใจมากค่ะ",
            relative_time_description: "2 เดือนที่ผ่านมา",
            time: Date.now() / 1000 - 5184000,
        },
        {
            author_name: "คุณสมชาย",
            rating: 5,
            text: "หาอู่ซ่อมรถไฟฟ้ายากมาก มาเจอที่นี่อุ่นใจเลยครับ เครื่องมือครบ ทีมงานมืออาชีพ",
            relative_time_description: "3 สัปดาห์ที่ผ่านมา",
            time: Date.now() / 1000 - 1814400,
        },
    ]
};

export async function getGoogleReviews(): Promise<GooglePlaceDetails> {
    if (!GOOGLE_MAPS_API_KEY || !GOOGLE_PLACE_ID) {
        console.warn('Google Maps API Key or Place ID is missing');
        return FALLBACK_REVIEWS;
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total,reviews,url&reviews_sort=most_relevant&language=th&key=${GOOGLE_MAPS_API_KEY}`;

        const res = await fetch(url, {
            next: {
                revalidate: 86400, // 24 hours
            }
        });

        if (!res.ok) {
            console.error(`Google Places API error: ${res.status} ${res.statusText}`);
            return FALLBACK_REVIEWS;
        }

        const data = await res.json();

        if (data.status !== 'OK' || !data.result) {
            console.error('Google Places API returned status:', data.status, data.error_message);
            return FALLBACK_REVIEWS;
        }

        const result = data.result;

        return {
            ratingAvg: result.rating || null,
            reviewCount: result.user_ratings_total || null,
            googleMapsUrl: result.url || null,
            reviews: result.reviews || [],
            isFallback: false
        };

    } catch (error) {
        console.error('Failed to fetch Google Reviews:', error);
        return FALLBACK_REVIEWS;
    }
}
