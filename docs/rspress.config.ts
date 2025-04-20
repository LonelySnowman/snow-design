import { defineConfig } from 'rspress/config';
import { pluginPreview } from '@rspress/plugin-preview';
import { pluginShiki } from '@rspress/plugin-shiki';
import { pluginVue } from '@rsbuild/plugin-vue';
import path from 'path';

export default defineConfig({
    root: 'rspress',
    title: 'SnowDesign',
    description: 'Rspack-based Static Site Generator',
    outDir: 'dist',
    globalStyles: path.join(__dirname, 'styles/index.css'),
    plugins: [
        pluginPreview({
            previewMode: 'iframe',
            previewLanguages: ['jsx', 'tsx', 'vue'],
            iframeOptions: {
                customEntry: ({ entryCssPath, demoPath }) => {
                    if (demoPath.endsWith('.vue')) {
                        return `
          import { createApp } from 'vue';
          import App from ${JSON.stringify(demoPath)};
          import ${JSON.stringify(entryCssPath)};
          createApp(App).mount('#root');
          `;
                    }
                    return `
          import { render } from 'react-dom';
          import ${JSON.stringify(entryCssPath)};
          import Demo from ${JSON.stringify(demoPath)};
          render(<Demo />, document.getElementById('root'));
          `;
                },
                builderConfig: {
                    plugins: [pluginVue()],
                },
            },
        }),
        pluginShiki({
            langs: ['vue'],
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
                items: [
                    {
                        text: 'React',
                        link: '/components/react/button',
                    },
                    {
                        text: 'Vue3',
                        link: '/components/vue3/button',
                    },
                ],
            },
        ],
        sidebar: {
            '/guide': [
                {
                    text: '开始',
                    items: [
                        {
                            text: '介绍',
                            link: '/guide/detail',
                        },
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
            '/components/react': [
                {
                    text: '通用组件',
                    items: [
                        {
                            text: '按钮',
                            link: '/components/react/button',
                        },
                        {
                            text: '分页器',
                            link: '/components/react/pagination',
                        },
                    ],
                },
                {
                    text: '功能组件',
                    items: [
                        {
                            text: '虚拟列表',
                            link: '/components/react/virtual-list',
                        },
                    ],
                },
            ],
            '/components/vue3': [
                {
                    text: '通用组件',
                    items: [
                        {
                            text: '按钮',
                            link: '/components/vue3/button',
                        },
                        {
                            text: '分页器',
                            link: '/components/vue3/pagination',
                        },
                    ],
                },
                {
                    text: '功能组件',
                    items: [
                        {
                            text: '虚拟列表',
                            link: '/components/vue3/virtual-list',
                        },
                    ],
                },
            ],
        },
    },
});
