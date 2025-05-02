export interface ImgLazyLoadAdapter {
    setIsVisible: (isVisible: boolean) => void;
    setHasError: (hasError: boolean) => void;
    setIsLoaded: (isLoaded: boolean) => void;
    getElement: () => HTMLElement;
    getProps: () => any;
    getState: () => any;
}

export interface ImgLazyLoadState {
    isVisible: boolean;
    hasError: boolean;
    isLoaded: boolean;
}

const useImgLazyLoadFoundation = (adapter: ImgLazyLoadAdapter) => {
    const { setIsVisible, getProps, setIsLoaded, setHasError, getState, getElement } = adapter;

    const init = (): any => {
        const { threshold, rootMargin } = getProps();
        const imgElement = getElement();
        if (!imgElement) return;
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
        observer.observe(imgElement);
        return () => {
            observer.unobserve(imgElement);
        };
    };

    const loadImage = async () => {
        const { src } = getProps();
        const imgElement = getElement();
        if (!getState().isVisible || !src || !imgElement) return;
        const fetchImage = () => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                setIsLoaded(true);
                imgElement.appendChild(img);
            };
            img.onerror = () => {
                setHasError(true);
            };
        };
        fetchImage();
    };

    return {
        init,
        loadImage,
    };
};

export default useImgLazyLoadFoundation;
