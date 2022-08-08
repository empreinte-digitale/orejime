import {deepMerge} from './objects';

// @see https://github.com/TehShrike/deepmerge#example-usage
test('deepMerge', () => {
	const x = {
		foo: {
			bar: 3
		},
		array: [
			{
				does: 'work',
				too: [1, 2, 3]
			}
		]
	};

	const y = {
		foo: {
			baz: 4
		},
		quux: 5,
		array: [
			{
				does: 'work',
				too: [4, 5, 6]
			},
			{
				really: 'yes'
			}
		]
	};

	expect(deepMerge(x, y as object)).toEqual({
		foo: {
			bar: 3,
			baz: 4
		},
		array: [
			{
				does: 'work',
				too: [1, 2, 3]
			},
			{
				does: 'work',
				too: [4, 5, 6]
			},
			{
				really: 'yes'
			}
		],
		quux: 5
	});
});
