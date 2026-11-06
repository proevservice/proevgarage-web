/** @type {import('next').NextConfig} */
// Built as a fully static site (out/) for Cloudflare Pages, where static
// requests and bandwidth are free and unlimited. Redirects and cache headers
// live in public/_redirects and public/_headers.
const nextConfig = {
    output: 'export',
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
