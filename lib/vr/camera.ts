import { mat4, vec3 } from 'gl-matrix'


export function create (opts = {}) {

	const props = Object.assign({
		fovy: Math.PI * 0.6,
		aspect: window.innerWidth / window.innerHeight,
		near: 0.1,
		far: 1000,
		needsUpdatePerspective: false,
		rotateX: 0,
		rotateY: 0,
		moveForward: 0,
		moveLeft: 0,
		moveUp: 0
	}, opts)

	const state = {
		view: mat4.create(),
		perspective: mat4.perspective(
			mat4.create(),
			props.fovy,
			props.aspect,
			props.near,
			props.far
		),
		rotationX: mat4.create(),
		rotationY: mat4.create(),
		position: [0, 0, 0]
	}

	return { props, state }
}


export function update ({ props, state: { view, perspective, rotationX, rotationY, position } }: any) {

	if (props.needsUpdatePerspective) {
		props.needsUpdatePerspective = false

		mat4.perspective(
			perspective,
			props.fovy,
			props.aspect,
			props.near,
			props.far
		)
	}

	let needsUpdateView = false

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
	}
}
