# Pro EV Service Website (Premium Build)

A high-performance, conversion-focused website for "Pro EV Service" (Pak Kret), built with Next.js 14 and Decap CMS.

## Key Features
- **Design**: Premium "Auto Garage" aesthetic with Tailwind CSS.
- **CMS**: Decap CMS via CDN (no npm dependency) for easy content management.
- **Conversion**: Sticky Mobile CTA Bar, focused booking flows via Messenger/LINE.
- **SEO**: Local SEO optimized (JSON-LD, Geo-tags, Thai Metadata).
- **Performance**: Static Generation (SSG) for fast load times on Vercel.

## Quick Start

1. **Install**
   ```bash
   npm install
   ```
   *Note: Ensure you do NOT have `decap-cms-app` in dependencies.*

2. **Develop**
   ```bash
   npm run dev
   ```
   Access site at `http://localhost:3000`.
   Access CMS at `http://localhost:3000/admin`.

## CMS Configuration
The CMS is located at `public/admin/index.html` which loads the script from UNPKG CDN.
Configuration is in `public/admin/config.yml`.

- **Collections**:
  - **Settings**: Business info, hours, social links.
  - **Services**: Service details with Q&A.
  - **Posts**: Blog articles.
  - **FAQ**: Home page FAQs.

- **Content Storage**:
  - `content/settings.json`
  - `content/services/*.md` (or json)
  - `content/posts/*.md`

- **Authentication**:
  - Default config uses `git-gateway`.
  - For Vercel deployment, recommend switching backend to `github` in `config.yml` if not using Netlify Identity.
  ```yaml
  backend:
    name: github
    repo: your-username/your-repo
  ```

## Deployment steps (Vercel)

1. Push to GitHub.
2. Import project in Vercel.
3. Build Settings:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
4. Deploy.

## Domain Setup (Namecheap)

1. In Vercel > Settings > Domains, add `proevgarage.com`.
2. Vercel will provide A Record and CNAME values.
3. Login to Namecheap > Manage Domain > Advanced DNS.
4. Add the A Record and CNAME provided by Vercel.
   - Type: A Record | Host: @ | Value: 76.76.21.21 (Example)
   - Type: CNAME | Host: www | Value: cname.vercel-dns.com

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS + Typography + Animate
- Lucide React (Icons)
- Decap CMS (CDN)
