import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
	type Events = {
		'foo': () => void;
		'bar': (value: number) => void;
	};

	test('all', () => {
		const fooCallback = jest.fn();
		const barCallback = jest.fn();
		const emitter = new EventEmitter<Events>();

		emitter.on('foo', fooCallback);
		emitter.on('bar', barCallback);
		emitter['emit']('bar', 1);
		emitter.off('bar', barCallback);
		emitter['emit']('bar', 2);

		expect(fooCallback.mock.calls).toEqual([]);
		expect(barCallback.mock.calls).toEqual([[1]]);
	});
});
