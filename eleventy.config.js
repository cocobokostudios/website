import eleventyWebcPlugin from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: ["src/_includes/components/**/*.webc"],
  });

  eleventyConfig.addPassthroughCopy({ public: "/" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "webc",
    markdownTemplateEngine: "njk",
    templateFormats: ["webc"],
  };
}
