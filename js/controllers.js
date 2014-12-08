'use strict';

angular.module('myApp.controllers', [])
.controller('MainCtrl', function ($scope) {
	$scope.hello = "World";







})

.controller('FlashCtrl', function ($scope) {

	// Array Remove - authored by John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	}

	$scope.flashcards = [];		

	$scope.findHighestId = function() {
		var id = 0;
		
		for (var i = 0; i < $scope.flashcards.length; i++) {
			if (id < $scope.flashcards[i].id) {
				id = $scope.flashcards[i].id;
			}
		}

		return id;
	};

	$scope.selectedFlashcard = null;	

	$scope.flashcardClicked = function(flashcard) {
		$scope.selectedFlashcard = flashcard;
	};

	$scope.createFlashcard = function() {
		var newFlashcard = {
			'id': $scope.findHighestId()+1,
			'name': 'New flashcard',
			'front': '',
			'back': ''
		};

		$scope.flashcards.push(newFlashcard);
	};

	$scope.deleteFlashcard = function() {
		if ($scope.selectedFlashcard == null) {
			return;
		}
		var index = $scope.flashcards.indexOf($scope.selectedFlashcard);
		$scope.flashcards.remove(index);
		$scope.selectedFlashcard = index > 0 ? $scope.flashcards[index-1] : $scope.flashcards[index];
	};

});
