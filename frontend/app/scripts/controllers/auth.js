'use strict';

app.controller('AuthCtrl', function ($scope, $location, AuthServerProvider, API_SERVER, RESOURCE_SERVER,MyRequests) {
  $scope.register = function () {
    var username = $scope.registerUsername;
    var password = $scope.registerPassword;

    if (username && password) {
      AuthServerProvider.register(username, password).then(
        function () {
          $location.path('/dashboard');
        },
        function (error) {
          $scope.registerError = error;
        }
      );
    } else {
      $scope.registerError = 'Username and password required';
    }
  };
  $scope.login = function () {
    var username = $scope.loginUsername;
    var password = $scope.loginPassword;

    if (username && password) {
      var credentials = {username: username, password: password};

      AuthServerProvider.login(credentials).then(
        function () {
          $location.path('/docs');
        },
        function (error) {
          $scope.loginError = error;
        }
      );
      MyRequests.authentifiedRequest('GET', RESOURCE_SERVER+'/api/devices', '', function(){alert('logged-out');});

    } else {
      $scope.loginError = 'Username and password required';
    }
  };
});
