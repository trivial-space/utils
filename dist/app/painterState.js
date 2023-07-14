import { windowSize } from 'tvs-libs/dist/events/dom';
import { keyboard } from 'tvs-libs/dist/events/keyboard';
import { deepOverride } from 'tvs-libs/dist/utils/object';
import { Painter } from 'tvs-painter/dist/painter';
import { pointer } from 'tvs-libs/dist/events/pointer';
import { onNextFrame } from './frameLoop';
let currentCanvas;
let painter;
const forms = {};
function getForm(id) {
    return forms[id] || (forms[id] = painter.createForm('Form_' + id));
}
const shades = {};
function getShade(id) {
    return shades[id] || (shades[id] = painter.createShade('Shade_' + id));
}
const sketches = {};
function getSketch(id) {
    return sketches[id] || (sketches[id] = painter.createSketch('Sketch_' + id));
}
const layers = {};
function getLayer(id) {
    return layers[id] || (layers[id] = painter.createLayer('Layer_' + id));
}
const effects = {};
function getEffect(id) {
    return effects[id] || (effects[id] = painter.createEffect('Effect_' + id));
}
const state = {
    device: {
        tpf: 0,
        sizeMultiplier: 1,
    },
};
window.state = state;
const eventHandlers = {};
export const baseEvents = {
    FRAME: 'frame',
    RESIZE: 'resize',
    POINTER: 'pointer',
    KEYBOARD: 'keyboard',
};
let cancelWindow;
let cancelPointer;
let cancelKeys;
export function getPainterContext(canvas, opts) {
    if (canvas !== currentCanvas) {
        currentCanvas = canvas;
        painter = new Painter(canvas, opts);
        state.device.canvas = canvas;
        cancelWindow && cancelWindow();
        cancelPointer && cancelPointer();
        cancelKeys && cancelKeys();
        cancelWindow = windowSize(() => {
            console.log('resize handler');
            onNextFrame(() => {
                console.log('resize handler on next frame');
                painter.sizeMultiplier = state.device.sizeMultiplier;
                painter.resize();
                emit(baseEvents.RESIZE);
            }, 'resize');
        });
        cancelPointer = pointer({
            element: canvas,
            enableRightButton: true,
            holdRadius: 7,
            holdDelay: 250,
        }, (m) => {
            state.device.pointer = m;
            emit(baseEvents.POINTER);
        });
        cancelKeys = keyboard((k) => {
            state.device.keys = k;
            emit(baseEvents.KEYBOARD);
        });
    }
    return {
        painter,
        gl: painter.gl,
        getForm,
        getShade,
        getSketch,
        getLayer,
        getEffect,
        state: state,
        get,
        set,
        listen,
        emit,
    };
    function get(prop) {
        return state[prop];
    }
    function set(key, val, opts) {
        const s = state;
        if (s[key]) {
            const reset = opts && opts.reset;
            if (reset !== true) {
                val = deepOverride(val, s[key], { ignore: reset });
            }
        }
        s[key] = val;
    }
    function listen(id, event, s) {
        if (!eventHandlers[event])
            eventHandlers[event] = {};
        eventHandlers[event][id] = s;
    }
    function emit(event) {
        const e = eventHandlers[event];
        if (e)
            for (const id in e) {
                e[id](state);
            }
    }
}
//# sourceMappingURL=painterState.js.map