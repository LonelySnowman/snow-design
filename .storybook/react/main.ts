import type { StorybookConfig } from '@storybook/react-vite';
import * as path from 'path';

const config: StorybookConfig = {
    stories: ['../../packages/components/**/_story/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        '@storybook/preset-scss',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: async (config) => {
        config.resolve.alias = {
            '@snow-design/components': path.resolve(__dirname, '../../packages/components'),
            '@snow-design/locale': path.resolve(__dirname, '../../packages/locale'),
            '@snow-design/foundation': path.resolve(__dirname, '../../packages/foundation'),
            '@snow-design/theme-default': path.resolve(__dirname, '../../packages/theme-default'),
        };
        config.define = {
            'process.env': {},
        };
        config.css = {
            preprocessorOptions: {
                scss: {
                    additionalData: `
          @import "@snow-design/theme-default/scss/index.scss";\n
          @import "@snow-design/theme-default/scss/global.scss";\n`,
                },
            },
        };
        return config;
    },
};
export default config;
