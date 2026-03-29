import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Mukul Surajiwale",
  EMAIL: "mukul.surajiwale@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_WORKS_ON_HOMEPAGE: 4,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Mukul Surajiwale — Staff Machine Learning Scientist based in NYC.",
};

export const BLOG: Metadata = {
  TITLE: "Writing",
  DESCRIPTION: "A collection of articles and publications.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "twitter-x",
    HREF: "https://twitter.com/MukulSurajiwale",
  },
  {
    NAME: "github",
    HREF: "https://github.com/therealmukul"
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/mukulsurajiwale",
  }
];
