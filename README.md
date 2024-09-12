# Orejime 🍪

> Let your users choose the cookies they eat on your website.
> Orejime 🍪 is an easy to use consent manager that focuses on accessibility.

## Introduction

Orejime 🍪 is an open-source JavaScript library you can use on your website to let users choose what third-party cookies they allow. It's specifically made to comply with the GDPR.

Orejime 🍪 is a fork of [Klaro!](https://github.com/KIProtect/klaro) that focuses on **accessibility**. It follows Web Content Accessibility Guidelines (WCAG) via the French <abbr lang="fr" title="Référentiel général d'accessibilité pour les administrations">RGAA</abbr>.

## Getting started

Using Orejime 🍪 requires a few steps:

1.  [Installation](#installation)
1.  [Third-party script tags change](#third-party-script-tags-change)
1.  [Configuration](#configuration)
1.  [Initialization](#initialization)

### Installation

#### Via CDN

The easiest way to use the lib is to include the built files directly in the browser.

```html
<link rel="stylesheet" href="https://unpkg.com/orejime@latest/dist/orejime.css" />
<script src="https://unpkg.com/orejime@latest/dist/orejime.js"></script>
```

If you're using this method, please avoid using the `@latest` version. Prefer a fixed one like `https://unpkg.com/orejime@2.0.1/...`.
That way you can ensure you will not be impacted by a change of API or a potential bug that could land in the latest version.

#### Via npm

Orejime 🍪 is a React lib. Make sure you already installed react and react-dom, then:

```
npm install orejime
```

The CSS is located in `node_modules/orejime/dist/orejime.css`. Import it directly in your JS thanks to webpack, or install it any way you are used to in your project.
You can also directly consume the Sass file if you prefer, located in the same folder.

Note: if you don't have a React environment but still want to use npm in order to easily get the latest version of Orejime, the already-built JS file is located in `node_modules/orejime/dist/orejime.js`.

#### Old browser support

For IE11, you'll need to have ES6 polyfills loaded on your page. One easy and efficient way to add such polyfills is to use [polyfill.io](https://polyfill.io/v2/docs/).

### Third-party script tags change

For each third-party script you want Orejime to manage, you must modify its `<script>` tag so that the browser doesn't load it directly anymore. Orejime will take care of loading it if the user accepts.

For inline scripts, set the `type` attribute to `opt-in` to keep the browser from executing the script. Also add a `data-purpose` attribute with a short, unique, spaceless name for this script:

```diff
- <script>
+ <script
+   type="opt-in"
+   data-type="application/javascript"
+   data-purpose="google-tag-manager">
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push [...]
</script>
```

For external scripts or img tags (for tracking pixels), do the same, and rename the `src` attribute to `data-src`:

```diff
- <script
-   src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
+ <script
+   type="opt-in"
+   data-type="application/javascript"
+   data-purpose="google-maps"
+   data-src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

### Configuration

You need to pass Orejime 🍪 a configuration object with, at the very least, `purposes` and `privacyPolicyUrl` properties. Each purpose listed in `purposes` must itself have at least `id`, `title` and `cookies`.

<details>
    <summary>Here is a fully-detailed annotated example of a configuration object:</summary>
&nbsp;

```js
var orejimeConfig = {
    // Optional. You can customize the element that will contain Orejime (either
    // a selector or a DOM element).
    // It no element matches, an element will be created and inserted at the
    // beginning of the <body>.
    orejimeElement: "#orejime",

    // Optional.
    cookie: {
        // Optional. You can customize the name of the cookie that Orejime uses for storing
        // user consent decisions.
        // defaults to "orejime".
        name: "orejime",

        // Optional. You can set a custom expiration time for the Orejime cookie, in days.
        // defaults to 365.
        duration: 365,

        // Optional. You can provide a custom domain for the Orejime cookie, for example to make it available on every associated subdomains.
        domain: 'mydomain.com',

        // Optional. You can provide a custom function to serialize the cookie contents.
        stringify: (contents) => JSON.stringify(contents),

        // Optional. You can provide a custom function to unserialize the cookie contents.
        parse: (cookie) => JSON.parse(cookie),
    },

    // You must provide a link to your privacy policy page
    privacyPolicyUrl: "",

    // Optional. If `forceModal` is set to true, Orejime will directly display
    // the consent modal and not allow the user to close it before having actively
    // consented or declined the use of third-party purposes.
    // defaults to false
    forceModal: false,

    // Optional. If `forceBanner` is set to true, Orejime will display the consent
    // notice and not allow the user to close it before having actively consented
    // or declined the use of third-party purposes.
    // Has no effect if `forceModal` is set to true.
    // defaults to false
    forceBanner: false,

    // Optional. You can define the UI language directly here. If undefined, Orejime will
    // use the value given in the global "lang" variable, or fallback to the value
    // in the <html> lang attribute, or fallback to "en".
    lang: "en",

    // Optional. You can pass an image url to show in the notice.
    // If the image is not exclusively decorative, you can pass an object
    // with the image `src` and `alt` attributes: `logo: {src: '...', alt: '...'}`
    logo: '/img/logo.png',

    // Optional. The theme used to render the UI (See the "theming" section below).
    // If unset, this will default to "orejime", the classic built-in UI.
    theme: 'orejime',

    // You can overwrite existing translations and add translations for your
    // purpose descriptions and purposes. See `src/translations` for a full
    // list of translations that can be overwritten
    translations: {
        modal: {
            description: "This is an example of how to override an existing translation already used by Orejime",
        }
    },

    // The list of third-party purposes that Orejime will manage for you.
    // The purposes will appear in the modal in the same order as defined here.
    purposes: [
        {
            // The id of the purpose, used internally by Orejime.
            // Each id should match the `data-purpose` attribute of a <script>
            // tag defined in the "Changing your existing third-party scripts"
            // documentation step.
            id: "google-tag-manager",

            // The title of you purpose as listed in the consent modal.
            title: "Google Tag Manager",

            // Optional. The description of you purpose as listed in the consent modal.
            description: "This is used for analytics.",

            // A list of regex expressions, strings, or arrays, giving the names of
            // cookies set by this purpose. If the user withdraws consent for a
            // given purpose, Orejime will then automatically delete all matching
            // cookies.
            //
            // See a different example below with the inline-tracker purpose
            // to see how to define cookies set on different path or domains.
            cookies: [
                "_ga",
                "_gat",
                "_gid",
                "__utma",
                "__utmb",
                "__utmc",
                "__utmt",
                "__utmz",
                "_gat_gtag_" + GTM_UA,
                "_gat_" + GTM_UA
            ],

            // Optional. If "isMandatory" is set to true, Orejime will not allow this purpose to
            // be disabled by the user.
            // See "Special cases" below for more information.
            // default to false
            isMandatory: false,

            // Optional. If `isExempt` is set to true, Orejime will load this purpose
            // even before the user gave explicit consent.
            // We recommend always leaving this "false".
            // See "Special cases" below for more information.
            // defaults to false
            isExempt: false,

            // Optional. If "default" is set to true, the purpose will be enabled by default
            // defaults to false.
            default: false,

            // Optional. If "runsOnce" is set to true, the purpose will only be executed
            // once regardless how often the user toggles it on and off.
            // defaults to false
            runsOnce: true,
        },
        {
            id: "inline-tracker",
            title: "Inline Tracker",
            description: "Example of an inline tracking script",
            cookies: [
                "inline-tracker"
                // When deleting a cookie, Orejime will try to delete a cookie with the given name,
                // the "/" path, and multiple domains (the current domain and `"." + current domain`).
                // If an app sets a cookie on a different path or domain than that, Orejime won't be
                // able to delete it by itself without more info.
                // In this case, you can explicitely define a cookie, a path and domain:
                ["cookieName", "/blog", "." + location.hostname],
                ["cookieName", "/", "test.mydomain.com"],
            ]
        },
        {
            id: "external-tracker",
            title: "External Tracker",
            description: "Example of an external tracking script",
            cookies: ["external-tracker"],
            isMandatory: true
        },

        // Purposes can also be grouped
        {
            id: "advertising",
            title: "Advertising",
            description: "…",
            purposes: [
                {
                    id: "foo",
                    title: "Foo",
                    cookies: []
                },
                {
                    id: "bar",
                    title: "Bar",
                    cookies: []
                }
            ]
        }
    ]
}
```

</details>

#### Special cases

##### Exemption

If every purpose is either `isMandatory` or `isExempt`, Orejime will not show at startup
(but it will still be possible to open it programmatically).
However, you should consider this use case carefully, and ensure that :
* `isMandatory` trackers are truly required for your app to function properly
* `isExempt` trackers are exempt from consent, (i.e.
[as defined by the CNIL](https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience))

### Initialization

Now that you included the JS, the CSS, configured existing third-party scripts and defined your configuration, you can initialize an instance. This can be done automatically or manually.

#### Automatically

When including the script, the lib checks if the `window.orejimeConfig` variable exists. If it does, a new Orejime instance is created in `window.orejime`.

:warning: **Note : Orejime doesn't have this behavior when using it as a module.**

#### Manually

```js
// if using Orejime in a module context:
// var Orejime = require('orejime');

Orejime.init(orejimeConfig);
```

#### As a module

If you're using Orejime within a bundler like webpack or vite, you have to provide actual themes and translations. This allows the bundler to perform better tree shaking as dependencies are explicitly stated.

For example, with the `orejime` theme and english translations:

```ts
import {orejime, orejimeTheme, en} from 'orejime';

const instance = orejime({
    lang: 'en',
    translations: en,
    theme: orejimeTheme,
    privacyPolicyUrl: 'http://example.org/privacy-policy',
    purposes: [{
        id: 'analytics',
        title: 'Analytics',
        cookies: []
    }]
})
```

If you want full control over the UI, you might want to use only the [consent manager](`./src/core/Manager.ts`), which is the core of Orejime. You can then use it with vanilla JS or your framework of choice.

```ts
import {manager} from 'orejime';

const instance = manager([
    {
        id: 'analytics',
        title: 'Analytics',
        cookies: []
    }
]);

console.log(instance.getConsent('analytics')); // false
instance.setConsent('analytics', true);
console.log(instance.getConsent('analytics')); // true
```

### Theming

Orejime support multiple themes to accomodate for every situation.

#### Default theme

This theme is loaded by default. It is meant to be simple but elegant enough to be used as-is on any website. It is easily customizable by tweaking some CSS properties.

Of course, you can either replace the original CSS entirely, or add your custom stylesheet to overwrite only some of the rules.

```css
/* custom-style.css */
.orejime-Env {
    --orejime-font-family: monospace;
    --orejime-background: black;
    --orejime-color: yellow;
}
```

```html
<link rel="stylesheet" href="orejime.css" />
<link rel="stylesheet" href="custom-style.css" />
```

#### DSFR theme

This theme is meant to be used on websites using the official design system of the french government. As those sites already include the DSFR styles, this theme does not provide any styles of its own but only makes use of the correct markup and class names.

See the [consent manager component](https://www.systeme-de-design.gouv.fr/composants-et-modeles/composants/gestionnaire-de-consentement) on the DSFR docs for an overview.

## API

* `Orejime.init(config)`: creates a new Orejime instance with the given config object
* `Orejime.defaultConfig`: object containing all the default properties of an instance

### Orejime instance

* `prompt()`: opens the consent modal
* `manager`: the Manager instance used. See `src/core/Manager.ts`
* `config`: the complete config object used

## Development

If you want to contribute to Orejime, or make a special build for yourself, clone the project then:

```
npm install
npm start
```

You can then open the demo page on `http://localhost:3000` - it will be reloaded automatically when the JS or CSS changes.

## License & credits

This project is licensed under a BSD-3 license.

Orejime started as a fork of [Klaro!](https://github.com/KIProtect/klaro). A lot of stuff changed since. A few were integrated in the original project, but eventually some big bricks changed and it became difficult, or sometimes not even necessary, to push those changes in.

Orejime is maintained by [<span lang="fr">Empreinte Digitale</span>  (French)](http://empreintedigitale.fr).

### What does "Orejime" mean?

"Orejime" is a play-on-word. You can pronounce it like "Au régime" in French, which means "on a diet". 🍪
