import styles from "./work.module.css";

// Facebook's official video plugin; supports reel, watch and page video URLs.
function embedUrl(href: string) {
  const u = new URL("https://www.facebook.com/plugins/video.php");
  u.searchParams.set("href", href);
  u.searchParams.set("show_text", "false");
  u.searchParams.set("lazy", "true");
  return u.href;
}

export function isFacebookVideo(href: string) {
  try {
    const u = new URL(href);
    return u.protocol === "https:" && /(^|\.)facebook\.com$/.test(u.hostname);
  } catch {
    return false;
  }
}

export default function FacebookVideo({ urls, title, language = "th" }: { urls?: string[]; title: string; language?: "th" | "en" }) {
  const list = (urls || []).filter(isFacebookVideo);
  if (!list.length) return null;
  return (
    <section className={styles.videos} aria-label={language === "en" ? "Video from the post" : "วิดีโอจากโพสต์"}>
      {list.map((href, i) => {
        const vertical = /\/reel\//.test(href);
        return (
          <div key={href} className={vertical ? styles.videoReel : styles.videoWide}>
            <iframe
              src={embedUrl(href)}
              title={`${title} ${language === "en" ? "video" : "วิดีโอ"} ${i + 1}`}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        );
      })}
    </section>
  );
}

export function mediaCount(c: { images?: string[]; videoUrls?: string[] }, language: "th" | "en" = "th") {
  const photos = c.images?.length || 0;
  if (!photos && c.videoUrls?.length) return language === "en" ? "Video" : "วิดีโอ";
  return language === "en" ? `${photos || 1} photos` : `${photos || 1} ภาพ`;
}
