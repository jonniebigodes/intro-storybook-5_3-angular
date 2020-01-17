module.exports = {
  // stories: ['../src/**/*.stories.ts'],
  stories: ["../src/app/components/**/*.stories.ts"],
  /* addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-notes'], */
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-knobs",
    require.resolve('./addons/design-assets.js')
  ]
};
