export {}

declare global {
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
