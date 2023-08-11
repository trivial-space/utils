export declare enum Buttons {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}
export interface PointerState {
    pressed: {
        [btn: number]: PointerEvent;
    };
    drag: {
        x: number;
        y: number;
        dX: number;
        dY: number;
        xMax: number;
        yMax: number;
        event?: PointerEvent;
    };
    dragging: boolean;
    holding: boolean;
}
export interface PointerOpts {
    element?: HTMLElement;
    enableRightButton?: boolean;
    holdDelay?: number;
    holdRadius?: number;
    keepDefault?: boolean;
    propagate?: boolean;
}
export declare function pointer(callback: (val: PointerState) => void, opts?: PointerOpts): () => void;
