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
