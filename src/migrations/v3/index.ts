import {Translations} from '../../ui';
import {parse, stringify} from '../serialization';
import {migrateConfig} from './config';
import {migrateTranslations} from './translations';

export default (code: string) => {
	const v2Config = parse(code);
	const v3Config = migrateConfig(v2Config);
	const v2Translations = v2Config?.translations ?? {};
	const translationsEntries: [
		string,
		Partial<Translations>
	][] = Object.entries(v2Translations).map(([lang, translations]) => [
		lang,
		migrateTranslations(translations)
	]);

	switch (translationsEntries.length) {
		case 0:
			return stringify(v3Config);

		// adds the only language defined to the config
		case 1:
			return stringify({
				...v3Config,
				translations: translationsEntries[0][1]
			});

		// defines a map of translations, and adds one of them
		// to the config at runtime, depending on the current
		// language.
		default: {
			const lang = v2Config?.lang ?? translationsEntries[0][0];
			const translations = Object.fromEntries(translationsEntries);
			const placeholder = Symbol();
			v3Config.translations = (placeholder as never) as Translations;

			return (
				`// replace this with the current language of the page\n` +
				`var lang = "${lang}";\n\n` +
				`var translations = ${stringify(translations)};\n\n` +
				`var config = ${stringify(v3Config, {
					namespace: new Map([
						[
							placeholder,
							'translations[lang] // uses translations for the current language'
						]
					])
				})};\n`
			);
		}
	}
};
