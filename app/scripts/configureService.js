'use strict';
angular.module('se-branding')
    .service('demoConfigService',demoConfigService);

    demoConfigService.$inject=['$http', '$q', 'seClient', 'authenticationService'];

    function demoConfigService($http, $q, seClient, authenticationService) {
        this.configObj={};
        this.setConfigObj = function(configObj) {
            this.configObj = configObj;
        };
        this.getConfigObj = function() {
            return this.configObj;
        };
        this.getTncAcceptance = function(clientId, country, appVersion) {
            var defer = $q.defer();
            var queryParam='';
            var req = {
                method:'GET',
                url: seClient.TNC_ACCEPTANCE,
                contentType: 'application/json',
                dataType: JSON,
                crossOrigin: false,
                headers: {'Authorization': authenticationService.getToken().access_token}
            };
            if(clientId) {
                queryParam='client_id='+clientId;
            }
            if(appVersion) {
                queryParam+='&app_version='+appVersion;
            }
            if(country) {
                queryParam+='&country='+country;
            }
            req.url=req.url+"?"+queryParam;
            $http(req).then(function(result){
                defer.resolve(result);
            }, function(error){
                defer.reject(error);
            });
            return defer.promise;
        }
    };