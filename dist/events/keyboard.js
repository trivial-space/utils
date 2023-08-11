export var KeyboardCode;
(function (KeyboardCode) {
    KeyboardCode["Escape"] = "Escape";
    KeyboardCode["Digit1"] = "Digit1";
    KeyboardCode["Digit2"] = "Digit2";
    KeyboardCode["Digit3"] = "Digit3";
    KeyboardCode["Digit4"] = "Digit4";
    KeyboardCode["Digit5"] = "Digit5";
    KeyboardCode["Digit6"] = "Digit6";
    KeyboardCode["Digit7"] = "Digit7";
    KeyboardCode["Digit8"] = "Digit8";
    KeyboardCode["Digit9"] = "Digit9";
    KeyboardCode["Digit0"] = "Digit0";
    KeyboardCode["Minus"] = "Minus";
    KeyboardCode["Equal"] = "Equal";
    KeyboardCode["Backspace"] = "Backspace";
    KeyboardCode["Tab"] = "Tab";
    KeyboardCode["KeyQ"] = "KeyQ";
    KeyboardCode["KeyW"] = "KeyW";
    KeyboardCode["KeyE"] = "KeyE";
    KeyboardCode["KeyR"] = "KeyR";
    KeyboardCode["KeyT"] = "KeyT";
    KeyboardCode["KeyY"] = "KeyY";
    KeyboardCode["KeyU"] = "KeyU";
    KeyboardCode["KeyI"] = "KeyI";
    KeyboardCode["KeyO"] = "KeyO";
    KeyboardCode["KeyP"] = "KeyP";
    KeyboardCode["BracketLeft"] = "BracketLeft";
    KeyboardCode["BracketRight"] = "BracketRight";
    KeyboardCode["Enter"] = "Enter";
    KeyboardCode["ControlLeft"] = "ControlLeft";
    KeyboardCode["KeyA"] = "KeyA";
    KeyboardCode["KeyS"] = "KeyS";
    KeyboardCode["KeyD"] = "KeyD";
    KeyboardCode["KeyF"] = "KeyF";
    KeyboardCode["KeyG"] = "KeyG";
    KeyboardCode["KeyH"] = "KeyH";
    KeyboardCode["KeyJ"] = "KeyJ";
    KeyboardCode["KeyK"] = "KeyK";
    KeyboardCode["KeyL"] = "KeyL";
    KeyboardCode["Semicolon"] = "Semicolon";
    KeyboardCode["Quote"] = "Quote";
    KeyboardCode["Backquote"] = "Backquote";
    KeyboardCode["ShiftLeft"] = "ShiftLeft";
    KeyboardCode["Backslash"] = "Backslash";
    KeyboardCode["KeyZ"] = "KeyZ";
    KeyboardCode["KeyX"] = "KeyX";
    KeyboardCode["KeyC"] = "KeyC";
    KeyboardCode["KeyV"] = "KeyV";
    KeyboardCode["KeyB"] = "KeyB";
    KeyboardCode["KeyN"] = "KeyN";
    KeyboardCode["KeyM"] = "KeyM";
    KeyboardCode["Comma"] = "Comma";
    KeyboardCode["Period"] = "Period";
    KeyboardCode["Slash"] = "Slash";
    KeyboardCode["ShiftRight"] = "ShiftRight";
    KeyboardCode["NumpadMultiply"] = "NumpadMultiply";
    KeyboardCode["AltLeft"] = "AltLeft";
    KeyboardCode["Space"] = "Space";
    KeyboardCode["CapsLock"] = "CapsLock";
    KeyboardCode["F1"] = "F1";
    KeyboardCode["F2"] = "F2";
    KeyboardCode["F3"] = "F3";
    KeyboardCode["F4"] = "F4";
    KeyboardCode["F5"] = "F5";
    KeyboardCode["F6"] = "F6";
    KeyboardCode["F7"] = "F7";
    KeyboardCode["F8"] = "F8";
    KeyboardCode["F9"] = "F9";
    KeyboardCode["F10"] = "F10";
    KeyboardCode["NumLock"] = "NumLock";
    KeyboardCode["ScrollLock"] = "ScrollLock";
    KeyboardCode["Numpad7"] = "Numpad7";
    KeyboardCode["Numpad8"] = "Numpad8";
    KeyboardCode["Numpad9"] = "Numpad9";
    KeyboardCode["NumpadSubtract"] = "NumpadSubtract";
    KeyboardCode["Numpad4"] = "Numpad4";
    KeyboardCode["Numpad5"] = "Numpad5";
    KeyboardCode["Numpad6"] = "Numpad6";
    KeyboardCode["NumpadAdd"] = "NumpadAdd";
    KeyboardCode["Numpad1"] = "Numpad1";
    KeyboardCode["Numpad2"] = "Numpad2";
    KeyboardCode["Numpad3"] = "Numpad3";
    KeyboardCode["Numpad0"] = "Numpad0";
    KeyboardCode["NumpadDecimal"] = "NumpadDecimal";
    KeyboardCode["IntlBackslash"] = "IntlBackslash";
    KeyboardCode["F11"] = "F11";
    KeyboardCode["F12"] = "F12";
    KeyboardCode["IntlRo"] = "IntlRo";
    KeyboardCode["Convert"] = "Convert";
    KeyboardCode["KanaMode"] = "KanaMode";
    KeyboardCode["NonConvert"] = "NonConvert";
    KeyboardCode["NumpadEnter"] = "NumpadEnter";
    KeyboardCode["ControlRight"] = "ControlRight";
    KeyboardCode["NumpadDivide"] = "NumpadDivide";
    KeyboardCode["PrintScreen"] = "PrintScreen";
    KeyboardCode["AltRight"] = "AltRight";
    KeyboardCode["Home"] = "Home";
    KeyboardCode["ArrowUp"] = "ArrowUp";
    KeyboardCode["PageUp"] = "PageUp";
    KeyboardCode["ArrowLeft"] = "ArrowLeft";
    KeyboardCode["ArrowRight"] = "ArrowRight";
    KeyboardCode["End"] = "End";
    KeyboardCode["ArrowDown"] = "ArrowDown";
    KeyboardCode["PageDown"] = "PageDown";
    KeyboardCode["Insert"] = "Insert";
    KeyboardCode["Delete"] = "Delete";
    KeyboardCode["NumpadEqual"] = "NumpadEqual";
    KeyboardCode["Pause"] = "Pause";
    KeyboardCode["NumpadComma"] = "NumpadComma";
})(KeyboardCode || (KeyboardCode = {}));
function emptyState() {
    return { codes: {}, keys: {} };
}
export function keyboard(callback, opts) {
    const { element = window, keepDefault, propagate } = opts || {};
    const pressed = emptyState();
    function onKeydown(event) {
        if (event.defaultPrevented) {
            return;
        }
        const time = Date.now();
        pressed.codes[event.code] = time;
        pressed.keys[event.key] = time;
        callback(pressed);
        if (event.code !== KeyboardCode.Tab) {
            if (!keepDefault) {
                event.preventDefault();
            }
            if (!propagate) {
                event.stopPropagation();
            }
        }
    }
    function onKeyup(event) {
        delete pressed.codes[event.code];
        delete pressed.keys[event.key];
        callback(pressed);
        if (event.code !== KeyboardCode.Tab) {
            if (!keepDefault) {
                event.preventDefault();
            }
            if (!propagate) {
                event.stopPropagation();
            }
        }
    }
    element.addEventListener('keyup', onKeyup);
    element.addEventListener('keydown', onKeydown);
    callback(pressed);
    return function stop() {
        element.removeEventListener('keyup', onKeyup);
        element.removeEventListener('keydown', onKeydown);
    };
}
export function keyboardObserver(opts) {
    const observer = {
        state: { pressed: emptyState() },
        destroy: () => { },
    };
    function callback(pressed) {
        observer.state.pressed = pressed;
    }
    observer.destroy = keyboard(callback, opts);
    return observer;
}
//# sourceMappingURL=keyboard.js.map