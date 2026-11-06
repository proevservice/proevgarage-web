"use client";
// Contact links for the Google Ads landing page.
//
// Conversion contract (see CONVERSION-CONTRACT.md): every CTA stays a plain
// <a> to the same destination, with no preventDefault or router interception,
// so the existing GTM link-click triggers (tel: / line.me / facebook.com|m.me)
// keep firing. Each CTA also pushes its original dataLayer event via
// sendLeadEvent with the original lead type and click location.
import {useEffect, useState} from "react";
import {sendLeadEvent} from "@/lib/tracking";
import s from "./landing.module.css";
import {LINKS} from "./links";

export type Lead = "facebook_chat" | "line_chat" | "phone_call" | "navigation";


export function LeadLink({type, location, href, className, children}: {type: Lead; location: string; href: string; className?: string; children: React.ReactNode}) {
 const external = !href.startsWith("tel:");
 return <a
  href={href}
  className={className}
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
  data-lead-type={type}
  data-lead-location={location}
  onClick={() => sendLeadEvent(type, location)}
 >{children}</a>;
}

export function StickyBar() {
 const [show, setShow] = useState(false);
 useEffect(() => {
  const onScroll = () => setShow(window.scrollY > 500);
  onScroll();
  window.addEventListener("scroll", onScroll, {passive: true});
  return () => window.removeEventListener("scroll", onScroll);
 }, []);
 return <div className={s.sticky} data-show={show}>
  <LeadLink type="facebook_chat" location="sticky_bar" href={LINKS.FB_MESSENGER} className={s.stickyFb}>แชท FB</LeadLink>
  <LeadLink type="line_chat" location="sticky_bar" href={LINKS.LINE} className={s.stickyLine}>ไลน์</LeadLink>
  <LeadLink type="phone_call" location="sticky_bar" href={`tel:${LINKS.PHONE}`} className={s.stickyCall}>โทรเลย</LeadLink>
 </div>;
}
