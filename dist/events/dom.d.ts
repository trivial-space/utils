export interface WindowSizeState {
    width: number;
    height: number;
}
export declare function windowSize(callback: (s: WindowSizeState) => void): () => void;
