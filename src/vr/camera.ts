import { mat4, vec3 } from 'gl-matrix'
import { KeyCodes, KeyState } from 'tvs-libs/dist/events/keyboard'
import { MouseState } from 'tvs-libs/dist/events/mouse'

const defaultProps = {
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
	needsUpdateView: false,
}

type Props = typeof defaultProps

export function create(opts = {} as Partial<Props>) {
	const props = {
		...defaultProps,
		...opts,
	}

	const state = {
		view: mat4.create(),
		perspective: mat4.create(),
		rotationX: mat4.create(),
		rotationY: mat4.create(),
		position: [0, 0, 0],
	}

	const cam = { props, state }
	update(cam)
	return cam
}

export function update({
	props,
	state: { view, perspective, rotationX, rotationY, position },
}: any) {
	if (props.needsUpdatePerspective) {
		props.needsUpdatePerspective = false

		mat4.perspective(
			perspective,
			props.fovy,
			props.aspect,
			props.near,
			props.far,
		)
	}

	let needsUpdateView = props.needsUpdateView

	if (props.rotateX) {
		mat4.rotateX(rotationX, rotationX, props.rotateX)
		props.rotateX = 0
		needsUpdateView = true
	}

	if (props.rotateY) {
		mat4.rotateY(rotationY, rotationY, props.rotateY)
		props.rotateY = 0
		needsUpdateView = true
	}

	if (props.moveForward) {
		const v = vec3.fromValues(rotationY[8], rotationY[9], rotationY[10])
		vec3.add(position, position, vec3.scale(v, v, -props.moveForward))
		props.moveForward = 0
		needsUpdateView = true
	}

	if (props.moveLeft) {
		const v = vec3.fromValues(rotationY[0], rotationY[1], rotationY[2])
		vec3.add(position, position, vec3.scale(v, v, -props.moveLeft))
		props.moveLeft = 0
		needsUpdateView = true
	}

	if (props.moveUp) {
		const v = vec3.fromValues(rotationY[4], rotationY[5], rotationY[6])
		vec3.add(position, position, vec3.scale(v, v, props.moveUp))
		props.moveUp = 0
		needsUpdateView = true
	}

	if (needsUpdateView) {
		mat4.fromTranslation(view, position)
		mat4.multiply(view, view, rotationY)
		mat4.multiply(view, view, rotationX)
		mat4.invert(view, view)
		props.needsUpdateView = false
	}

	return needsUpdateView
}

export function updatePosFromKeys(camera: any, speed: number, keys: KeyState) {
	if (!keys) return
	if (keys[KeyCodes.UP] || keys[KeyCodes.W]) {
		camera.props.moveForward = speed
	}
	if (keys[KeyCodes.DOWN] || keys[KeyCodes.S]) {
		camera.props.moveForward = -speed
	}
	if (keys[KeyCodes.LEFT] || keys[KeyCodes.A]) {
		camera.props.moveLeft = speed
	}
	if (keys[KeyCodes.RIGHT] || keys[KeyCodes.D]) {
		camera.props.moveLeft = -speed
	}
}

export function updateRotFromMouse(camera: any, speed: number, m: MouseState) {
	camera.state.mouse = camera.state.mouse || { x: 0, y: 0 }
	const deltaX = m.drag.x === 0 ? m.drag.x : camera.state.mouse.x - m.drag.x
	const deltaY = m.drag.y === 0 ? m.drag.y : camera.state.mouse.y - m.drag.y
	camera.state.mouse.x = m.drag.x
	camera.state.mouse.y = m.drag.y
	camera.props.rotateX = deltaY * speed
	camera.props.rotateY = deltaX * speed
}
