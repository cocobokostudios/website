import Image from "@11ty/eleventy-img";
import { rm } from "node:fs/promises";

const generatedImagesDir = "public/images/generated";

await rm(generatedImagesDir, { recursive: true, force: true });

await Image("public/images/agent_website_banner.webp", {
  widths: [960],
  formats: ["webp"],
  outputDir: generatedImagesDir,
  urlPath: "/images/generated/",
  sharpWebpOptions: {
    quality: 82,
  },
  filenameFormat: (_id, _src, width, format) => `agent_website_banner-${width}.${format}`,
});
