'use strict';

angular.module('frontendApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


