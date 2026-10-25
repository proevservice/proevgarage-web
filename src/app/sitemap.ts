import { MetadataRoute } from "next";
import { getRepairCases } from "@/lib/repair-cases";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://proevgarage.com/work" },
        ...getRepairCases().map(c => ({url: "https://proevgarage.com/work/" + c.slug, lastModified: c.updated || c.date})),
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
