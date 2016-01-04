// Create our Application
var app = Marionette.Application.extend({
	initialize: function(options) {
		console.log('My container:', options.container);
	}
});

// Start history when our application is ready
app.on('start', function() {
  Backbone.history.start();
});

// Load some initial data, and then start our application
loadInitialData().then(app.start);

function loadInitialData() {
	var defer = $.Deferred();	
	console.log('load initial data');
	return defer.resolve('resolving!');
}