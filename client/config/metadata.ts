import { SiteConfig } from "@/types"

/* ====================
[> WEBSITE CONFIG <]
-- Fill the details about your website
 ==================== */

export const baseUrl = "http://localhost:8080"

export const siteConfig: SiteConfig = {
  name: "PrezWiz",
  author: "junyoung4949",
  description: "발표자료의 답안지",
  keywords: [
    "PPT, 대본",
    "PPT 작성",
    "발표 대본 작성",
    "PPT 작성법",
    "발표 대본 작성법",
    "PPT 템플릿",
    "발표 대본 템플릿",
    "프레젠테이션 도우미",
    "AI PPT",
    "AI 대본",
    "GPT Presentation",
  ],
  url: {
    base: baseUrl,
    author: "https://github.com/junyoung4949",
  },
  ogImage: `${baseUrl}/og.png`,
}
