import { HeroHeader, ContentSection } from "@/types/landing"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `손쉬운 프레젠테이션 제작 도구`,
  subheader: `간단한 키워드 입력으로 빠르게 프레젠테이션을 만들어 보세요.`,
  image: `/hero-img.png`,
}

export const featureCards: ContentSection = {
  header: `더이상 PPT,대본작성에 많은 시간을 쏟지 마세요`,
  subheader: `Presentation에 대한 고민, PrezWiz가 도와드릴게요`,
  content: [
    {
      text: `시간 절약`,
      subtext: `짧은 시간에 PPT와 대본을 완성해줍니다.`,
      icon: "featcard1",
    },
    {
      text: `자료 조사`,
      subtext: `gpt-4를 이용해 보다 최신의 정보까지 반영합니다.`,
      icon: "featcard2",
    },
    {
      text: `쉬운 사용`,
      subtext: `몇가지 키워드 입력만으로 PPT와 대본을 완성할수 있습니다.`,
      icon: "featcard3",
    },
  ],
}

export const features: ContentSection = {
  header: `이용 방법`,
  subheader: `PrezWiz를 다음과 같이 이용합니다.`,
  image: `/features-img.jpg`,
  content: [
    {
      text: `로그인`,
      subtext: `로그인을 진행해 해주세요.`,
      icon: "login",
    },
    {
      text: `발표 자료 생성`,
      subtext: `create로 이동후에, 주제를 입력하고, 카드를 수정해주세요.`,
      icon: "create",
    },
    {
      text: `발표 자료 다운로드`,
      subtext: `store로 이동후에, 생성한 자료를 받으실수 있습니다.`,
      icon: "downLoad",
    },
  ],
}
