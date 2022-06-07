declare type Callback = (tpf: number) => void;
export declare function stopLoop(): void;
export declare function onNextFrame(fn: Callback, id?: string | number): string | number;
export declare function addToLoop(fn: Callback, id?: string | number): string | number;
export declare function removeFromLoop(id: Callback | string | number): void;
export declare function startLoop(loopToggleKey?: KeyboardEvent['key'] | null | false): void;
export declare function initKeyboardLoopToggle(key?: KeyboardEvent['key']): void;
export declare function removeKeyboardLoopToggle(): void;
export {};
