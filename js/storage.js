var TodoControllers = angular.module("TodoControllers", []);

TodoControllers.factory('storage', ['$window', '$routeParams', function($window) {

    indexor = 0;
    var task_obj = function(task_id, task_title, task_descp) {

        this.task_id = task_id;
        this.task_title = task_title;
        this.task_descp = task_descp;
    };
    return {
        set_task_obj: function(task_id, task_title, task_descp) {

            return new task_obj(task_id, task_title, task_descp);
        },
        memorize: function(value) {

            try {
                if ($window.Storage) {
                    $window.localStorage.setItem('tasks', $window.JSON.stringify(value));
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error(error, error.message);
            }
            return false;
        },
        recall: function() {
            try {
                if ($window.Storage) {
                    return $window.JSON.parse($window.localStorage.getItem('tasks'))
                } else {
                    return false;
                }
            } catch (error) {
                console.error(error, error.message);
            }
            return false;
        }

    }
}])




//controlls
.controller('storageController', ['$scope', 'storage', '$routeParams', function($scope, storage, $routeParams) {
    $scope.tasks = [];
    //flag for later steps to prevent unnecessary calling
    //if the Storage is not available
    $scope.store = false;

    var tasks = storage.recall();
    if (tasks != false) {
        if (tasks != null) {
            $scope.tasks = tasks;
            delete(tasks);
        }
        $scope.store = true;
    } else {
        $scope.store = false;
    }

    $scope.editIndex = false;

    // in controller
    $scope.init = function() {
        $scope.filterValue = $routeParams.taskID;
        $scope.taskme = $routeParams.taskID;
        $scope.filterValue = $routeParams.taskID;
        var templist = storage.recall();
        for (var i = 0; i < templist.length; i++) {
            if (templist[i].task_id == $routeParams.taskID) {
                $scope.taskme2 = templist[i].task_title;
                $scope.taskme3 = templist[i].task_descp;
                $scope.editIndex = i;
            }
        }
    }

    $scope.addTask2 = function() {
        if ($scope.editIndex === false) {
            var task = storage.set_task_obj($scope.task, $scope.task2, $scope.task3)
            $scope.tasks.push(task);
            if ($scope.store) {
                storage.memorize($scope.tasks);
            }
        } else {
            $scope.tasks[$scope.editIndex].task_id = $scope.task;
            $scope.tasks[$scope.editIndex].task_title = $scope.task2;
            $scope.tasks[$scope.editIndex].task_descp = $scope.task3;
            if ($scope.store) {
                storage.memorize($scope.tasks);

            }

        }
        $scope.editIndex = false;
        $scope.task = '';
        $scope.task2 = '';
        $scope.task3 = '';
    }

    
    $scope.editTask = function(index) {

        $scope.task = $scope.tasks[index].task_id;
        $scope.task2 = $scope.tasks[index].task_title;
        $scope.task3 = $scope.tasks[index].task_descp;
        $scope.editIndex = index;
        var tasks = storage.recall();

    }

    $scope.doneTask = function(index) {
        $scope.tasks[index].done = true;
        if ($scope.store) {
            storage.memorize($scope.tasks);
        }
    }
    $scope.unDoneTask = function(index) {
        $scope.tasks[index].done = false;
        if ($scope.store) {
            storage.memorize($scope.tasks);
        }
    }
    $scope.deleteTask = function(index) {
        $scope.tasks.splice(index, 1);
        if ($scope.store) {
            storage.memorize($scope.tasks);
        }
    }
}]);
