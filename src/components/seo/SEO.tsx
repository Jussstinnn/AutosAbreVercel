import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Aplica title / meta description dinámicos por página y hace scroll-top al navegar.
 */
interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown>;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, key, name] = /\[(\w+)="([^"]+)"\]/.exec(selector) ?? [];
        if (key && name) el.setAttribute(key, name);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    if (description) {
      setMeta('meta[name="description"]', "content", description);
      setMeta('meta[property="og:description"]', "content", description);
    }
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:type"]', "content", ogType);
    if (ogImage) setMeta('meta[property="og:image"]', "content", ogImage);

    // Canonical
    const canonicalHref = canonical ?? (typeof window !== "undefined" ? window.location.href : "");
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalHref;

    // JSON-LD
    const existing = document.head.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "jsonld";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, ogImage, ogType, jsonLd]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return null;
}
