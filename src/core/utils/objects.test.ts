import {diff, overwrite} from './objects';

test('diff', () => {
	expect(diff({}, {})).toEqual({});
	expect(diff({a: 1, b: 2}, {a: 1, b: 2})).toEqual({});
	expect(diff({a: 1, b: 2}, {a: 1, b: 3})).toEqual({b: 3});
});

test('overwrite', () => {
	expect(overwrite({}, {})).toEqual({});
	expect(overwrite({a: 1, b: 2}, {})).toEqual({a: 1, b: 2});
	expect(overwrite({a: 1, b: 2}, {a: 1, b: 3})).toEqual({a: 1, b: 3});
	expect(overwrite({a: 1}, {a: 1})).toEqual({a: 1});
	expect(overwrite({}, {a: 1, b: 3})).toEqual({});
});
