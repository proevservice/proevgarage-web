import type {Settings} from "@/lib/site";
import {businessGraph} from "@/lib/seo";
export function JsonLd({settings}:{settings:Settings}){return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(businessGraph(settings)).replace(/</g,"\\u003c")}}/>;}
