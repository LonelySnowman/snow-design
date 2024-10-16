import type { Ref } from 'vue';
import { watch, ref } from 'vue';

function hasValue(value: any) {
    return value !== undefined;
}

export default function useMergedState<T>(
    defaultStateValue: T | (() => T),
    option?: {
        defaultValue?: T | (() => T);
        value?: Ref<T>;
        onChange?: (value: T, prevValue: T) => void;
    },
): [Ref<T>, (value: T) => void] {
    const { defaultValue, value: valueRef, onChange } = option || {};

    const getInnerValue = () => {
        if (hasValue(valueRef.value)) {
            return valueRef.value;
        } else if (hasValue(defaultValue)) {
            return typeof defaultValue === 'function' ? (defaultValue as any)() : defaultValue;
        } else {
            return typeof defaultStateValue === 'function' ? (defaultStateValue as any)() : defaultStateValue;
        }
    };
    const innerValue = ref<T>(getInnerValue()) as Ref<T>;
    const setInnerValue = (value: T) => {
        innerValue.value = value;
    };

    const mergedValue = hasValue(valueRef.value) ? valueRef : innerValue;
    watch(valueRef, (newValue, oldValue) => {
        if (!hasValue(newValue) && oldValue !== newValue) {
            setInnerValue(newValue);
        }
        if (oldValue !== newValue) {
            onChange(newValue, oldValue);
        }
    });

    return [mergedValue, setInnerValue];
}
