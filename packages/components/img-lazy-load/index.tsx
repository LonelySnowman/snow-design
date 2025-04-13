import React, { useState, useEffect, useRef } from 'react';

interface ImgLazyLoadProps {
    src: string;
    alt?: string;
    threshold?: number;
    placeholder?: React.ReactNode;
    onError?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

const ImgLazyLoad: React.FC<ImgLazyLoadProps> = ({
    src,
    alt = '',
    threshold = 0,
    placeholder = <div className="img-lazy-load-placeholder">Loading...</div>,
    onError,
    className = '',
    style,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasError, setHasError] = useState(false);
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
            { threshold },
        );

        observer.observe(imgRef.current);

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [threshold]);

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    return (
        <div ref={imgRef} className={`${className}`} style={style}>
            {!isVisible || hasError ? placeholder : <img src={src} alt={alt} onError={handleError} />}
        </div>
    );
};

export default ImgLazyLoad;
