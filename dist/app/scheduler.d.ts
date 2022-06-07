declare type Callback = (tpf: number) => void;
export declare function once(fn: Callback, id?: string | number): void;
export declare function repeat(fn: Callback, id?: string | number): string | number;
export declare function stop(id: Callback | string | number): void;
export {};
