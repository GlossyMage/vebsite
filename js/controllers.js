'use strict';

angular.module('myApp.controllers', [])
.controller('MainCtrl', function ($scope, $location) {

	$scope.state = 1;
	$scope.place = "Main page";

	$scope.examineTable = function() {
		$scope.state = 2;
		$scope.place = "A table in the corner";
	};

	$scope.flashcards = function() {
		$location.path("/flashcards");
	};

	$scope.goBack = function() {
		$scope.state = 1;
		$scope.place = "Main page";
	};
})

.controller('FlashCtrl', function ($scope, $location) {

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
		var id = $scope.findHighestId()+1;
		var newFlashcard = {
			'id': id,
			'name': 'New flashcard ' + id,
			'front': '',
			'back': '',
			'answer': ''
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

	$scope.mainPage = function() {
		$location.path("/");
	}
})

.controller('ModalCtrl', function($scope, $modal) {
	
	$scope.open = function() {
		if ($scope.flashcards.length < 1) {
			alert("Make some flashcards first.");
			return;
		};

		for (var i = 0; i < $scope.flashcards.length; i++) {
			if ($scope.flashcards[i].name === '' || $scope.flashcards[i].front === '' || $scope.flashcards[i].back === '') {
				alert("It seems at least one of your flashcards has one or more empty fields. Might want to fix that.");
				return;
			}
		}

		$scope.selectedFlashcard = $scope.flashcards[Math.floor((Math.random() * $scope.flashcards.length))];

		var modalInstance = $modal.open({
			templateUrl: 'flashmodalcontent.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				flashcards: function() {
					return $scope.flashcards;
				},
				selectedFlashcard: function() {
					return $scope.selectedFlashcard;
				}
			}
		});
	};
})

.controller('ModalInstanceCtrl', function($scope, $modalInstance, flashcards, selectedFlashcard) {

	$scope.flashcards = flashcards;
	$scope.selectedFlashcard = selectedFlashcard;
	$scope.stage = 1;
	$scope.success = false;
	$scope.answers = 0;
	$scope.correctAnswers = 0;
	$scope.lastHundredAnswers = [];

	$scope.submit = function() {
		if ($scope.lastTwentyAnswers.length >= 100) {
			$scope.lastTwentyAnswers.remove(-1);
		}
		if ($scope.selectedFlashcard.answer === $scope.selectedFlashcard.back) {
			$scope.success = true;
			$scope.correctAnswers++;
		} else {
			$scope.success = false;
		}

		$scope.lastTwentyAnswers.unshift($scope.success);
		$scope.selectedFlashcard.answer = "";
		$scope.answers++;
		
		$scope.stage = 2;
	}

	$scope.suffixPercentCorrect = function(limit) {
		var max = limit < $scope.lastHundredAnswers.length ? limit : $scope.lastHundredAnswers.length;
		var correct = 0;
		
		for (var i = 0; i < max; i++) {
			if ($scope.lastHundredAnswers[i]) {
				correct++;
			}
		}

		return (correct / max) * 100;
	}

	$scope.again = function() {
		$scope.stage = 1;
		$scope.selectedFlashcard = $scope.flashcards[Math.floor((Math.random() * $scope.flashcards.length))];
	}

	$scope.close = function() {
		$modalInstance.dismiss();
	}
});
