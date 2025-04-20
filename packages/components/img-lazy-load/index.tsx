import React, { useState, useEffect, useRef } from 'react';

interface ImgLazyLoadProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /** 图片资源地址 */
    src: string;
    /** 触发图片加载的可见性阈值，0-1之间 */
    threshold?: number;
    /** 图片加载前显示的占位元素 */
    placeholder?: React.ReactNode;
    /** 图片加加载失败时显示的占位元素 */
    errorPlaceholder?: React.ReactNode;
    /** 自定义类名 */
    className?: string;
    /** 自定义内联样式 */
    style?: React.CSSProperties;
    /** 自定义交叉边界 */
    rootMargin?: string;
}

// TODO: use hook to render IntersectionObserver
// TODO: add segment rendering
const ImgLazyLoad: React.FC<ImgLazyLoadProps> = (props: ImgLazyLoadProps) => {
    const {
        src,
        threshold = 0,
        placeholder,
        className = '',
        style,
        errorPlaceholder,
        rootMargin = '0px 0px 0px 0px',
    } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!imgRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin,
            },
        );
        observer.observe(imgRef.current);
        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [threshold]);

    useEffect(() => {
        if (!isVisible) return;
        const loadImage = async () => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setIsLoaded(true);
                imgRef.current.appendChild(img);
            };
            img.onerror = () => {
                setHasError(true);
            };
        };
        loadImage();
    }, [isVisible, src]);

    const showImage = isVisible && isLoaded && !hasError;

    return (
        <div ref={imgRef} className={className} style={style}>
            {showImage ? null : placeholder}
            {hasError ? errorPlaceholder : null}
        </div>
    );
};

export default ImgLazyLoad;
