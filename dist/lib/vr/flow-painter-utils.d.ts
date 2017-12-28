import { EntityRef } from 'tvs-flow/dist/lib/utils/entity-reference';
import { WindowSizeState } from 'tvs-libs/dist/events/dom';
import { Painter, Shade, Form, Sketch, Layer, SketchData, LayerData, ShadeData, FormData, DrawSettings } from 'tvs-painter/dist/lib/painter-types';
export declare function createBodyCanvas(): {
    canvas: EntityRef<HTMLCanvasElement>;
};
export declare function setupPainter(canvas: EntityRef<HTMLCanvasElement>, windowSizeEntity: EntityRef<WindowSizeState>, painterSettings?: EntityRef<DrawSettings>): {
    painter: EntityRef<Painter>;
    gl: EntityRef<WebGLRenderingContext>;
    canvasSize: EntityRef<{
        width: number;
        height: number;
    }>;
};
export declare function makeShadeEntity(painter: EntityRef<Painter>, data?: EntityRef<ShadeData>): EntityRef<Shade>;
export declare function makeFormEntity(painter: EntityRef<Painter>, data?: EntityRef<FormData>): EntityRef<Form>;
export declare function makeSketchEntity(painter: EntityRef<Painter>, data?: EntityRef<SketchData>): EntityRef<Sketch>;
export declare function makeFlatSketchEntity(painter: EntityRef<Painter>, data?: EntityRef<SketchData>): EntityRef<Sketch>;
export declare function makeStaticLayerEntity(painter: EntityRef<Painter>, data?: EntityRef<LayerData>): EntityRef<Layer>;
export declare function makeDrawingLayerEntity(painter: EntityRef<Painter>, data?: EntityRef<LayerData>): EntityRef<Layer>;
export declare function makeEffectLayerEntity(painter: EntityRef<Painter>, data?: EntityRef<LayerData>): EntityRef<Layer>;
