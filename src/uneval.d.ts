declare module 'uneval.js' {
	export type Opts = {
		namespace?: Map<any, string>;
		safe?: boolean;
	};

	export default function uneval(
		obj: any,
		opts?: Opts,
		level?: string
	): string;
}
