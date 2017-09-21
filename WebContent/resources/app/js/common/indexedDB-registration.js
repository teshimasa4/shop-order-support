'use strict';

var dbModule = {
		name : 'shop-order-suport-db',
		version : 1.0,
		db : null,
		storeName : 'order'
};


dbModule.init = function() {
	console.log('[indexedDB] init');
	var defer = $.Deferred();
	var indexedDB = window.indexedDB || window.mozIndexedDB || window.msIndexedDB;

	if (indexedDB) {

		var openRequest = indexedDB.open(dbModule.name, dbModule.version);

		openRequest.onupgradeneeded = function(event) {
			console.log('[indexedDB] upgrade');

			var db = event.target.result;
			var store = db.createObjectStore(dbModule.storeName, { keyPath: 'id', autoIncrement: true});
			store.createIndex('order_date', ['user_cd', 'shop_cd', 'order_date'], { unique: false });
		};

		openRequest.onsuccess = function(event) {
			console.log('[indexedDB] open success');
			dbModule.db = (event.target) ? event.target.result : event.result;
			defer.resolve();
		};

		openRequest.onerror = function(event){
			console.log('[indexedDB] open error');
			defer.reject();
		}

	} else {
		window.alert('このブラウザではIndexed DataBase API は使えません。');
		defer.reject();
	}

	return defer.promise();
};

dbModule.add = function(order) {
	console.log('[indexedDB] add');
	console.log(order);

	var transaction = dbModule.db.transaction([dbModule.storeName], 'readwrite');
	var store = transaction.objectStore(dbModule.storeName);
	var request = store.add(order);

	request.onsuccess = function () {
		console.log('[indexedDB] add success');
	};

	request.onerror = function () {
		console.log('[indexedDB] add error');
	};
};

dbModule.getByOrderDate = function(userCd, shopCd, orderDate) {
	console.log('[indexedDB] getByOrderDate(' + orderDate + '[' + userCd + '][' + shopCd + ']' );
	var defer = $.Deferred();

	var transaction = dbModule.db.transaction([dbModule.storeName], 'readonly');
	var store = transaction.objectStore(dbModule.storeName);
	var request = store.index('order_date').openCursor([userCd, shopCd, orderDate]);

	var result = [];

	request.onsuccess = function(event) {
		var cursor = event.target.result;
	    if (cursor) {
	        result.push(cursor.value);
	        cursor.continue();
	    } else {
	    	defer.resolve(result);
	    }
	};

	request.onerror  = function(event) {
		console.log(request.error);
	};

	return defer.promise();
};
