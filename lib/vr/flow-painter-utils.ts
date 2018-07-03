import { EntityRef, asyncStreamStart, stream, asyncStream } from 'tvs-flow/dist/lib/utils/entity-reference'
import { WindowSizeState } from 'tvs-libs/dist/lib/events/dom'
import { getContext } from 'tvs-painter/dist/lib/utils/context'
import { Painter } from 'tvs-painter/dist/lib/painter'
import { Layer, GL, SketchData, LayerData, ShadeData, FormData, DrawSettings } from 'tvs-painter/dist/lib/painter-types'
import { unequal } from 'tvs-libs/dist/lib/utils/predicates'
import { Shade } from 'tvs-painter/dist/lib/shade'
import { Form } from 'tvs-painter/dist/lib/form'
import { Sketch } from 'tvs-painter/dist/lib/sketch'


export function createBodyCanvas() {
	const canvas = asyncStreamStart<HTMLCanvasElement>(
		null,
		(send) => {

			const canvas = document.createElement('canvas')
			document.body.appendChild(canvas)

			send(canvas)

			return () => {
				document.body.removeChild(canvas)
			}
		}
	)

	return {canvas}
}

export function setupPainter (
	canvas: EntityRef<HTMLCanvasElement>,
	windowSizeEntity: EntityRef<WindowSizeState>,
	painterSettings?: EntityRef<DrawSettings>
) {


	const gl = stream([canvas.HOT], getContext)

	const painter = asyncStream<Painter, GL>(
		[gl.HOT],
		(send, gl) => {
			const p = new Painter(gl)
			send(p)
			return p.destroy
		}
	)
	.accept(unequal) // neccessary to avoid recalculations after painter reactions


	const canvasSize = stream(
		[canvas.HOT, windowSizeEntity.HOT],
		(canvas: HTMLCanvasElement) => ({
			width: canvas.clientWidth,
			height: canvas.clientHeight
		})
	)

	painter.react(
		[canvasSize.HOT],
		(p, _) => p.resize(),
		'updateSize'
	)

	if (painterSettings) {
		painter.react([painterSettings.HOT], (p, s) => p.updateDrawSettings(s))
	}

	return { painter, gl, canvasSize }
}


export function makeShadeEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<ShadeData>
): EntityRef<Shade> {
	const entity = asyncStream<Shade, Painter>(
		[painter.HOT],
		(send, painter) => {
			const shade = painter.createShade()
			send(shade)
			return shade.destroy
		}
	)

	if (data) {
		entity.react(
			[data.HOT],
			(entity, data) => entity.update(data)
		)
	}

	return entity
}

export function makeFormEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<FormData>
): EntityRef<Form> {
	const entity = asyncStream<Form, Painter>(
		[painter.HOT],
		(send, painter) => {
			const form = painter.createForm()
			send(form)
			return form.destroy
		}
	)

	if (data) {
		entity.react(
			[data.HOT],
			(entity, data) => entity.update(data)
		)
	}

	return entity
}

export function makeSketchEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<SketchData>
): EntityRef<Sketch> {
	const entity = asyncStream<Sketch, Painter>(
		[painter.HOT],
		(send, painter) => {
			const sketch = painter.createSketch()
			send(sketch)
			return sketch.destroy
		}
	)

	if (data) {
		entity.react( [data.HOT], (entity, data) => entity.update(data))
	}

	return entity
}

export function makeFlatSketchEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<SketchData>
): EntityRef<Sketch> {
	const entity = asyncStream<Sketch, Painter>(
		[painter.HOT],
		(send, painter) => {
			const sketch = painter.createFlatSketch()
			send(sketch)
			return sketch.destroy
		}
	)

	if (data) {
		entity.react( [data.HOT], (entity, data) => entity.update(data))
	}

	return entity
}

export function makeStaticLayerEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<LayerData>
): EntityRef<Layer> {
	const entity = asyncStream<Layer, Painter>(
		[painter.HOT],
		(send, painter) => {
			const layer = painter.createStaticLayer()
			send(layer)
			return layer.destroy
		}
	)

	if (data) {
		entity.react( [data.HOT], (entity, data) => entity.update(data))
	}

	return entity
}

export function makeDrawingLayerEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<LayerData>
): EntityRef<Layer> {
	const entity = asyncStream<Layer, Painter>(
		[painter.HOT],
		(send, painter) => {
			const layer = painter.createDrawingLayer()
			send(layer)
			return layer.destroy
		}
	)

	if (data) {
		entity.react( [data.HOT], (entity, data) => entity.update(data))
	}

	return entity
}

export function makeEffectLayerEntity (
	painter: EntityRef<Painter>,
	data?: EntityRef<LayerData>
): EntityRef<Layer> {
	const entity = asyncStream<Layer, Painter>(
		[painter.HOT],
		(send, painter) => {
			const layer = painter.createEffectLayer()
			send(layer)
			return layer.destroy
		}
	)

	if (data) {
		entity.react( [data.HOT], (entity, data) => entity.update(data))
	}

	return entity
}
