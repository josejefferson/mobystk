class EventEmitter {
	constructor() {
		this.events = {}
	}

	on(events, listener) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] !== 'object') {
				this.events[event] = []
			}
			this.events[event].push(listener)
		}
		return () => {
			for (const event of events.split(' ')) {
				this.removeListener(event, listener)
			}
		}
	}

	off(events, listener) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] === 'object') {
				const idx = this.events[event].indexOf(listener)
				if (idx > -1) {
					this.events[event].splice(idx, 1)
				}
			}
		}
	}

	emit(events, ...args) {
		for (const event of events.split(' ')) {
			if (typeof this.events[event] === 'object') {
				this.events[event].forEach(listener => listener.apply(this, args))
			}
		}
	}

	once(events, listener) {
		for (const event of events.split(' ')) {
			const remove = this.on(event, (...args) => {
				remove()
				listener.apply(this, args)
			})
		}
	}
}