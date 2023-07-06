type Listener = (...args: any[]) => any

export default class EventEmitter {
	events: {
		[key: string]: Listener[]
	}

	constructor() {
		this.events = {}
	}

	on(events: string, listener: Listener) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] !== 'object') {
				this.events[event] = []
			}
			this.events[event].push(listener)
		}
		return () => {
			for (const event of events.split(' ')) {
				this.off(event, listener)
			}
		}
	}

	off(events: string, listener: Listener) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] === 'object') {
				const idx = this.events[event].indexOf(listener)
				if (idx > -1) {
					this.events[event].splice(idx, 1)
				}
			}
		}
	}

	emit(events: string, ...args: any[]) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] === 'object') {
				this.events[event].forEach((listener) => listener.apply(this, args))
			}
		}
	}

	once(events: string, listener: Listener) {
		for (const event of events.split(' ')) {
			const remove = this.on(event, (...args) => {
				remove()
				listener.apply(this, args)
			})
		}
	}
}
