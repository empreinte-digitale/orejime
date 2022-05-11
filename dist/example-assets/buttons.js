document.querySelectorAll('[data-orejime-open]').forEach(function (trigger) {
	trigger.addEventListener('click', function () {
		window.orejime.show();
	});
});

document.querySelectorAll('[data-orejime-reset]').forEach(function (trigger) {
	trigger.addEventListener('click', function () {
		window.orejime.manager.clearConsents();
	});
});

document.querySelectorAll('[data-orejime-preload]').forEach(function (trigger) {
	trigger.addEventListener('focus', function () {
		window.orejime.preload();
	});
	trigger.addEventListener('mouseover', function () {
		window.orejime.preload();
	});
});
