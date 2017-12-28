import { mat4, vec3 } from 'gl-matrix'
import { EntityRef, val } from 'tvs-flow/dist/lib/utils/entity-reference'


export interface PerspectiveSettings {
	near: number,
	far: number,
	fovy: number,
	aspect: number
}

export function makePerspective (canvasSize: EntityRef<{ width: number, height: number }>) {

	const perspectiveSettings = val<PerspectiveSettings>({
		near: 0.1,
		far: 1000,
		fovy: Math.PI * 0.6,
		aspect: 1
	})
	.react(
		[canvasSize.HOT],
		(self, {width, height}) => {
			self.aspect = width / height
			return self
		}
	)

	const perspective = val(mat4.create())
	.react(
		[ perspectiveSettings.HOT ],
		(self, s) => mat4.perspective(self, s.fovy, s.aspect, s.near, s.far)
	)

	return {
		perspectiveSettings, perspective
	}
}


export function makeFirstPersonView () {

	const position = val(vec3.fromValues(0, 0, 0))
	const rotY = val(0)
	const rotX = val(0)

	const rotation = val({
		rotX: mat4.create(),
		rotY: mat4.create()
	})
	.react(
		[rotY.HOT],
		(self, rotY) => {
			mat4.fromYRotation(self.rotY, rotY)
			return self
		}
	)
	.react(
		[rotX.HOT],
		(self, rotX) => {
			mat4.fromXRotation(self.rotX, rotX)
			return self
		}
	)

	const view = val(mat4.create())
	.react(
		[rotation.HOT, position.HOT],
		(self, rotation, position) => {
			mat4.fromTranslation(self, position)
			mat4.multiply(self, self, rotation.rotY)
			mat4.multiply(self, self, rotation.rotX)
			mat4.invert(self, self)
			return self
		}
	)

	return { position, rotation, view, rotY, rotX }
}
