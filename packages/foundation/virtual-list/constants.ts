import { BASE_CLASS_PREFIX } from '../_base/constants';

export interface ItemProps<Style = any> {
    index: number;
    style: Style;
    isScrolling: boolean;
}

export interface VirtualListProps<Comp = any> {
    height: number;
    width: number;
    itemSize: number | ((item: ItemProps) => number);
    itemCount: number;
    overscanCount?: number;
    children: Comp;
}

export interface ScrollState {
    scrollOffset: number;
    scrollDirection: ScrollDirection;
}

export type ScrollDirection = 'forward' | 'backward';

export interface ItemMetadata {
    offset: number;
    size: number;
}

export type InstanceProps = {
    itemMetadataMap: { [index: number]: ItemMetadata };
    estimatedItemSize: number;
    lastMeasuredIndex: number;
};

const cssClasses = {
    PREFIX: `${BASE_CLASS_PREFIX}-virtual-list`,
};

const numbers = {
    DEFAULT_ESTIMATED_ITEM_SIZE: 50,
    IS_SCROLLING_DEBOUNCE_INTERVAL: 150,
};

export { cssClasses, numbers };
