import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';
import path from 'path';

export default defineConfig({
    root: 'rspress',
    title: 'SnowDesign',
    description: 'Rspack-based Static Site Generator',
    outDir: 'dist',
    globalStyles: path.join(__dirname, 'styles/index.css'),
    plugins: [
        pluginPreview({
            defaultRenderMode: 'pure',
        }),
    ],
    builderPlugins: [],
    builderConfig: {
        source: {
            alias: {
                '#vue3': './components/vue3',
                '#react': './components/react',
            },
        },
    },
    icon: '/snowflake.png',
    logo: '/snowflake.png',
    logoText: 'SnowDesign',
    themeConfig: {
        socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/LonelySnowman/snow-design' }],
        nav: [
            {
                text: '开始',
                link: '/guide/start',
            },
            {
                text: '组件',
                link: '/components',
            },
        ],
        sidebar: {
            '/guide/': [
                {
                    text: '开始',
                    items: [
                        {
                            text: '快速开始',
                            link: '/guide/start',
                        },
                        {
                            text: '暗夜模式',
                            link: '/guide/darkMode',
                        },
                        {
                            text: '自定义主题',
                            link: '/guide/theme',
                        },
                        {
                            text: '国际化',
                            link: '/guide/i18n',
                        },
                        {
                            text: 'F/A架构',
                            link: '/guide/foundation-adapter',
                        },
                    ],
                },
                {
                    text: '其它',
                    items: [
                        {
                            text: '贡献指南',
                            link: '/guide/contribution',
                        },
                    ],
                },
            ],
            '/components': [
                {
                    text: '开始',
                    items: [
                        {
                            text: '介绍',
                            link: '/components',
                        },
                    ],
                },
                {
                    text: '组件',
                    items: [
                        {
                            text: '按钮',
                            link: '/components/button',
                        },
                        {
                            text: '分页器',
                            link: '/components/pagination',
                        },
                    ],
                },
            ],
        },
    },
});
