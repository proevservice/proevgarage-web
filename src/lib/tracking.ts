// Google Tag Manager & DataLayer Utilities

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

type LeadType = "facebook_chat" | "line_chat" | "phone_call" | "navigation";

interface LeadEvent {
    event: string;
    lead_type: LeadType;
    page_type: string; // e.g., 'landing'
    page_name: string; // e.g., 'ev_repair_landing'
    service_area_km: number;
    click_location?: string;
    [key: string]: any;
}

// Debounce map to prevent double-firing
const eventTimestamps: Record<string, number> = {};
const DEBOUNCE_MS = 1000;

export const sendLeadEvent = (
    lead_type: LeadType,
    location: string = "unknown"
) => {
    const now = Date.now();
    const key = `${lead_type}-${location}`;

    // Prevent double firing within 1 second
    if (eventTimestamps[key] && now - eventTimestamps[key] < DEBOUNCE_MS) {
        console.log(`[Tracking] Debounced event: ${key}`);
        return;
    }

    eventTimestamps[key] = now;

    // Map internal types to requested Event Names
    let eventName = "generate_lead";
    switch (lead_type) {
        case "phone_call":
            eventName = "generate_lead_call";
            break;
        case "line_chat":
            eventName = "generate_lead_line";
            break;
        case "facebook_chat":
            eventName = "generate_lead_message";
            break;
        case "navigation":
            eventName = "generate_lead_navigation";
            break;
    }

    const eventData: LeadEvent = {
        event: eventName,
        lead_type,
        page_type: "landing",
        page_name: "ev_repair_landing",
        service_area_km: 20,
        click_location: location,
    };

    if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push(eventData);
        console.log("[Tracking] Event pushed:", eventData);
    } else {
        console.warn("[Tracking] dataLayer not found", eventData);
    }
};

// Add typescript support for dataLayer
declare global {
    interface Window {
        dataLayer: any[];
    }
}
