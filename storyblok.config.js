export default {
  region: process.env.STORYBLOK_REGION || "eu",
  space: process.env.STORYBLOK_SPACE_ID,
  modules: {
    components: {
      pull: {
        separateFiles: false,
      },
    },
  },
};
