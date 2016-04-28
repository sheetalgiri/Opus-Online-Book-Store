var booklistControllers=angular.module('booklistControllers',[]);

booklistControllers.controller('BookListCtrl',['$scope','$http',
	function($scope,$http){
		$http.get('/api/books').success(function(books){
			$scope.books=books;
		})
	  	$scope.orderProp='age';
	}
]);

booklistControllers.controller('BookDetailCtrl',['$scope','$routeParams','$http',
	function($scope,$routeParams,$http){
		$http.get('/api/book/'+$routeParams.bookId).success(function(bookdetails){
			$scope.bookdetails=bookdetails;
			$scope.bookId=$routeParams.bookId;
		})
	}
]);

booklistControllers.controller('adminCtrl',['$scope','$http',
	function($scope,$http){
          $scope.loadAuthorTags = function(query) {
            return $http.get('/search?author=' + query);
          };
          $scope.loadGenreTags = function(query) {
            return $http.get('/search?genre=' + query);
          };
          $scope.addBook=function () {
            return $http.post('/api/book',$scope.book);
          }
          
	}
]);