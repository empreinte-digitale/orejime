import {every, indexBy, withoutAll} from './arrays';

test('every', () => {
	const returnTrue = () => true;
	const returnFalse = () => false;

	expect(every([], returnTrue)).toEqual(false);
	expect(every([], returnFalse)).toEqual(false);
	expect(every([1], returnTrue)).toEqual(true);
	expect(every([1], returnFalse)).toEqual(false);
});

test('withoutAll', () => {
	expect(withoutAll([], [])).toEqual([]);
	expect(withoutAll([1, 2], [])).toEqual([1, 2]);
	expect(withoutAll([1, 2], [1])).toEqual([2]);
	expect(withoutAll([1, 2], [1, 2])).toEqual([]);
});

test('indexBy', () => {
	const foo = {id: 'foo'};
	const bar = {id: 'bar'};

	expect(indexBy([foo, bar], 'id')).toEqual({foo, bar});
});
