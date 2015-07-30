/* global require */
'use strict';

var Loadification = require('loadification');

function init() {
	var loadItems = document.querySelectorAll('.load-item');

	for (var i = 0; i < loadItems.length; i++) {
		var item = loadItems[i];
		var loadification = new Loadification(item);
		console.log('Element height before load: ' + item.getBoundingClientRect().height + 'px');
		loadification.listen(handleLoad, handleError);
	}
}

function handleLoad(loadification, event) {
	console.log('Element height after load: ' + loadification.domElement.getBoundingClientRect().height + 'px');
}

function handleError(loadification, event) {
	console.log('Loadification error for load item', loadification.domElement);
}

init();
