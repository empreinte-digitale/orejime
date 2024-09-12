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

For inline scripts, set the `type` attribute to `opt-in` to keep the browser from executing the script. Also add a `data-name` attribute with a short, unique, spaceless name for this script:

```diff
- <script>
+ <script
+   type="opt-in"
+   data-type="application/javascript"
+   data-name="google-tag-manager">
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
+   data-name="google-maps"
+   data-src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

### Configuration

You need to pass Orejime 🍪 a configuration object with, at the very least, `purposes` and `privacyPolicy` properties. Each purpose listed in `purposes` must itself have at least `name`, `title` and `cookies`.

<details open>
    <summary>Here is a fully-detailed annotated example of a configuration object:</summary>
&nbsp;

```js
var orejimeConfig = {
    // Optional. You can customize the ID of the <div> that Orejime will create when starting up.
    // The generated <div> will be inserted at the beginning of the <body>.
    // If there is already a DOM element with this id, Orejime will use it instead of creating a new element.
    // defaults to "orejime".
    elementID: "orejime",

    // Optional. For accessibility's sake, the Orejime modal must know what is the element
    // containing your app or website. Orejime should *not* be in this element.
    // The idea is your DOM could look like this after Orejime is initialized:
    // <body>
    //      <div id="orejime">...</div>
    //      <div id="app">your actual website</div>
    // </body>
    //
    // It is highly recommended to set this option, even though it's not required.
    // defaults to undefined.
    appElement: "#app",

    // Optional. You can customize the name of the cookie that Orejime uses for storing
    // user consent decisions.
    // defaults to "orejime".
    cookieName: "orejime",

    // Optional. You can set a custom expiration time for the Orejime cookie, in days.
    // defaults to 365.
    cookieExpiresAfterDays: 365,

    // Optional. You can provide a custom domain for the Orejime cookie, for example to make it available on every associated subdomains.
    cookieDomain: 'mydomain.com',

    // Optional. You can provide a custom function to serialize the cookie contents.
    stringifyCookie: (contents) => JSON.stringify(contents),

    // Optional. You can provide a custom function to unserialize the cookie contents.
    parseCookie: (cookie) => JSON.parse(cookie),

    // You must provide a link to your privacy policy page
    privacyPolicy: "",

    // Optional. Purposes configured below will be ON by default if default=true.
    // defaults to true
    default: true,

    // Optional. If "mustConsent" is set to true, Orejime will directly display the consent
    // manager modal and not allow the user to close it before having actively
    // consented or declined the use of third-party purposes.
    // defaults to false
    mustConsent: false,

    // Optional. If "mustNotice" is set to true, Orejime will display the consent
    // notice and not allow the user to close it before having actively
    // consented or declined the use of third-party purposes.
    // Has no effect if mustConsent is set to true.
    // defaults to false
    mustNotice: false,

    // Optional. You can define the UI language directly here. If undefined, Orejime will
    // use the value given in the global "lang" variable, or fallback to the value
    // in the <html> lang attribute, or fallback to "en".
    lang: "en",

    // Optional. You can pass an image url to show in the notice.
    // If the image is not exclusively decorative, you can pass an object
    // with the image src and alt attributes: `logo: {src: '...', alt: '...'}`
    // defaults to false
    logo: false,

    // Optional. Set Orejime in debug mode to have a few stuff
    // logged in the console, like warning about missing translations.
    // defaults to false
    debug: false,

    // You can overwrite existing translations and add translations for your
    // purpose descriptions and purposes. See `src/translations.yml` for a full
    // list of translations that can be overwritten
    translations: {
        en: {
            consentModal: {
                description: "This is an example of how to override an existing translation already used by Orejime",
            },
            inlineTracker: {
                description: "Example of an inline tracking script",
            },
            externalTracker: {
                description: "Example of an external tracking script",
            },
            purposes: {
                analytics: "Analytics",
                security: "Security"
            },
            categories: {
                analytics: {
                    description: "A long form description of the category."
                }
            }
        },
    },

    // The list of third-party purposes that Orejime will manage for you.
    // The purposes will appear in the modal in the same order as defined here.
    purposes: [
        {
            // The name of the purpose, used internally by Orejime.
            // Each name should match a name of a <script> tag defined in the
            // "Changing your existing third-party scripts" documentation step.
            name: "google-tag-manager",

            // The title of you purpose as listed in the consent modal.
            title: "Google Tag Manager",

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

            // Optional. The purpose(s) of this purpose. Will be listed on the consent notice.
            // Do not forget to add translations for all purposes you list here.
            purposes: ["analytics"],

            // Optional. A callback function that will be called each time
            // the consent state for the purpose changes. Passes
            // the `purpose` config as the second parameter as well.
            callback: function(consent, purpose){
                // This is an example callback function.
                console.log("User consent for purpose " + purpose.name + ": consent=" + consent)
            },

            // Optional. If "required" is set to true, Orejime will not allow this purpose to
            // be disabled by the user.
            // See "Special cases" below for more information.
            // default to false
            required: false,

            // Optional. If "optOut" is set to true, Orejime will load this purpose
            // even before the user gave explicit consent.
            // We recommend always leaving this "false".
            // See "Special cases" below for more information.
            // defaults to false
            optOut: false,

            // Optional. If "default" is set to true, the purpose will be enabled by default
            // Overwrites the global "default" setting.
            // defaults to the value of the gobal "default" setting
            default: true,

            // Optional. If "onlyOnce" is set to true, the purpose will only be executed
            // once regardless how often the user toggles it on and off.
            // defaults to false
            onlyOnce: true,
        },
        {
            name: "inline-tracker",
            title: "Inline Tracker",
            purposes: ["analytics"],
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
            name: "external-tracker",
            title: "External Tracker",
            purposes: ["analytics", "security"],
            cookies: ["external-tracker"],
            required: true
        }
    ],
    // Optional. A list of categories under which purposes will be classified.
    // This allows for a visual grouping of the different purposes, along with a
    // description of their purpose.
    categories: [
        {
            name: "analytics",
            title: "Analytics",
            // The list of purposes belonging to the category, referenced by name.
            purposes: [
                "google-tag-manager",
                "external-tracker"
            ]
        }
    ]
}
```

</details>

#### Special cases

##### Exemption

If every purpose is either `required` or `optOut`, Orejime will not show at startup
(but it will still be possible to open it programmatically).
However, you should consider this use case carefully, and ensure that :
* `required` trackers are truly required for your app to function properly
* `optOut` trackers are exempt from consent, (i.e.
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

### Styling

#### CSS

Either replace the original CSS entirely, or add your custom stylesheet to overwrite only some of the rules.
For example:

```css
/* custom-style.css */
.orejime-Notice,
.orejime-Modal {
    background: pink;
    color: white;
}
```
```html
<link rel="stylesheet" href="orejime.css" />
<link rel="stylesheet" href="custom-style.css" />
```

#### Sass

You can import [the original Sass stylesheet](https://github.com/empreinte-digitale/orejime/blob/master/src/scss/orejime.scss) into your own, and tweak it as you wish.
Orejime provides default variables that you can overwrite to quickly change its appearance.
For example:

```scss
$orejime-theme-bg: pink;
$orejime-theme-color: white;

@import "~orejime/src/scss/orejime.scss"
```

## API

* `Orejime.init(config)`: creates a new Orejime instance with the given config object
* `Orejime.defaultConfig`: object containing all the default properties of an instance

### Orejime instance

* `show()`: show the consent modal
* `internals.react`: the React app used internally. See `src/components/Main.ts`
* `internals.manager`: the ConsentManager instance used. See `src/ConsentManager.ts`
* `internals.config`: the complete config object used

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
