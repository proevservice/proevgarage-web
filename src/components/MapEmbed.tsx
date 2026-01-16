import { getSettings } from "@/lib/content";

export function MapEmbed() {
    const settings = getSettings();

    // Extracting standard Google Maps Embed URL or using a fixed one if complex parsing needed.
    // Ideally, the settings would contain the embed URL, but let's stick to the one provided in requirements for now
    // or use the one from settings if it matches embed format.
    // The requirement gave: https://maps.app.goo.gl/h21RDsTBUFH5fH9z7 (Share Link)
    // For embed, we usually need the pb=... string.
    // I will use the hardcoded one from the previous Home page implementation as it was working/placeholder,
    // but really we should allow it to be configurable if possible. 
    // For this tasks, I'll hardcode the known working embed for the location "Major Hollywood Pak Kret".

    return (
        <section className="h-[400px] w-full bg-gray-200">
            <iframe
                src="https://www.google.com/maps?cid=12415469945169781142&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pro EV Service Map"
            ></iframe>
        </section>
    );
}
