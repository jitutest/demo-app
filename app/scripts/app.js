'use strict';
/**
 * @ngdoc brandingModule
 * @name se-branding
 * @description
 * # se-branding
 *
 * Main module of the application.
 */
  angular
    .module('se-branding', [
      'seWebUI',
	    'gettext',
      'ui.bootstrap',
      'se-branding-config'
    ])
    .config(['$routeProvider', 'seClient',"$sceDelegateProvider",'oauthRequestInterceptorProvider', '$httpProvider',function($routeProvider, seClient, $sceDelegateProvider, oauthRequestInterceptorProvider, $httpProvider) {
      

      oauthRequestInterceptorProvider.setInterceptUrls([{
        url: seClient.AUTH_URL+'/api/v1/user',
        authCodeEntry: 'Authorization'
    },
    {
      url: seClient.TNC_ACCEPTANCE,
      authCodeEntry: 'Authorization'
    },
    {
      url:seClient.TNC_URL+'/tnc',
      authCodeEntry:'Authroization'
    }
    ]);
    // Buffer time to prevent the prossiblity of 401 due to network latency
    oauthRequestInterceptorProvider.setBufferTime(180);
    // oauthRequestInterceptor service to be pushed $httpProvider.interceptors
    $httpProvider.interceptors.push('oauthRequestInterceptor');
      $routeProvider
        .when('/homepage', {
          templateUrl: 'views/se-landing.html',
          resolve: {
            app: ['$rootScope', 'seLandingMetaInfo','authenticationService', '$q', '$location',function ($rootScope, seLandingMetaInfo,authenticationService, $q, $location) {
              //var defer = $q.defer();
              //authenticationService.checkLogin();
              seLandingMetaInfo.getMetaInfo().then(function(data) {
                /*authenticationService.checkLogin().then(function(result){
                  $location.path('/demo/');
                  defer.resolve();
                }, function(error){
                  defer.reject(error);
                })*/
                $rootScope.metatags = data.homepage;
              });
              //return defer.promise;
            }]
          }
        })
        /*.when('/demoConfig', {
            templateUrl:'views/demoConfiguration.html',
            controller:'DemoCtrl',
            resolve: {
              app: ['$rootScope', 'seLandingMetaInfo','authenticationService',function ($rootScope, seLandingMetaInfo,authenticationService) {
                //authenticationService.checkLogin();
                seLandingMetaInfo.getMetaInfo().then(function(data) {
                  $rootScope.metatags = data.homepage;
                });
              }]
            }   
        })*/
        .when('/demo', {
          templateUrl: 'views/httpbatcher.html',
          controller : 'tncDemoCtrl',
          resolve: {
            app: ['$rootScope', 'seLandingMetaInfo','authenticationService',function ($rootScope, seLandingMetaInfo,authenticationService) {
              //authenticationService.checkLogin();
              seLandingMetaInfo.getMetaInfo().then(function(data) {
                $rootScope.metatags = data.homepage;
              });
            }]
          }
        })
        .when('/config', {
          templateUrl:'views/demoConfiguration.html',
          controller:'demoConfigCtrl',
          resolve:{
            app: ['$rootScope', 'seLandingMetaInfo','authenticationService',function ($rootScope, seLandingMetaInfo,authenticationService) {
              //authenticationService.checkLogin();
              seLandingMetaInfo.getMetaInfo().then(function(data) {
                $rootScope.metatags = data.homepage;
              });
            }]
          }
        })
        .otherwise({
          redirectTo: '/homepage'

        });

        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'http://10.194.156.27:9019/**'
        ]);
        //setting the configuration values using provider.
        
    }]) .constant('loginConstants',(function() {
      return {
        SESSION_MANAGER_LOGOUT_URL : '/logout',
        USER_SERVICE_URL: '/api/v1/user',
        SESSION_MANAGER_API_TKN: '/v2/token',
        SESSION_MANAGER_LOGIN : '/login',
        SESSION_MANAGER_RENEW_TOKEN : '/v2/refreshToken'
    }
    })())
    .run(['$rootScope','$location','$http','$q','authenticationService','seClient','implicitGrantLoginService','authorizationCodeGrantService','loginConstants','oauthRequestInterceptor', function($rootScope, $location, $http, $q, authenticationService, seClient,implicitGrantLoginService,authorizationCodeGrantService,loginConstants,oauthRequestInterceptor)
    {
      authenticationService.setAuthenticationUrl(seClient.AUTH_URL);
      authenticationService.setSessionManagerUrl(seClient.CSM_URL)
     // authenticationService.setAppVersion(seClient.APP_VERSION);
      authenticationService.setClientId(seClient.CLIENT_ID);
      authenticationService.setGmrCode(seClient.GMR_CODE);
      authenticationService.setLoginService(authorizationCodeGrantService);
      authenticationService.setLoginConstants(loginConstants);
      
    
      

      $rootScope.$on('$routeChangeStart',function(event,route){
        authenticationService.checkLogin();
      });

    }]);
    