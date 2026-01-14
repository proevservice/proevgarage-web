import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

// --- Types ---
export interface Settings {
    brand_name: string;
    address: string;
    phone: string;
    facebook: string;
    messenger: string;
    line: string;
    maps: string;
    hours: string;
    service_areas: string[];
    models: string[];
}

export interface Service {
    slug: string;
    title: string;
    description: string;
    icon: string;
    image?: string;
    content: string; // Markdown body
    qna?: { question: string; answer: string }[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    thumbnail?: string;
    content: string;
}

// --- Loaders ---
export function getSettings(): Settings {
    try {
        const fullPath = path.join(contentDirectory, "settings.json");
        if (!fs.existsSync(fullPath)) return {} as Settings;
        const fileContents = fs.readFileSync(fullPath, "utf8");
        return JSON.parse(fileContents);
    } catch (e) {
        console.error("Error loading settings:", e);
        return {} as Settings;
    }
}

export function getAllServices(): Service[] {
    const dir = path.join(contentDirectory, "services");
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    return files.map(file => {
        const content = fs.readFileSync(path.join(dir, file), "utf8");
        const data = JSON.parse(content);
        return { ...data, slug: file.replace(".json", "") };
    });
}

export function getAllLegacyServices(): Service[] {
    // Handling the case where previous Step made .md files in services
    // I will read .md as fallback or just migrate them later.
    // For now, let's stick to the Plan: JSON if possible, but Decap usually writes markdown for collections unless extension is json.
    // Wait, my config.yml for services didn't specify extension: json. So Decap makes Markdown + Frontmatter.
    // So I should read Markdown.

    // CORRECTED LOADER FOR MARKDOWN SERVICES
    const dir = path.join(contentDirectory, "services");
    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
    return files.map(file => {
        const fullPath = path.join(dir, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug: file.replace(".md", ""),
            ...data,
            content
        } as Service;
    });
}

export function getAllFAQs(): FAQ[] {
    const dir = path.join(contentDirectory, "faq");
    if (!fs.existsSync(dir)) return [];
    // FAQs in config are a folder collection with explicit fields, so likely MD or JSON files.
    // Let's assume MD files for simplicity as Decap defaults to that.
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
    return files.map(file => {
        const fullPath = path.join(dir, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return data as FAQ;
    });
}

export function getAllPosts(): Post[] {
    const dir = path.join(contentDirectory, "posts");
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));
    return files.map(file => {
        const fullPath = path.join(dir, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug: file.replace(".md", ""),
            ...data,
            content
        } as Post;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(contentDirectory, "posts", `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        slug,
        ...data,
        content
    } as Post;
}
