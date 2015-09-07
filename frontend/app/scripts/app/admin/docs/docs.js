'use strict';

angular.module('frontendApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('docs', {
                parent: 'admin',
                url: '/docs',
                /*data: {
                    roles: ['ROLE_ADMIN','ROLE_USER'],
                    pageTitle: 'global.menu.admin.apidocs'
                },*/
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/admin/docs/docs.html'
                    }
                }
            });
    });
angular.module('frontendApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('swagger1', {
        views: {
          "modal": {
            templateUrl: 'app/scripts/swagger-ui/index.html'
          }
        },
        abstract: true
      });
  });
