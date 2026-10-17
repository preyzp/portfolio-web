import type { Metadata } from "next";

// Never infer a production domain from a preview deployment or request host.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000");
if (!["http:", "https:"].includes(siteUrl.protocol) || siteUrl.username || siteUrl.password || siteUrl.pathname !== "/" || siteUrl.search || siteUrl.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without a path, credentials, query, or fragment.");
}

export const homeTitle = "Zakharias Priya | Product Designer / UI/UX Designer";
export const siteDescription = "Zakharias Priya is a Product Designer / UI/UX Designer specializing in B2B SaaS, enterprise software, design systems, and digital products.";

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  const image = {
    url: new URL("/opengraph-image", siteUrl).href,
    width: 1200,
    height: 630,
    alt: "Zakharias Priya — Product Designer / UI/UX Designer",
  };
  return {
    title,
    description,
    alternates: { canonical: new URL(pathname, siteUrl).href },
    openGraph: {
      type: "website", locale: "en_US", siteName: "Zakharias Priya",
      title, description, url: new URL(pathname, siteUrl).href, images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
