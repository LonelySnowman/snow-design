import type { CSSProperties, PropType, VNode } from 'vue';

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;

export type VueNode = VNodeChildAtom | VNodeChildAtom[];

export function objectType<T>(defaultVal?: T) {
    return { type: Object as PropType<T>, default: defaultVal as T };
}

export function functionType<T>(defaultVal?: T) {
    return { type: Function as PropType<T>, default: defaultVal as T };
}

export function eventType<T>() {
    return { type: Function as PropType<T> };
}

export function anyType<T = any>(defaultVal?: T, required?: boolean) {
    const type = { validator: () => true, default: defaultVal as T } as unknown;
    return required
        ? (type as {
              type: PropType<T>;
              default: T;
              required: true;
          })
        : (type as {
              default: T;
              type: PropType<T>;
          });
}

export const CssProps = {
    class: String,
    style: objectType<CSSProperties>(),
};
