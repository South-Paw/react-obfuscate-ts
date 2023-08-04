import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: '🕵️ react-obfuscate-ts',
    brandUrl: 'https://github.com/South-Paw/react-obfuscate-ts',
  }),
});
