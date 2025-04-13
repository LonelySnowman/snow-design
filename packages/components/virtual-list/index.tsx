import React, { useState, CSSProperties, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { requestTimeout, cancelTimeout } from '@snow-design/foundation/_utils/timer';
import { numbers, ScrollState } from '@snow-design/foundation/virtual-list/constants';
import useVirtualListFoundation from '@snow-design/foundation/virtual-list/foundation';

let timer = null;

const { IS_SCROLLING_DEBOUNCE_INTERVAL, DEFAULT_ESTIMATED_ITEM_SIZE } = numbers;

interface ItemProps {
    index: number;
    style: React.CSSProperties;
    isScrolling: boolean;
}

interface VirtualListProps {
    height: number;
    width: number;
    itemSize: number | ((item: number) => number);
    itemCount: number;
    overscanCount?: number;
    children: React.FC<ItemProps>;
}

const instanceProps = {
    itemMetadataMap: {},
    estimatedItemSize: DEFAULT_ESTIMATED_ITEM_SIZE,
    lastMeasuredIndex: -1,
};

// TODO: Add Horizontal Layout
const VirtualList = (props: VirtualListProps, ref: any) => {
    const { height, width, overscanCount = 2, children: Child } = props;

    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollState, setScrollState] = useState<ScrollState>({
        scrollOffset: 0,
        scrollDirection: 'forward',
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const foundation = useVirtualListFoundation({
        getProps: () => {
            return {
                ...props,
                overscanCount: overscanCount ? overscanCount : 2,
            };
        },
        getInstanceProps: () => {
            return instanceProps;
        },
        getStates: () => {
            return {
                isScrolling,
                scrollState,
            };
        },
        setIsScrolling,
        setScrollState,
    });

    useImperativeHandle(ref, () => ({
        scrollTo: (offset: number) => {
            if (containerRef.current) {
                containerRef.current.scrollTop = offset;
            }
        },
    }));

    const containerStyle: CSSProperties = {
        position: 'relative',
        width,
        height,
        overflow: 'auto',
    };

    const contentStyle: CSSProperties = {
        height: foundation.getEstimatedTotalSize(props, instanceProps),
        width: '100%',
    };

    useEffect(() => {
        if (!isScrolling) {
            return;
        }
        if (timer !== null) {
            cancelTimeout(timer);
        }
        timer = requestTimeout(() => {
            setIsScrolling(false);
        }, IS_SCROLLING_DEBOUNCE_INTERVAL);
        return () => {
            cancelTimeout(timer);
        };
    }, [scrollState]);

    const getCurrentChildren = () => {
        const [startIndex, endIndex] = foundation.getRangeToRender();
        const items = [];
        for (let i = startIndex; i <= endIndex; i++) {
            const innerItemSize = foundation.getItemSize(props, i, instanceProps);
            const itemStyle: CSSProperties = {
                position: 'absolute',
                height: innerItemSize,
                width: '100%',
                top: foundation.getItemOffset(props, i, instanceProps),
            };
            items.push(<Child key={i} index={i} style={itemStyle} isScrolling={isScrolling} />);
        }
        return items;
    };

    return (
        <div
            style={containerStyle}
            ref={containerRef}
            onScroll={(event) => {
                const { scrollTop } = event.currentTarget;
                foundation.handleScroll(scrollTop);
            }}
        >
            <div style={contentStyle}>{getCurrentChildren()}</div>
        </div>
    );
};

export default forwardRef(VirtualList);
