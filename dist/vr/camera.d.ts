import { mat4 } from 'gl-matrix';
import { KeyState } from 'tvs-libs/dist/lib/events/keyboard';
import { MouseState } from 'tvs-libs/dist/lib/events/mouse';
export declare function create(opts?: Partial<{
    fovy: number;
    aspect: number;
    near: number;
    far: number;
    needsUpdatePerspective: boolean;
    rotateX: number;
    rotateY: number;
    moveForward: number;
    moveLeft: number;
    moveUp: number;
    needsUpdateView: boolean;
}>): {
    props: {
        fovy: number;
        aspect: number;
        near: number;
        far: number;
        needsUpdatePerspective: boolean;
        rotateX: number;
        rotateY: number;
        moveForward: number;
        moveLeft: number;
        moveUp: number;
        needsUpdateView: boolean;
    };
    state: {
        view: mat4;
        perspective: mat4;
        rotationX: mat4;
        rotationY: mat4;
        position: number[];
    };
};
export declare function update({ props, state: { view, perspective, rotationX, rotationY, position } }: any): any;
export declare function updatePosFromKeys(camera: any, speed: number, keys: KeyState): void;
export declare function updateRotFromMouse(camera: any, speed: number, m: MouseState): void;
