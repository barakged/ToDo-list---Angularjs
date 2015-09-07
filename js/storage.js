var TodoControllers = angular.module("TodoControllers", []);
TodoControllers.factory('storage', ['$window','$routeParams', function( $window ){
 
    var curindex=212;
    return {
      memorize: function( value){

        try{
          if( $window.Storage ){
            $window.localStorage.setItem( 'tasks', $window.JSON.stringify( value ) );
            return true;
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      },

           recall2: function( value ){
        try{
          if( $window.Storage ){
            return $window.JSON.parse( $window.localStorage.getItem( value ) );
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      },

    recall: function( ){
        try{
          if( $window.Storage ){
            return $window.JSON.parse( $window.localStorage.getItem( 'tasks' ) )
          } else {
            return false;
          }
        } catch( error ){
          console.error( error, error.message );
        }
        return false;
      }

    }
  }])



.filter('myFilter', function () {
    return function (tasks, search) {
        var result = [];
        angular.forEach(tasks, function (value, key) {
            angular.forEach(value, function (value2, key2) {
                if (value2 === search) {
                    result.push(value2);
                }
            })
        });
        return result;

    }
})

  //controlls
  .controller('storageController', ['$scope', 'storage','$routeParams', function ( $scope, storage,$routeParams ) {
    $scope.tasks = [];
    //flag for later steps to prevent unnecessary calling
    //if the Storage is not available
    $scope.store = false;
    
    var tasks = storage.recall();
    if( tasks != false ){
      if( tasks != null ){
        $scope.tasks = tasks;
        delete( tasks );
      }
      $scope.store = true;
    } else {
      $scope.store = false;
    }
    
    $scope.editIndex = false;



// in controller
$scope.init = function () {
$scope.filterValue=$routeParams.taskID;
$scope.task = $routeParams.taskID;
$scope.filterValue=$routeParams.taskID;
}


    $scope.addTask = function () {
      if( $scope.editIndex === false){
        var task = { task: $scope.task,task2: $scope.task2,task3: $scope.task3, done: false };
        $scope.tasks.push( task );
        if( $scope.store ){ 
          storage.memorize( $scope.tasks );
        }
      } else {
        $scope.tasks[$scope.editIndex].task = $scope.task;
             $scope.tasks[$scope.editIndex].task2 = $scope.task2;
                $scope.tasks[$scope.editIndex].task3= $scope.task3;
        if( $scope.store ){ 
          storage.memorize( $scope.tasks );
            
        }
    
      }
      $scope.editIndex = false;
      $scope.task = '';
      $scope.task2 = '';
      $scope.task3 = '';
    }
        
    $scope.editTask = function (index) {

      $scope.task = $scope.tasks[index].task;
      $scope.task2 = $scope.tasks[index].task2;
         $scope.task3 = $scope.tasks[index].task3;
      $scope.editIndex = index;
        var tasks = storage.recall();

    }
    $scope.doneTask = function (index) {
      $scope.tasks[index].done = true;
      if( $scope.store ){ 
        storage.memorize( $scope.tasks );
      }
    }
    $scope.unDoneTask = function (index) {
      $scope.tasks[index].done = false;
      if( $scope.store ){ 
        storage.memorize( $scope.tasks );
      }
    }
    $scope.deleteTask = function (index) {
      $scope.tasks.splice(index, 1);
      if( $scope.store ){ 
        storage.memorize( $scope.tasks );
      }
    }
  }]);





