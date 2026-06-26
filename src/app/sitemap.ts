// 사이트맵 자동 생성
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/company", "/business", "/project", "/technology", "/contact"];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE.domain}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
