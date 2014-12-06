var swideModule = angular.module('swide', []);
swideModule.controller('IDEController', function($scope) {
  $scope.ide = {
    show: {
      search: true,
      edit: false
    }
  };
});
swideModule.controller('SearchController', function($scope) {
  $scope.search = function() {
    alert('haha');
  };
});
swideModule.controller('EditController', function($scope) {

});
swideModule.controller('ViewController', function($scope) {

});
