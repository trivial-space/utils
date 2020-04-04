var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { mat4, vec3 } from 'gl-matrix';
import { Keys } from 'tvs-libs/dist/events/keyboard';
var defaultProps = {
    fovy: Math.PI * 0.6,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.1,
    far: 1000,
    needsUpdatePerspective: true,
    rotateX: 0,
    rotateY: 0,
    moveForward: 0,
    moveLeft: 0,
    moveUp: 0,
    needsUpdateView: false
};
export function create(opts) {
    if (opts === void 0) { opts = {}; }
    var props = __assign(__assign({}, defaultProps), opts);
    var state = {
        view: mat4.create(),
        perspective: mat4.create(),
        rotationX: mat4.create(),
        rotationY: mat4.create(),
        position: [0, 0, 0]
    };
    var cam = { props: props, state: state };
    update(cam);
    return cam;
}
export function update(_a) {
    var props = _a.props, _b = _a.state, view = _b.view, perspective = _b.perspective, rotationX = _b.rotationX, rotationY = _b.rotationY, position = _b.position;
    if (props.needsUpdatePerspective) {
        props.needsUpdatePerspective = false;
        mat4.perspective(perspective, props.fovy, props.aspect, props.near, props.far);
    }
    var needsUpdateView = props.needsUpdateView;
    if (props.rotateX) {
        mat4.rotateX(rotationX, rotationX, props.rotateX);
        props.rotateX = 0;
        needsUpdateView = true;
    }
    if (props.rotateY) {
        mat4.rotateY(rotationY, rotationY, props.rotateY);
        props.rotateY = 0;
        needsUpdateView = true;
    }
    if (props.moveForward) {
        var v = vec3.fromValues(rotationY[8], rotationY[9], rotationY[10]);
        vec3.add(position, position, vec3.scale(v, v, -props.moveForward));
        props.moveForward = 0;
        needsUpdateView = true;
    }
    if (props.moveLeft) {
        var v = vec3.fromValues(rotationY[0], rotationY[1], rotationY[2]);
        vec3.add(position, position, vec3.scale(v, v, -props.moveLeft));
        props.moveLeft = 0;
        needsUpdateView = true;
    }
    if (props.moveUp) {
        var v = vec3.fromValues(rotationY[4], rotationY[5], rotationY[6]);
        vec3.add(position, position, vec3.scale(v, v, props.moveUp));
        props.moveUp = 0;
        needsUpdateView = true;
    }
    if (needsUpdateView) {
        mat4.fromTranslation(view, position);
        mat4.multiply(view, view, rotationY);
        mat4.multiply(view, view, rotationX);
        mat4.invert(view, view);
        props.needsUpdateView = false;
    }
    return needsUpdateView;
}
export function updatePosFromKeys(camera, speed, keys) {
    if (!keys)
        return;
    if (keys[Keys.UP] || keys[Keys.W]) {
        camera.props.moveForward = speed;
    }
    if (keys[Keys.DOWN] || keys[Keys.S]) {
        camera.props.moveForward = -speed;
    }
    if (keys[Keys.LEFT] || keys[Keys.A]) {
        camera.props.moveLeft = speed;
    }
    if (keys[Keys.RIGHT] || keys[Keys.D]) {
        camera.props.moveLeft = -speed;
    }
}
export function updateRotFromMouse(camera, speed, m) {
    camera.state.mouse = camera.state.mouse || { x: 0, y: 0 };
    var deltaX = m.drag.x === 0 ? m.drag.x : camera.state.mouse.x - m.drag.x;
    var deltaY = m.drag.y === 0 ? m.drag.y : camera.state.mouse.y - m.drag.y;
    camera.state.mouse.x = m.drag.x;
    camera.state.mouse.y = m.drag.y;
    camera.props.rotateX = deltaY * speed;
    camera.props.rotateY = deltaX * speed;
}
//# sourceMappingURL=camera.js.map