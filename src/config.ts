import type {
  Site,
  SocialObjects,
  WeddingConfig,
} from "./types";
import yaml from 'js-yaml';
import fs from "node:fs";

export const SITE: Site = {
  website: "https://ainara-luke.info/", // GitHub Pages custom domain
  author: "Luke & Ainara",
  profile: "https://github.com/LukeLalor",
  title: "Ainara & Luke",
  desc: "Friday, June 27th, 2025 | Seattle, WA | Bring a raincoat",
  ogImage: "luke-ainara-skiing.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showRSVP: true,
  editPost: {},
};

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [];

const fileContents = fs.readFileSync('wedding-config.yaml', 'utf8');
export const WEDDINGCONFIG: WeddingConfig = yaml.load(fileContents) as WeddingConfig;
