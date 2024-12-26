export {}

declare global {
	const VERSION: string

	interface Window {
		[key: string]: any
	}

	interface Navigator {
		getBattery?: () => Promise<any>
	}

	interface Event {
		path: Element[]
	}
}
