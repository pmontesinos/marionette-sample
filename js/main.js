// Create our Application
var MarApp = Marionette.Application.extend({
	initialize: function(options) {
		console.log('My container:', options.container);
	}
});

var app = new MarApp({container: '#app'});

app.module('Module', function(module, app, Backbone, Marionette, $, _) {

	module.ProfileItem = Backbone.Model.extend({
		defaults: {
			inputName: null,
			label: null
		}
	});


	module.ProfileItems = Backbone.Collection.extend({
		model: module.ProfileItem
	});


	module.ProfileItemView = Marionette.ItemView.extend({
		tagName: 'li',
		template: '#template-profile-item',
		events: {
			'click label': 'labelClick',
			'click input': 'inputClick'
		},

		initialize: function() {
			console.log('initializing ProfileItemView');
		},

		labelClick: function() {
			console.log('clicked the label');
		},

		inputClick: function() {
			console.log('clicked the input');
		}
	});


	module.ProfileListView = Marionette.CollectionView.extend({
		childView: module.ProfileItemView,
		tagName: 'ul',
		className: 'no-bullet',

		initialize: function( options ) {
			this.collection = options.collection;
			console.log('initializing ProfileListView');

		},
	});


	module.CardView = Marionette.ItemView.extend({
		template: '#template-card',
		events: {
			'click .button': 'buttonClick'
		},

		buttonClick: function() {
			console.log('card button clicked');
		}
	});

	module.StoreView = Marionette.ItemView.extend({
		template: '#template-store',
	});

	

	module.RootView = Backbone.Marionette.LayoutView.extend({
		el: '#dashboard',
		template: false,

		regions: {
			profile: '.profile-section',
			card: '.card-section',
			store: '.store-details'
		},

		initialize: function() {
			this.profileItems = new module.ProfileItems();
			this.profileItems.add([
				{
					inputName: 'firstname',
					label: 'First Name'
				},
				{
					inputName: 'zip',
					label: 'Zip Code'
				}
			]);
		},

		 onRender: function() {
			this.getRegion('profile').show(new module.ProfileListView({collection: this.profileItems}));
			this.getRegion('card').show(new module.CardView());
			this.getRegion('store').show(new module.StoreView());
		},

		 onShow: function(){
			console.log('showing layoutview');
		}

	});

	module.addInitializer(function() {
		var rootView = new module.RootView();
		rootView.render();
	});
});



// Start history when our application is ready
app.on('start', function() {
	Backbone.history.start();

});

// Load some initial data, and then start our application
//loadInitialData().then(app.start);

app.start();

function loadInitialData() {
	var defer = $.Deferred();	
	console.log('load initial data');
	return defer.resolve('resolving!');
}