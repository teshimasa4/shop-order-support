'use strict';

var module = {
  dbName : 'shop-order-suport-db',
  dbVersion : 1.0,
  db : null,
  dbStoreName : 'order'
};


module.init = function() {
	console.log('[indexedDB] init');
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

	if (indexedDB) {

		var openRequest = indexedDB.open(module.dbName, module.dbVersion);

		openRequest.onupgradeneeded = function(event) {
			console.log('[indexedDB] upgrade');

			var db = event.target.result;
			db.createObjectStore(module.dbStoreName, { autoIncrement: true});
		};

		openRequest.onsuccess = function(event) {
			console.log('[indexedDB] open success');
			module.db = (event.target) ? event.target.result : event.result;
		};

		openRequest.onerror = function(event){
			console.log('[indexedDB] open error');
		}

	} else {
		window.alert("このブラウザではIndexed DataBase API は使えません。");
	}
};

module.add = function(order) {
	console.log('[indexedDB] add');
	console.log(order);

	var db = module.db;
	var transaction = db.transaction([module.dbStoreName], "readwrite");
	var store = transaction.objectStore(module.dbStoreName);
	var request = store.put(order);

	request.onsuccess = function () {
		console.log('[indexedDB] add success');
	};

	request.onerror = function () {
		console.log('[indexedDB] add error');
	};
};

(function() {
	module.init();
})();