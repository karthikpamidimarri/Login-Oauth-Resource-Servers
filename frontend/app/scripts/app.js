'use strict';
/* global app: true */

var app = angular.module('frontendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute', 'ui.router','LocalStorageModule'
]);

app.config(function ($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
  $routeProvider
    .when('/', {
      templateUrl: 'views/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/dashboard', {
      templateUrl: 'views/dashboard.html',
      controller: 'DashboardCtrl'
    }).when('/docs',{
      templateUrl : 'scripts/app/admin/docs/docs.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
app.run(["$rootScope","Auth", function ($rootScope, Auth) {
  //$rootScope.ENV = ENV;
  //$rootScope.VERSION = VERSION;
  $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
    $rootScope.toState = toState;
    $rootScope.toStateParams = toStateParams;

    if (Principal.isIdentityResolved()) {
      Auth.authorize();
    }

    // Update the language
    /*Language.getCurrent().then(function (language) {
      $translate.use(language);
    });*/
  });
}]);
app.config(["$stateProvider", function ($stateProvider) {
    $stateProvider
      .state('swagger', {
        views:{
          "modal": {
            templateUrl: "swagger-ui/index.html"
          }
        },
        abstract: true
      });
  }]);
app.constant('API_SERVER', 'http://localhost:8081/');
app.constant('RESOURCE_SERVER', 'http://localhost:8082/');

