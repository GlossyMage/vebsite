'use strict';

angular.module('myApp', [
	'ngRoute',
	'myApp.controllers',
	'ui.bootstrap',
	'ui.bootstrap.modal',
	'ngResource'
]).
config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
	$routeProvider.when('/main', {redirectTo: '/'});
	$routeProvider.when('/flashcards', {templateUrl: 'partials/flashcards.html', controller: 'FlashCtrl'});
	$routeProvider.when('/404', {templateUrl: 'partials/error404.html', controller: 'MainCtrl'});
	$routeProvider.otherwise({redirectTo: '/404'});

	$locationProvider.html5Mode(true);
});
