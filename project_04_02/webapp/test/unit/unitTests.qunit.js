/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sync/project_04_02/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
