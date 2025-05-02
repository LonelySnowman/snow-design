import { useRef, useState, Dispatch, SetStateAction, useLayoutEffect } from 'react';
import usePrevious from './usePrevious';

function hasValue(value: any) {
    return value !== undefined;
}

export default function useMergedState<T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: T;
        onChange?: (value: T, prevValue: T) => void;
    },
): [T, Dispatch<SetStateAction<T>>] {
    const { defaultValue, value, onChange } = option || {};
    const firstRenderRef = useRef(true);
    const prevPropsValue = usePrevious(value);

    const [innerValue, setInnerValue] = useState<T>(() => {
        if (hasValue(value)) {
            return value;
        } else if (hasValue(defaultValue)) {
            return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
        } else {
            return typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue;
        }
    });

    const mergedValue = hasValue(value) ? value : innerValue;

    useLayoutEffect(() => {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        if (!hasValue(value) && prevPropsValue !== value) {
            setInnerValue(value);
        }
        if (prevPropsValue !== value) onChange?.(value, prevPropsValue);
    }, [value]);

    return [mergedValue, setInnerValue];
}
