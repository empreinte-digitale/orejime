import updatePurposeElements from './updatePurposeElements';

test('updatePurposeElements', () => {
	document.body.innerHTML = `
		<script id="foo" data-purpose="foo" data-type="type" data-src="src"></script>
	`;

	updatePurposeElements('foo', true);
	const foo = document.getElementById('foo');

	expect(foo.hasAttribute('data-type')).toBeFalsy();
	expect(foo.hasAttribute('data-src')).toBeFalsy();
	expect(foo.getAttribute('type')).toEqual('type');
	expect(foo.getAttribute('src')).toEqual('src');

	updatePurposeElements('foo', false);
	const foo2 = document.getElementById('foo');

	expect(foo2.hasAttribute('type')).toBeFalsy();
	expect(foo2.hasAttribute('src')).toBeFalsy();
	expect(foo2.getAttribute('data-type')).toEqual('type');
	expect(foo2.getAttribute('data-src')).toEqual('src');
});
