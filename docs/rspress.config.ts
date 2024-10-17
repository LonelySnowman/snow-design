import { defineConfig } from 'rspress/config';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginPreview } from '@rspress/plugin-preview';
// import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
    root: 'rspress',
    title: 'Rspress',
    description: 'Rspack-based Static Site Generator',
    outDir: 'dist',
    plugins: [pluginPreview()],
    builderPlugins: [
        // @todo fix vue load error
        // pluginVue({
        //     vueLoaderOptions: {
        //         hotReload: false,
        //     },
        // }),
        pluginVueJsx(),
    ],
    builderConfig: {
        source: {
            alias: {
                '#vue3': './components/vue3',
                '#react': './components/react',
            },
        },
    },
    // @todo: need icon
    // icon: '/rspress-icon.png',
    // logo: {
    //     light: '/rspress-light-logo.png',
    //     dark: '/rspress-dark-logo.png',
    // },
    themeConfig: {
        socialLinks: [{ icon: 'github', mode: 'link', content: 'https://github.com/web-infra-dev/rspress' }],
        nav: [
            {
                text: '组件',
                link: '/components',
            },
            {
                text: '快速开始',
                link: '/guide/start',
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
