// Preview/branch deploys must not be indexed. Works on Vercel and Cloudflare Pages.
export const isPreviewDeploy=
 process.env.VERCEL_ENV==="preview"||
 (!!process.env.CF_PAGES_BRANCH&&process.env.CF_PAGES_BRANCH!=="main");
