import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    brandTitle: 'react-obfuscate-ts',
    brandUrl: 'https://github.com/South-Paw/react-obfuscate-ts',
  }),
  previewTabs: {
    // 'storybook/docs/panel': { index: -1 },
    canvas: { hidden: true },
  },
});
