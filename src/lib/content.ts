import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Settings {
    brand_name: string;
    address: string;
    phone: string;
    facebook: string;
    messenger: string;
    line: string;
    maps: string;
}

export function getSettings(): Settings {
    const fullPath = path.join(contentDirectory, "settings", "general.json");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(fileContents);
}

export interface Service {
    slug: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    content: string;
    [key: string]: any;
}

export interface HomePageData {
    hero_title: string;
    hero_subtitle: string;
    highlights: { title: string; icon: string }[];
    content: string;
    [key: string]: any;
}

export function getHomePageData(): HomePageData {
    const fullPath = path.join(contentDirectory, "pages", "home.md");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { ...data, content } as HomePageData;
}

export function getAllServices(): Service[] {
    const servicesDir = path.join(contentDirectory, "services");
    if (!fs.existsSync(servicesDir)) return [];
    const fileNames = fs.readdirSync(servicesDir);
    const transform = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(servicesDir, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug,
            ...data,
            content,
        } as Service;
    });
    return transform;
}
