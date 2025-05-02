import { defineComponent, ref, onMounted, onUnmounted, computed, watch } from 'vue';
import useImgLazyLoadFoundation from '@snow-design/foundation/img-lazy-load/foundation';
import { CssProps } from '../_utils/type';
import { withInstall } from '../_utils';

export const imgLazyLoadProps = () => ({
    /** 图片资源地址 */
    src: String,
    /** 触发图片加载的可见性阈值，0-1之间 */
    threshold: Number,
    /** 自定义交叉边界 */
    rootMargin: String,
    ...CssProps,
});

const ImgLazyLoad = defineComponent({
    name: 'SImgLazyLoad',
    compatConfig: { MODE: 3 },
    inheritAttrs: false,
    props: imgLazyLoadProps(),
    setup(props, { slots }) {
        const { class: className, style } = props;

        const isVisible = ref(false);
        const hasError = ref(false);
        const isLoaded = ref(false);
        const imgRef = ref<HTMLElement | null>(null);
        const unobserve = ref<(() => void) | null>(null);

        const foundation = useImgLazyLoadFoundation({
            setIsVisible(value: boolean) {
                isVisible.value = value;
            },
            setIsLoaded(value: boolean) {
                isLoaded.value = value;
            },
            setHasError(value: boolean) {
                hasError.value = value;
            },
            getProps() {
                return props;
            },
            getElement() {
                return imgRef.value;
            },
            getState() {
                return {
                    isVisible: isVisible.value,
                    hasError: hasError.value,
                    isLoaded: isLoaded.value,
                };
            },
        });

        onMounted(() => {
            unobserve.value = foundation.init();
        });
        onUnmounted(() => {
            unobserve.value?.();
        });

        watch([() => isVisible.value, () => props.src], () => {
            foundation.loadImage();
        });

        const showImage = computed(() => isVisible.value && isLoaded.value && !hasError.value);

        return () => (
            <div ref={imgRef} class={className} style={style}>
                {!showImage.value && slots.placeholder?.()}
                {hasError.value && slots.error?.()}
            </div>
        );
    },
});

export default withInstall(ImgLazyLoad);
