import {template} from './template';

describe('template', () => {
	test('no vars', () => {
		expect(template('Bears eat beets', {})).toEqual(['Bears eat beets']);
	});

	test('no match', () => {
		expect(template('Bears eat {beets}', {})).toEqual([
			'Bears eat ',
			'beets'
		]);
	});

	test('vars', () => {
		expect(
			template('{animal} eat {thing}', {
				animal: 'Black bear',
				thing: 'Battlestar Galactica'
			})
		).toEqual(['Black bear', ' eat ', 'Battlestar Galactica']);
	});

	// This is here to document the fact that the current
	// implementation breaks if some text is exactly the same
	// as one of the variable names
	test('edge case', () => {
		expect(template('thing{thing}', {})).toEqual(['thing', 'thing']);

		expect(template('thing{thing}', {thing: 'Battlestar Galactica'})).toEqual(
			['Battlestar Galactica', 'Battlestar Galactica']
		);
	});
});
