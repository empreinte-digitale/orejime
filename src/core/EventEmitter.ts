export default class EventEmitter<
	Types extends {
		[name: string]: (...args: any[]) => void;
	}
> {
	#listeners: Partial<
		{
			[Key in keyof Types]: Array<Types[Key]>;
		}
	>;

	constructor() {
		this.#listeners = {};
	}

	on<Key extends keyof Types>(event: Key, listener: Types[Key]): void {
		if (!(event in this.#listeners)) {
			this.#listeners[event] = [];
		}

		(this.#listeners[event] as Types[Key][]).push(listener);
	}

	off<Key extends keyof Types>(event: Key, listener: Types[Key]): void {
		if (!(event in this.#listeners)) {
			return;
		}

		const index = (this.#listeners[event] as Types[Key][]).findIndex(
			(l) => l === listener
		);

		if (index >= 0) {
			(this.#listeners[event] as Types[Key][]).splice(index, 1);
		}
	}

	protected emit<Key extends keyof Types>(
		event: Key,
		...args: Parameters<Types[Key]>
	): void {
		if (!(event in this.#listeners)) {
			return;
		}

		(this.#listeners[event] as Types[Key][]).forEach((listener) => {
			listener(...args);
		});
	}
}
