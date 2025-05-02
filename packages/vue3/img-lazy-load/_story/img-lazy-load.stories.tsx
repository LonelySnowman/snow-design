import ImgLazyLoad from '../index';
import { defineComponent } from 'vue';

const meta = {
    title: 'Example/ImgLazyLoad',
    component: ImgLazyLoad,
};

export default meta;

const ImagePlaceholder = defineComponent({
    name: 'ImagePlaceholder',
    template: `
        <div
            :style="{
                width: '200px',
                height: '300px',
                background: '#eee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
            }"
        >
            Loading...
        </div>
    `,
});

export const ImgLazyLoadBase = () =>
    defineComponent({
        components: { ImgLazyLoad, ImagePlaceholder },
        compatConfig: { MODE: 3 },
        template: `
    <div style="height: 150vh; padding: 20px;">
        <p>向下滚动查看懒加载图片</p>
        <div style="margin-top: 1000px;">
            <ImgLazyLoad src="https://fastly.picsum.photos/id/83/200/300.jpg?hmac=avqtE9ZSAkPbFtYCXzxg4TeAA-fMWqX6jUQeWI_HjLc">
                <template #placeholder>
                    <ImagePlaceholder />
                </template>
            </ImgLazyLoad>
            <ImgLazyLoad src="https://fastly.picsum.photos/id/320/200/301.jpg?hmac=bqN7yJjlYBYWppeCGdfOrSdD1n8qlt-PaWbcnhRkyG8">
                <template #placeholder>
                    <ImagePlaceholder />
                </template>
            </ImgLazyLoad>
        </div>
    </div>
    `,
    });
