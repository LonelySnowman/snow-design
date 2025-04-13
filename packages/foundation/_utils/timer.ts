/*
Animation frame based implementation of setTimeout.
Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js

Use code from react-window https://github.com/bvaughn/react-window/blob/master/src/timer.js
*/

const hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';

const now = hasNativePerformanceNow ? () => performance.now() : () => Date.now();

export interface TimeoutID {
    id: number;
}

export function cancelTimeout(timeoutID: TimeoutID) {
    if (!window.cancelAnimationFrame) {
        return window.clearTimeout(timeoutID.id);
    }
    cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback: () => void, delay: number): TimeoutID {
    if (!window.requestAnimationFrame) {
        return {
            id: window.setTimeout(callback, delay),
        };
    }
    const start = now();
    function tick() {
        if (now() - start >= delay) {
            callback.call(null);
        } else {
            timeoutID.id = requestAnimationFrame(tick);
        }
    }
    const timeoutID: TimeoutID = {
        id: requestAnimationFrame(tick),
    };
    return timeoutID;
}
