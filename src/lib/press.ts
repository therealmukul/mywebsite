export type PressItem = {
  publication: string;
  title: string;
  href: string;
  date: string; // ISO date, e.g. "2026-07-06"
};

export const press: PressItem[] = [
  {
    publication: "The Data Wire",
    title:
      "Inference Economics Will Decide Whether Next-Generation Recommendation Systems Reach Production",
    href: "https://www.thedatawire.com/news/generative-recommendation-systems-inference-economics-mukul-surajiwale-etsy",
    date: "2026-07-06",
  },
];
