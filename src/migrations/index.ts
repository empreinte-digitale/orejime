import migrateV3 from './v3/index';

const form = document.querySelector('.MigrationForm--2-to-3');

form.addEventListener('submit', (event) => {
	event.preventDefault();

	const input = form.querySelector(
		'.MigrationForm-input'
	) as HTMLTextAreaElement;
	const output = form.querySelector('.MigrationForm-output') as HTMLPreElement;

	try {
		output.innerText = migrateV3(input.value);
	} catch (e) {
		output.innerHTML =
			e instanceof SyntaxError
				? `There seems to be a syntax error in your configuration:<br /><em>${e.message}</em>`
				: `Sorry, an error happened while migrating your configuration.<br /><em>${e.message}</em>`;
	}

	output.classList.remove('is-hidden');
});
