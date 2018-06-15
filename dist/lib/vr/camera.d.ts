import { mat4 } from 'gl-matrix';
export declare function create(opts?: {}): {
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
    };
    state: {
        view: mat4;
        perspective: mat4;
        rotationX: mat4;
        rotationY: mat4;
        position: number[];
    };
};
export declare function update({ props, state: { view, perspective, rotationX, rotationY, position } }: any): boolean;
export declare function updatePosFromKeys(camera: any, speed: number, keys: any): void;
export declare function updateRotFromMouse(camera: any, speed: number, m: any): void;
