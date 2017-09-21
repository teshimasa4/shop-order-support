'use strict';

var app = {
		constants: {
			root_url: '/shop-order-support'
		},
		utils: {
			date: {}
		}
};

app.utils.date.today = function() {
	return app.utils.date.format(new Date(), 'YYYY/MM/DD');
};

app.utils.date.format = function(date, format) {
	return moment(date).format(format);
};

