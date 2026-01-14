import { Settings } from "@/lib/site";

export function JsonLd({ settings }: { settings: Settings }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        "name": settings.brand_name,
        "image": "https://proevgarage.com/uploads/cover.jpg",
        "telephone": settings.phone,
        "url": "https://proevgarage.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": settings.address,
            "addressLocality": "Pak Kret",
            "addressRegion": "Nonthaburi",
            "postalCode": "11120",
            "addressCountry": "TH"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.9130, // Approx for Major Hollywood Pak Kret
            "longitude": 100.5020
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "09:00",
                "closes": "19:00"
            }
        ],
        "sameAs": [
            settings.facebook,
            settings.line,
            settings.maps
        ],
        "priceRange": "$$"
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
