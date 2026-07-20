import Image from "@11ty/eleventy-img";
import { readFile, rm } from "node:fs/promises";
import { parse, resolve } from "node:path";

const generatedImagesDir = "public/images/generated";
const sourceImagesDir = "src/assets/images";

await rm(generatedImagesDir, { recursive: true, force: true });

const games = JSON.parse(await readFile("src/_data/games.json", "utf8"));

for (const game of games) {
  const sourcePath = resolve(sourceImagesDir, game.image.source);
  const outputName = parse(game.image.source).name;

  await Image(sourcePath, {
    widths: game.image.widths,
    formats: ["webp"],
    outputDir: generatedImagesDir,
    urlPath: "/images/generated/",
    sharpWebpOptions: {
      quality: 82,
    },
    filenameFormat: (_id, _src, width, format) => `${outputName}-${width}.${format}`,
  });
}

await Image(resolve(sourceImagesDir, "dw_controller-coffee-desk.jpg"), {
  widths: [480, 960, 1440],
  formats: ["webp"],
  outputDir: generatedImagesDir,
  urlPath: "/images/generated/",
  sharpWebpOptions: {
    quality: 82,
  },
  filenameFormat: (_id, _src, width, format) => `studio-desk-${width}.${format}`,
});
