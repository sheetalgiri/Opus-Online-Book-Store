var booklist = angular.module('booklist', [
  'ngRoute',
  'booklistControllers',
  'ngTagsInput'
]);

booklist.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/admin', {
        templateUrl: 'partials/admin.html',
        controller: 'adminCtrl'
      }).
      when('/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'BookListCtrl'
      }).
      when('/books/:bookId', {
        templateUrl: 'partials/book-detail.html',
        controller: 'BookDetailCtrl'
      }).
	  when('/home',{
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
	  when('/cart',{
        templateUrl: 'partials/cart.html',
        controller: 'cartCtrl'
      }).
      when('/wishlist',{
        templateUrl: 'partials/wishlist.html',
        controller: 'wishListCtrl'
      }).
	  when('/settings',{
        templateUrl: 'partials/settings.html',
        controller: 'settingsCtrl'
      }).
	  when('/discussion',{
        templateUrl: 'partials/discussion.html',
        controller: 'discussionCtrl'
      }).
	  when('/notification',{
        templateUrl: 'partials/notifi.html',
        controller: 'notificationCtrl'
      }).
	  when('/bestsellers',{
        templateUrl: 'partials/bestsellers.html',
        controller: 'bestSellerCtrl'
      }).
	  when('/profile',{
        templateUrl: 'partials/profile.html',
        controller: 'profileCtrl'
      }).
	  when('/message',{
        templateUrl: 'partials/message.html',
        controller: 'messageCtrl'
      }).
	  when('/authors',{
        templateUrl: 'partials/authors.html',
        controller: 'authorsCtrl'
      }).
	  when('/new-release',{
        templateUrl: 'partials/new_release.html',
        controller: 'newReleaseCtrl'
      }).
	 when('/login',{
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
	 when('/signup',{
        templateUrl: 'partials/signup.html',
        controller: 'signupCtrl'
      }).
	 
      otherwise({
        redirectTo: '/home'
      });
  }]);