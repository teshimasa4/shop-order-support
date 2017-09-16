'use strict';

var dbModule = {
		name : 'shop-order-suport-db',
		version : 1.0,
		db : null,
		storeName : 'order'
};


dbModule.init = function() {
	console.log('[indexedDB] init');
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

	if (indexedDB) {

		var openRequest = indexedDB.open(dbModule.name, dbModule.version);

		openRequest.onupgradeneeded = function(event) {
			console.log('[indexedDB] upgrade');

			var db = event.target.result;
			db.createObjectStore(dbModule.storeName, { autoIncrement: true});
		};

		openRequest.onsuccess = function(event) {
			console.log('[indexedDB] open success');
			dbModule.db = (event.target) ? event.target.result : event.result;
		};

		openRequest.onerror = function(event){
			console.log('[indexedDB] open error');
		}

	} else {
		window.alert("このブラウザではIndexed DataBase API は使えません。");
	}
};

dbModule.add = function(order) {
	console.log('[indexedDB] add');
	console.log(order);

	var db = dbModule.db;
	var transaction = db.transaction([dbModule.storeName], "readwrite");
	var store = transaction.objectStore(dbModule.storeName);
	var request = store.add(order);

	request.onsuccess = function () {
		console.log('[indexedDB] add success');
	};

	request.onerror = function () {
		console.log('[indexedDB] add error');
	};
};

(function() {
	dbModule.init();
})();