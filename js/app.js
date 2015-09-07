var ToDoApp = angular.module('ToDoApp', ['ngRoute','TodoControllers']);

ToDoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/main', {
    templateUrl: 'main.html',
 //   controller: 'ListController'
  }).
    when('/task/:taskID', {
    templateUrl: 'task.html',
   // controller: 'storageController'
  }).
  otherwise({
    redirectTo: '/main'
  });
}]);




