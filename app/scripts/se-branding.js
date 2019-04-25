'use strict';
angular.module('se-branding')
    .controller('landingPage', ['$scope', '$mdToast', 'sdkTemplateServices', '$http', '$window', 'gettextCatalog', 'toasterService', '$log', '$sce', 'authorizationService', function($scope, $mdToast, sdkTemplateServices, $http, $window, gettextCatalog, toasterService, $log, $sce, authorizationService) {
        $scope.headerLogo = {
            'link': '#/homepage',
            'imageUrl': 'images/lifeisON_white.png',
            'altText': 'SchneiderLogo'
        };
        sdkTemplateServices.fetch('data/se-main-menuitems.json').then(function(data) {
            $scope.MainMenuItemsnew = data;
        });
        
        authorizationService.setUserHavePermissionCallback(function(permissions) {
            var guestUser = false;
            if (angular.isArray(permissions)) {
                angular.forEach(permissions, function(permission) {
                    if (permission === 'GUEST')
                        guestUser = true;
                });
            } else if (angular.isString(permissions)) {
                if (permissions === 'GUEST')
                    guestUser = true;
            }

            return guestUser;
        });

        sdkTemplateServices.fetch('data/se-countries-languages.json').then(function(data) {
            $scope.locales = data;
        });
        // ends header data source


        // starts footer data source
        $scope.footerLogoLink = function() {
            $window.location.href = $scope.seBrandingConfiguration[0].footerLogoLink;
        };
        $scope.footerLinks = [];
        sdkTemplateServices.fetch('data/se-footer-links.json').then(function(data) {
            $scope.footerLinks = data;
        });

        $scope.mainfooterlinks = [];
        sdkTemplateServices.fetch('data/se-main-footer-links.json').then(function(data) {
            $scope.mainfooterlinks = data;
        });

        $scope.footerSocialLinks = [];
        sdkTemplateServices.fetch('data/se-social-contents.json').then(function(data) {
            $scope.footerSocialLinks = data;
        });
   }]);