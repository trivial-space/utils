import { mat4, vec3 } from 'gl-matrix';
import { val } from 'tvs-flow/dist/lib/utils/entity-reference';
export function makePerspective(canvasSize) {
    var perspectiveSettings = val({
        near: 0.1,
        far: 1000,
        fovy: Math.PI * 0.6,
        aspect: 1
    })
        .react([canvasSize.HOT], function (self, _a) {
        var width = _a.width, height = _a.height;
        self.aspect = width / height;
        return self;
    });
    var perspective = val(mat4.create())
        .react([perspectiveSettings.HOT], function (self, s) { return mat4.perspective(self, s.fovy, s.aspect, s.near, s.far); });
    return {
        perspectiveSettings: perspectiveSettings, perspective: perspective
    };
}
export function makeFirstPersonView() {
    var position = val(vec3.fromValues(0, 0, 0));
    var rotY = val(0);
    var rotX = val(0);
    var rotation = val({
        rotX: mat4.create(),
        rotY: mat4.create()
    })
        .react([rotY.HOT], function (self, rotY) {
        mat4.fromYRotation(self.rotY, rotY);
        return self;
    })
        .react([rotX.HOT], function (self, rotX) {
        mat4.fromXRotation(self.rotX, rotX);
        return self;
    });
    var view = val(mat4.create())
        .react([rotation.HOT, position.HOT], function (self, rotation, position) {
        mat4.fromTranslation(self, position);
        mat4.multiply(self, self, rotation.rotY);
        mat4.multiply(self, self, rotation.rotX);
        mat4.invert(self, self);
        return self;
    });
    return { position: position, rotation: rotation, view: view, rotY: rotY, rotX: rotX };
}
//# sourceMappingURL=flow-camera.js.map