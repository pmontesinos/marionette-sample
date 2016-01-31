// Create our Application
var MarApp = Marionette.Application.extend({
	initialize: function(options) {
		console.log('My container:', options.container);
	}
});

var app = new MarApp({container: '#app'});

app.module('Module', function(module, app, Backbone, Marionette, $, _, Radio, Service) {

	/*module.FirstService = Service.extend({
		radioEvents: {

		},

	});*/

	var cardChannel = Radio.channel('card');

	cardChannel.on('card:click', function(str) {
		return str;
	}, this);

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

		ui: {
			label: 'label',
			input: 'input'
		},

		events: {
			'click @ui.label': 'labelClick',
			'click @ui.input': 'inputClick'
		},

		initialize: function() {
			console.log('initializing ProfileItemView');
			this.listenTo(cardChannel, 'card:click', function(testStr) {
				this.ui.input.val(testStr);
			});
		},

		labelClick: function() {
			console.log('clicked the label');
		},

		inputClick: function() {
			console.log('clicked the input');
		},

		fillInput: function(str) {
			this.ui.input.val(str);
		},

		onAttach: function() {
			console.log('onAttach ProfileItemView');
		},
		 
		onRender: function() {
			console.log('onRender ProfileItemView');
		},

		 onShow: function(){
			console.log('onShow ProfileItemView');
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

		onAttach: function() {
			console.log('onAttach ProfileListView');
		},
		 
		onRender: function() {
			console.log('onRender ProfileListView');
		},

		onShow: function(){
			console.log('onShow ProfileListView');
		}
	});


	module.CardView = Marionette.ItemView.extend({
		template: '#template-card',

		ui: {
			button: '.button'
		},

		events: {
			'click @ui.button': 'buttonClick'
		},

		buttonClick: function(e) {
			e.preventDefault();
			console.log('card button clicked');
			cardChannel.trigger('card:click', 'CardView has been clicked, yo');
		},

		onAttach: function() {
			console.log('onAttach CardView');
		},
		 
		onRender: function() {
			console.log('onRender CardView');
		},

		onShow: function(){
			console.log('onShow CardView');
		}
	});

	module.StoreView = Marionette.ItemView.extend({
		template: '#template-store',

		onAttach: function() {
			console.log('onAttach StoreView');
		},
		 
		onRender: function() {
			console.log('onRender StoreView');
		},

		onShow: function(){
			console.log('onShow StoreView');
		}
	});

	module.ProfileView = Backbone.Marionette.LayoutView.extend({
		el: '.profile-section',
		template: false,

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

		onShow: function() {
			//this.addRegion('profile-list', '.profile-list');
			//this.addRegion('profile-alert', '.profile-alert');
			//this.getRegion('profile-list').showChildView('profile-list', new module.ProfileListView({collection: this.profileItems}));
			//this.getRegion('profile-alert').show(new module.ProfileAlertView());
		}

		
	});

	module.ProfileAlertView = Backbone.Marionette.ItemView.extend({
		className: 'alert',
		template: false
	});

	module.RootView = Backbone.Marionette.LayoutView.extend({
		el: '#dashboard',
		template: false,

		regions: {
			profile: '.profile-section',
			card: '.card-section',
			store: '.store-details'
		},

		onAttach: function() {
			console.log('onAttach layoutview');
			this.getRegion('profile').show(new module.ProfileView());
			this.getRegion('card').show(new module.CardView());
			this.getRegion('store').show(new module.StoreView());
		},
		 
		onRender: function() {
			console.log('onRender layoutview');
		},

		 onShow: function(){
			console.log('onShow layoutview');
			
		}

	});

	module.addInitializer(function() {
		var rootView = new module.RootView();
		rootView.render();
	});
}, Backbone.Radio, Mn.Service);



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