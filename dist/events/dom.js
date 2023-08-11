export function windowSize(callback) {
    function resize() {
        callback({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }
    window.addEventListener('resize', resize);
    resize();
    return function stop() {
        window.removeEventListener('resize', resize);
    };
}
//# sourceMappingURL=dom.js.map