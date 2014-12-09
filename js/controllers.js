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
		var id = $scope.findHighestId()+1;
		var newFlashcard = {
			'id': id,
			'name': 'New flashcard ' + id,
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

})

/*angular.module('ui.bootstrap.modal')*/.controller('ModalCtrl', function($scope, $modal) {
	
	$scope.open = function() {
		if ($scope.flashcards.length < 1) {
			alert("Make some flashcards first.");
			return;
		};

		console.log(Math.random() * $scope.flashcards.length);

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

	$scope.close = function() {
		console.log("Flashcards: " + JSON.stringify($scope.flashcards));
		$modalInstance.dismiss();
	}
});
