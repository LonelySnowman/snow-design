declare module 'vue' {
    export interface GlobalComponents {
        SButton: (typeof import('@snow-design/vue3'))['Button'];

        SConfigProvider: (typeof import('@snow-design/vue3'))['ConfigProvider'];

        SPagination: (typeof import('@snow-design/vue3'))['Pagination'];

        SVirtualList: (typeof import('@snow-design/vue3'))['VirtualList'];

        SImgLazyLoad: (typeof import('@snow-design/vue3'))['ImgLazyLoad'];
    }
}
export {};
