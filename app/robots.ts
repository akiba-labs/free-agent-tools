import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/pro/yes/", "/checklist/download"] }, sitemap: "https://free-agent-tools.vercel.app/sitemap.xml" };
}
