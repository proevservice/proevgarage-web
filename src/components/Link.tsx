import NextLink from "next/link";
import type {ComponentProps} from "react";

// Next.js prefetches every <Link> that scrolls into view. On Vercel each
// prefetch is a CDN request, so a card grid could fire dozens of requests per
// visit. Prefetch is off by default here; pass prefetch explicitly to opt in.
export default function Link({prefetch=false,...props}:ComponentProps<typeof NextLink>){
 return <NextLink prefetch={prefetch} {...props}/>;
}
