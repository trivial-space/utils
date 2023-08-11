export interface WindowSizeState {
	width: number
	height: number
}

export function windowSize(callback: (s: WindowSizeState) => void) {
	function resize() {
		callback({
			width: window.innerWidth,
			height: window.innerHeight,
		})
	}

	window.addEventListener('resize', resize)

	resize()

	return function stop() {
		window.removeEventListener('resize', resize)
	}
}

export interface WindowSizeObserver {
	state: {
		size: WindowSizeState,
	}
	destroy: () => void
}

export function windowSizeObserver(): WindowSizeObserver {
	const state = {
		size: { width: 0, height: 0 },
	}

	const destroy = windowSize(s => (state.size = s))

	return { state, destroy }
}
