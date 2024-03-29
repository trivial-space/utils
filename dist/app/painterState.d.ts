import { GL, PainterOptions } from 'tvs-painter';
import { Form } from 'tvs-painter/dist/form';
import { Layer } from 'tvs-painter/dist/layer';
import { Painter } from 'tvs-painter/dist/painter';
import { Shade } from 'tvs-painter/dist/shade';
import { Effect, Sketch } from 'tvs-painter/dist/sketch';
import { PointerState } from '../events/pointer';
import { KeyState } from '../events/keyboard';
declare function getForm(id: string): Form;
declare function getShade(id: string): Shade;
declare function getSketch(id: string): Sketch;
declare function getLayer(id: string): Layer;
declare function getEffect(id: string): Effect;
export interface BaseState {
    device: {
        tpf: number;
        canvas: HTMLCanvasElement;
        pointer: PointerState;
        keys: KeyState;
        sizeMultiplier: number;
    };
}
type ActionHandler<S extends BaseState = BaseState> = (state: S) => void;
export declare const baseEvents: {
    readonly FRAME: "frame";
    readonly RESIZE: "resize";
    readonly POINTER: "pointer";
    readonly KEYBOARD: "keyboard";
};
export interface EventOpts {
    keepPointerDefault?: boolean;
    propagatePointer?: boolean;
}
export declare function getPainterContext<S extends BaseState>(canvas: HTMLCanvasElement, options?: PainterOptions & EventOpts): PainterContext<S>;
export interface PainterContext<S extends BaseState = BaseState> {
    painter: Painter;
    gl: GL;
    getForm: typeof getForm;
    getShade: typeof getShade;
    getSketch: typeof getSketch;
    getLayer: typeof getLayer;
    getEffect: typeof getEffect;
    state: S;
    get<K extends keyof S = keyof S>(prop: K): S[K];
    set<K extends keyof S = keyof S>(key: K, val: S[K], opts?: {
        reset: any;
    }): void;
    listen(id: string, event: string, s: ActionHandler<S>): void;
    emit(event: string): void;
}
export {};
