import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://proevgarage.com/",
            lastModified: new Date(),
        },
        {
            url: "https://proevgarage.com/services",
            lastModified: new Date(),
        },
        {
            url: "https://proevgarage.com/contact",
            lastModified: new Date(),
        },
        {
            url: "https://proevgarage.com/booking",
            lastModified: new Date(),
        },
        {
            url: "https://proevgarage.com/blog",
            lastModified: new Date(),
        },
    ];
}
