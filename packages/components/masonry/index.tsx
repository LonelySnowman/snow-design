import React, { useRef, useState, useCallback, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import './style.css';

export const parseToNumber = (val: string) => {
    return Number(val.replace('px', ''));
};

const lineBreakStyle = {
    flexBasis: '100%',
    width: 0,
    margin: 0,
    padding: 0,
};

export interface MasonryProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    columns?: number;
    spacing?: number | string;
    sequential?: boolean;
    defaultColumns?: number;
    defaultHeight?: number;
    defaultSpacing?: number;
}

const Masonry = React.forwardRef<HTMLDivElement, MasonryProps>((props) => {
    const {
        children,
        className,
        columns = 4,
        spacing = 1,
        sequential = false,
        defaultColumns,
        defaultHeight,
        defaultSpacing,
        style,
        ...other
    } = props;

    const masonryRef = useRef<HTMLDivElement>(null);
    const [maxColumnHeight, setMaxColumnHeight] = useState<number>();
    const isSSR = !maxColumnHeight && defaultHeight && defaultColumns !== undefined && defaultSpacing !== undefined;
    const [numberOfLineBreaks, setNumberOfLineBreaks] = useState(isSSR ? defaultColumns! - 1 : 0);

    const handleResize = useCallback(
        (masonryChildren: React.ReactNode) => {
            if (!masonryRef.current || !React.Children.count(masonryChildren)) {
                return;
            }

            const masonry = masonryRef.current;
            const masonryFirstChild = masonry.firstChild as HTMLElement;
            const parentWidth = masonry.clientWidth;
            const firstChildWidth = masonryFirstChild.clientWidth;

            if (parentWidth === 0 || firstChildWidth === 0) {
                return;
            }

            const firstChildComputedStyle = window.getComputedStyle(masonryFirstChild);
            const firstChildMarginLeft = parseToNumber(firstChildComputedStyle.marginLeft);
            const firstChildMarginRight = parseToNumber(firstChildComputedStyle.marginRight);

            const currentNumberOfColumns = Math.round(
                parentWidth / (firstChildWidth + firstChildMarginLeft + firstChildMarginRight),
            );

            const columnHeights = new Array(currentNumberOfColumns).fill(0);
            let skip = false;
            let nextOrder = 1;

            masonry.childNodes.forEach((child) => {
                if (
                    child.nodeType !== Node.ELEMENT_NODE ||
                    (child as HTMLElement).dataset.class === 'line-break' ||
                    skip
                ) {
                    return;
                }

                const childElement = child as HTMLElement;
                const childComputedStyle = window.getComputedStyle(childElement);
                const childMarginTop = parseToNumber(childComputedStyle.marginTop);
                const childMarginBottom = parseToNumber(childComputedStyle.marginBottom);
                const childHeight = parseToNumber(childComputedStyle.height)
                    ? Math.ceil(parseToNumber(childComputedStyle.height)) + childMarginTop + childMarginBottom
                    : 0;

                if (childHeight === 0) {
                    skip = true;
                    return;
                }

                for (let i = 0; i < childElement.childNodes.length; i += 1) {
                    const nestedChild = childElement.childNodes[i] as HTMLElement;
                    if (nestedChild.tagName === 'IMG' && nestedChild.clientHeight === 0) {
                        skip = true;
                        break;
                    }
                }

                if (!skip) {
                    if (sequential) {
                        columnHeights[nextOrder - 1] += childHeight;
                        childElement.style.order = String(nextOrder);
                        nextOrder += 1;
                        if (nextOrder > currentNumberOfColumns) {
                            nextOrder = 1;
                        }
                    } else {
                        const currentMinColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
                        columnHeights[currentMinColumnIndex] += childHeight;
                        childElement.style.order = String(currentMinColumnIndex + 1);
                    }
                }
            });

            if (!skip) {
                ReactDOM.flushSync(() => {
                    setMaxColumnHeight(Math.max(...columnHeights));
                    setNumberOfLineBreaks(currentNumberOfColumns > 0 ? currentNumberOfColumns - 1 : 0);
                });
            }
        },
        [sequential],
    );

    useEffect(() => {
        if (typeof ResizeObserver === 'undefined') {
            return undefined;
        }

        let animationFrame: number;
        const resizeObserver = new ResizeObserver(() => {
            animationFrame = requestAnimationFrame(() => handleResize(children));
        });

        if (masonryRef.current) {
            masonryRef.current.childNodes.forEach((childNode) => {
                resizeObserver.observe(childNode as Element);
            });
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        };
    }, [columns, spacing, children, handleResize]);

    const lineBreaks = new Array(numberOfLineBreaks)
        .fill('')
        .map((_, index) => (
            <span key={index} data-class="line-break" style={{ ...lineBreakStyle, order: index + 1 }} />
        ));

    const masonryStyle: React.CSSProperties = {
        ...style,
        width: '100%',
        display: 'flex',
        flexFlow: 'column wrap',
        alignContent: 'flex-start',
        boxSizing: 'border-box',
        height: maxColumnHeight ? `${maxColumnHeight}px` : undefined,
    };

    const childStyle: React.CSSProperties = {
        boxSizing: 'border-box',
        width: `${100 / columns}%`,
        margin: typeof spacing === 'number' ? `${spacing}px` : spacing,
    };

    return (
        <div ref={masonryRef} className={classNames('snow-masonry', className)} style={masonryStyle} {...other}>
            {React.Children.map(children, (child) => (
                <div style={childStyle}>{child}</div>
            ))}
            {lineBreaks}
        </div>
    );
});

Masonry.displayName = 'Masonry';

export default Masonry;
