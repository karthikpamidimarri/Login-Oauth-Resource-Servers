'use strict';

angular.module('frontendApp')
  .factory('AuthServerProvider', function loginService($http, localStorageService, Base64, API_SERVER,RESOURCE_SERVER) {
    return {
      login: function (credentials) {
        var data = "username=" + credentials.username + "&password="
          + credentials.password + "&grant_type=password&scope=read%20write&" +
          "client_secret=123456&client_id=clientapp";
        return $http.post(API_SERVER + 'oauth/token',data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
            "Authorization": "Basic " + Base64.encode("clientapp" + ':' + "123456")
          }
        }).success(function (response) {
          var expiredAt = new Date();
          expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
          response.expires_at = expiredAt.getTime();
          localStorageService.set('token', response);

          return response;
        });
      },
      logout: function () {
        // logout from the server
        $http.post('api/logout').then(function () {
          localStorageService.clearAll();
        });
      },
      getToken: function () {
        return localStorageService.get('token');
      },
      hasValidToken: function () {
        var token = this.getToken();
        return token && token.expires_at && token.expires_at > new Date().getTime();
      },
      callResourceServer : function (){
        var authToken = JSON.parse(localStorage.getItem("ls.token")).access_token;
        var config = {headers:  {
          'Authorization': 'bearer '+authToken,
          'Accept': 'application/json;odata=verbose'
        }
        };
        $http.get(RESOURCE_SERVER + 'api/devices',config).then(function(response){
          console.log(""+response.data);
        });
      }
    };
  }).factory('MyRequests', function($http, $cookieStore){

    return {
      request: function(method, url, data, okCallback, koCallback){
        $http({
          method: method,
          url: url,
          data: data
        }).success(okCallback).error(koCallback);
      },
      authentifiedRequest: function(method, url, data, okCallback, koCallback){
        var authToken = JSON.parse(localStorage.getItem("ls.token")).access_token;
        $http({
          method: method,
          url: url,
          data: data,
          headers: {'Authorization': 'bearer '+authToken}
        }).success(okCallback).error(koCallback);
      }
    }
  });
