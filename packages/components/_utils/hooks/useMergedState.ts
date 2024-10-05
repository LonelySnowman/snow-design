import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** We only think `undefined` is empty */
function hasValue(value: any) {
  return value !== undefined;
}

/**
 * Similar to `useState` but will use props value if provided.
 * Note that internal use rc-util `useState` hook.
 */
export default function useMergedState<T>(
  defaultValue: T,
  value?: T,
): [T, (value: T) => void] {
  const firstMount = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      firstMount.current = false;
    }
  }, []);

  // 内部初始化
  const [innerValue, setInnerValue] = useState<T>(() => {
    if (hasValue(value)) {
      return value;
    } else {
      return defaultValue;
    }
  });

  const mergedValue = hasValue(value) ? value : innerValue;

  useLayoutEffect(() => {
    if (!firstMount && hasValue(value)) setInnerValue(value);
  }, [value]);

  const triggerChange = hasValue(value) ? ()=> {} : setInnerValue;

  return [mergedValue, triggerChange];
}
