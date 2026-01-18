"use client";

import { LucideIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

// --- UI Components ---

export const SectionTitle = ({ children, subtitle, align = "center" }: { children: React.ReactNode; subtitle?: string; align?: "center" | "left" }) => (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}>
        {subtitle && (
            <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-accent">
                {subtitle}
            </span>
        )}
        <h2 className="text-3xl font-bold leading-tight md:text-4xl text-text">
            {children}
        </h2>
    </div>
);

export const FeatureCard = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <Icon className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-text">{title}</h3>
        <p className="text-muted">{description}</p>
    </div>
);

export const ServiceCard = ({ title, items, image }: { title: string; items: string[]; image?: string }) => (
    <div className="overflow-hidden rounded-xl bg-surface border border-border shadow-sm">
        <div className="relative h-48 w-full bg-border/20">
            {/* Placeholder for real image */}
            <div className="absolute inset-0 flex items-center justify-center text-muted">
                {image ? (
                    <Image src={image} alt={title} fill className="object-cover" />
                ) : (
                    <span>[Image: {title}]</span>
                )}
            </div>
        </div>
        <div className="p-6">
            <h3 className="mb-4 text-xl font-bold text-text">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-muted">
                        <span className="mr-2 text-accent">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export const CaseCard = ({ title, problem, fix, image }: { title: string; problem: string; fix: string; image?: string }) => (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="relative h-56 w-full bg-border/20">
            <div className="absolute inset-0 flex items-center justify-center text-muted">
                {image ? (
                    <Image src={image} alt={title} fill className="object-cover" />
                ) : (
                    <span>[Case Image]</span>
                )}
            </div>
            <div className="absolute top-4 left-4 rounded bg-accent px-3 py-1 text-xs font-bold text-white shadow-md">
                Case Study
            </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-1 text-lg font-bold text-text">{title}</h3>
            <div className="mt-4 space-y-3 text-sm">
                <div>
                    <span className="font-bold text-red-500">อาการ:</span>{" "}
                    <span className="text-muted">{problem}</span>
                </div>
                <div>
                    <span className="font-bold text-accent">การแก้ไข:</span>{" "}
                    <span className="text-muted">{fix}</span>
                </div>
            </div>
        </div>
    </div>
);

export const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
    <div className="border-b border-border py-4 last:border-0">
        <h4 className="font-bold text-lg mb-2 text-text">{question}</h4>
        <p className="text-muted">{answer}</p>
    </div>
);
