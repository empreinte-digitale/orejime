import cleanDeep from 'clean-deep';
import {Config, Purpose, PurposeList} from '../../ui';
import {V2App, V2Category, V2Config, V2Translations} from '../v2/types';

const migrateApp = (
	app: V2App,
	translations: Partial<V2Translations>
): Purpose => ({
	id: app?.name,
	title: translations?.[app?.name]?.title ?? app?.title,
	description: translations?.[app?.name]?.description ?? app?.description,
	cookies: app?.cookies,
	default: app?.default,
	isMandatory: app?.required,
	runsOnce: app?.onlyOnce
});

const migrateApps = (
	apps: V2App[],
	categories: V2Category[],
	translations: Partial<V2Translations>
): PurposeList => {
	const purposes = apps.map((app) => migrateApp(app, translations));

	if (!categories) {
		return purposes as PurposeList;
	}

	return categories.reduce((p, category) => {
		return [
			{
				id: category?.name,
				title:
					translations?.categories?.[category?.name]?.title ??
					category?.title,
				description:
					translations?.categories?.[category?.name]?.description ??
					category?.description,
				purposes: category.apps.map((name) =>
					migrateApp(
						apps.find((app) => app.name === name),
						translations
					)
				)
			},
			...p.filter((purpose) => !category.apps.includes(purpose.id))
		] as PurposeList;
	}, purposes as PurposeList);
};

export const migrateConfig = (config: Partial<V2Config>): Partial<Config> =>
	cleanDeep({
		orejimeElement: config?.elementID,
		lang: config?.lang,
		logo:
			config?.logo && typeof config.logo !== 'boolean'
				? config.logo
				: undefined,
		forceModal: config?.mustConsent,
		forceBanner: config?.mustNotice,
		privacyPolicyUrl: config?.privacyPolicy,
		cookie: {
			name: config?.cookieName,
			domain: config?.cookieDomain,
			duration: config?.cookieExpiresAfterDays,
			parse: config?.parseCookie,
			stringify: config?.stringifyCookie
		},
		purposes:
			'apps' in config
				? migrateApps(config.apps, config.categories, config.translations)
				: undefined
	});
