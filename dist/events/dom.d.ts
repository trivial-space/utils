export interface WindowSizeState {
    width: number;
    height: number;
}
export declare function windowSize(callback: (s: WindowSizeState) => void): () => void;
export interface WindowSizeObserver {
    state: {
        size: WindowSizeState;
    };
    destroy: () => void;
}
export declare function windowSizeObserver(): WindowSizeObserver;
