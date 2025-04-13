import { ScrollState, InstanceProps, ItemMetadata } from './constants';

export interface VirtualListAdapter {
    setScrollState: (scrollState: (prevState: ScrollState) => ScrollState) => void;
    setIsScrolling: (isScrolling: boolean) => void;
    getStates: () => {
        isScrolling: boolean;
        scrollState: ScrollState;
    };
    getProps: () => any;
    getInstanceProps: () => InstanceProps;
}

/* Fixed Size Virtual List */

const getFixStartIndexForOffset = (props: any, scrollOffset: number) => {
    const { itemSize } = props;
    const startIndex = Math.floor(scrollOffset / itemSize);
    return startIndex;
};

const getFixStopIndexForStartIndex = (props: any, startIndex: number) => {
    const { itemSize, itemCount, height } = props;
    const numVisible = Math.ceil(height / itemSize);
    const endIndex = Math.min(itemCount, startIndex + numVisible);
    return endIndex;
};

const getFixItemSize = (props: any) => {
    const { itemSize } = props;
    return itemSize;
};

const getFixItemOffset = (props: any, index: number) => {
    const { itemSize } = props;
    return index * itemSize;
};

const getFixEstimatedTotalSize = (props: any) => {
    const { itemCount, itemSize } = props;
    return itemCount * itemSize;
};

/* Variable Size Virtual List */

const findNearestItemBinarySearch = (
    props: any,
    instanceProps: InstanceProps,
    high: number,
    low: number,
    offset: number,
): number => {
    while (low <= high) {
        const middle = low + Math.floor((high - low) / 2);
        const currentOffset = getItemMetadata(props, middle, instanceProps).offset;
        if (currentOffset === offset) {
            return middle;
        } else if (currentOffset < offset) {
            low = middle + 1;
        } else if (currentOffset > offset) {
            high = middle - 1;
        }
    }

    if (low > 0) {
        return low - 1;
    } else {
        return 0;
    }
};

const findNearestItemExponentialSearch = (
    props: any,
    instanceProps: InstanceProps,
    index: number,
    offset: number,
): number => {
    const { itemCount } = props;
    let interval = 1;

    while (index < itemCount && getItemMetadata(props, index, instanceProps).offset < offset) {
        index += interval;
        interval *= 2;
    }

    return findNearestItemBinarySearch(
        props,
        instanceProps,
        Math.min(index, itemCount - 1),
        Math.floor(index / 2),
        offset,
    );
};

const findNearestItem = (props: any, instanceProps: InstanceProps, offset: number) => {
    const { itemMetadataMap, lastMeasuredIndex } = instanceProps;
    const lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;
    if (lastMeasuredItemOffset >= offset) {
        // If we've already measured items within this range just use a binary search as it's faster.
        return findNearestItemBinarySearch(props, instanceProps, lastMeasuredIndex, 0, offset);
    } else {
        // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
        // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
        // The overall complexity for this approach is O(log n).
        return findNearestItemExponentialSearch(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
    }
};

const getItemMetadata = (props: any, index: number, instanceProps: InstanceProps): ItemMetadata => {
    const { itemSize } = props;
    const { itemMetadataMap, lastMeasuredIndex } = instanceProps;

    if (index > lastMeasuredIndex) {
        let offset = 0;
        if (lastMeasuredIndex >= 0) {
            const itemMetadata = itemMetadataMap[lastMeasuredIndex];
            offset = itemMetadata.offset + itemMetadata.size;
        }

        for (let i = lastMeasuredIndex + 1; i <= index; i++) {
            const size = itemSize(i);
            itemMetadataMap[i] = {
                offset,
                size,
            };
            offset += size;
        }

        instanceProps.lastMeasuredIndex = index;
    }

    return itemMetadataMap[index];
};

const getVarStartIndexForOffset = (props: any, offset: number, instanceProps: InstanceProps): number => {
    return findNearestItem(props, instanceProps, offset);
};

const getVarStopIndexForStartIndex = (
    props: any,
    startIndex: number,
    scrollOffset: number,
    instanceProps: InstanceProps,
): number => {
    const { height, itemCount } = props;

    const size = height;
    const itemMetadata = getItemMetadata(props, startIndex, instanceProps);
    const maxOffset = scrollOffset + size;

    let offset = itemMetadata.offset + itemMetadata.size;
    let stopIndex = startIndex;

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
        stopIndex++;
        offset += getItemMetadata(props, stopIndex, instanceProps).size;
    }

    return stopIndex;
};

const getVarItemSize = (props: any, index: number, instanceProps: InstanceProps): number => {
    return getItemMetadata(props, index, instanceProps).size;
};

const getVarItemOffset = (props: any, index: number, instanceProps: InstanceProps): number => {
    return getItemMetadata(props, index, instanceProps).offset;
};

const getVarEstimatedTotalSize = (props: any, instanceProps: InstanceProps): number => {
    const { itemCount } = props;
    const { itemMetadataMap, estimatedItemSize, lastMeasuredIndex } = instanceProps;

    let totalSizeOfMeasuredItems = 0;

    // Edge case check for when the number of items decreases while a scroll is in progress.
    // https://github.com/bvaughn/react-window/pull/138
    if (lastMeasuredIndex >= itemCount) {
        instanceProps.lastMeasuredIndex = itemCount - 1;
    }

    if (lastMeasuredIndex >= 0) {
        const itemMetadata = itemMetadataMap[lastMeasuredIndex];
        totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
    }

    const numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
    const totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;

    return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};

/* Virtual List Foundation */

const useVirtualListFoundation = (adapter: VirtualListAdapter) => {
    const props = adapter.getProps();
    const { itemCount, overscanCount, itemSize } = props;
    const { isScrolling, scrollState } = adapter.getStates();

    const isFixedList = typeof itemSize === 'number';

    const getStartIndexForOffset = isFixedList ? getFixStartIndexForOffset : getVarStartIndexForOffset;
    const getStopIndexForStartIndex = isFixedList ? getFixStopIndexForStartIndex : getVarStopIndexForStartIndex;
    const getItemSize = isFixedList ? getFixItemSize : getVarItemSize;
    const getItemOffset = isFixedList ? getFixItemOffset : getVarItemOffset;
    const getEstimatedTotalSize = isFixedList ? getFixEstimatedTotalSize : getVarEstimatedTotalSize;

    return {
        getRangeToRender: () => {
            const { scrollOffset, scrollDirection } = scrollState;
            if (itemCount === 0) {
                return [0, 0, 0, 0];
            }
            const startIndex = getStartIndexForOffset(props, scrollOffset, adapter.getInstanceProps());
            const stopIndex = getStopIndexForStartIndex(props, startIndex, scrollOffset, adapter.getInstanceProps());
            const overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
            const overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
            return [
                Math.max(0, startIndex - overscanBackward),
                Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
                startIndex,
                stopIndex,
            ];
        },
        handleScroll: (scrollTop: number) => {
            adapter.setScrollState((prevState) => {
                return {
                    scrollOffset: scrollTop,
                    scrollDirection: scrollTop > prevState.scrollOffset ? 'forward' : 'backward',
                };
            });
            adapter.setIsScrolling(true);
        },
        getItemSize,
        getItemOffset,
        getEstimatedTotalSize,
    };
};

export default useVirtualListFoundation;
