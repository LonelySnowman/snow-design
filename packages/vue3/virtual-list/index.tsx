import { defineComponent, ref, reactive, computed, onBeforeUnmount, CSSProperties, watchEffect } from 'vue';
import { requestTimeout, cancelTimeout } from '@snow-design/foundation/_utils/timer';
import { numbers, ScrollState } from '@snow-design/foundation/virtual-list/constants';
import useVirtualListFoundation from '@snow-design/foundation/virtual-list/foundation';

const { IS_SCROLLING_DEBOUNCE_INTERVAL, DEFAULT_ESTIMATED_ITEM_SIZE } = numbers;

const instanceProps = {
    itemMetadataMap: {},
    estimatedItemSize: DEFAULT_ESTIMATED_ITEM_SIZE,
    lastMeasuredIndex: -1,
};

let timer = null;

export const virtualListProps = () => ({
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    itemSize: { type: [Number, Function], required: true },
    itemCount: { type: Number, required: true },
    overscanCount: { type: Number, default: 2 },
    // ...CssProps, TODO: add CSSProps
});

export default defineComponent({
    name: 'SVirtualList',
    props: virtualListProps(),
    setup(props, { expose, slots }) {
        const isScrolling = ref(false);
        const scrollState = reactive<ScrollState>({
            scrollOffset: 0,
            scrollDirection: 'forward',
        });

        const containerRef = ref<HTMLDivElement | null>(null);

        const foundation = useVirtualListFoundation({
            getProps: () => {
                return {
                    ...props,
                    overscanCount: props.overscanCount || 2,
                };
            },
            getInstanceProps: () => instanceProps,
            getStates: () => ({
                isScrolling: isScrolling.value,
                scrollState,
            }),
            setIsScrolling: (val) => {
                isScrolling.value = val;
            },
            setScrollState: (val: ScrollState | ((state: ScrollState) => ScrollState)) => {
                if (typeof val === 'function') {
                    const newState = val(scrollState);
                    scrollState.scrollOffset = newState.scrollOffset;
                    scrollState.scrollDirection = newState.scrollDirection;
                } else {
                    scrollState.scrollOffset = val.scrollOffset;
                    scrollState.scrollDirection = val.scrollDirection;
                }
            },
        });

        watchEffect(() => {
            if (!isScrolling.value) {
                return;
            }
            if (timer !== null) {
                cancelTimeout(timer);
            }
            timer = requestTimeout(() => {
                isScrolling.value = false;
            }, IS_SCROLLING_DEBOUNCE_INTERVAL);
        });

        expose({
            scrollTo: (offset: number) => {
                if (containerRef.value) {
                    containerRef.value.scrollTop = offset;
                }
            },
        });

        const containerStyle = computed<CSSProperties>(() => ({
            position: 'relative',
            width: `${props.width}px`,
            height: `${props.height}px`,
            overflow: 'auto',
        }));

        const contentStyle = computed<CSSProperties>(() => ({
            height: `${foundation.getEstimatedTotalSize(props, instanceProps)}px`,
            width: '100%',
        }));

        const getCurrentChildren = () => {
            const [startIndex, endIndex] = foundation.getRangeToRender();
            const items = [];
            for (let i = startIndex; i <= endIndex; i++) {
                const innerItemSize = foundation.getItemSize(props, i, instanceProps);
                const itemStyle: CSSProperties = {
                    position: 'absolute',
                    height: `${innerItemSize}px`,
                    width: '100%',
                    top: `${foundation.getItemOffset(props, i, instanceProps)}px`,
                };

                items.push(
                    slots.default({
                        key: i,
                        index: i,
                        style: itemStyle,
                        isScrolling: isScrolling.value,
                    }),
                );
            }
            return items;
        };

        onBeforeUnmount(() => {
            if (timer !== null) {
                cancelTimeout(timer);
            }
        });

        return () => (
            <div
                style={containerStyle.value}
                onScroll={(event) => {
                    const { scrollTop } = event.currentTarget as HTMLDivElement;
                    foundation.handleScroll(scrollTop);
                }}
                ref={containerRef}
            >
                <div style={contentStyle.value}>{getCurrentChildren()}</div>
            </div>
        );
    },
});
