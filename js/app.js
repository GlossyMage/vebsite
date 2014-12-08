'use strict';

angular.module('myApp', [
	'ngRoute',
	'myApp.controllers',
	'ngResource',
]).
config(['$routeProvider', function($routeProvider, RestangularProvider) {
	$routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'MainCtrl'});
	$routeProvider.when('/flashcards', {templateUrl: 'partials/flashcards.html', controller: 'FlashCtrl'});

	$routeProvider.otherwise({redirectTo: '/main'});
}]);
