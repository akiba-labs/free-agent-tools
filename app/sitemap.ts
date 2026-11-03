import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: "https://free-agent-tools.vercel.app", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: "https://free-agent-tools.vercel.app/pro", lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: "https://free-agent-tools.vercel.app/checklist", lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: "https://free-agent-tools.vercel.app/rules.json", lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: "https://free-agent-tools.vercel.app/rules.md", lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: "https://free-agent-tools.vercel.app/llms.txt", lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];
}
