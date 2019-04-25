'use strict';
angular.module('se-branding')
    .controller('demoConfigCtrl',demoConfigCtrl);

    demoConfigCtrl.$inject=['$scope', 'demoConfigService', '$location', 'tncMgmtService', 'seClient'];

    function demoConfigCtrl($scope, demoConfigService, $location, tncMgmtService,seClient) {
        $scope.initFunc = function() {
            $scope.country="INT";
            $scope.app_version=seClient.APP_VERSION;
            $scope.clientId=seClient.CLIENT_ID;
            $scope.baseUrl=seClient.TNC_URL;
            $scope.windowModal=[
                {
                    'id':'isPopUp',
                    'text':'Popup Modal',
                    'selected':true
                },
                {
                    'id':'isWindow',
                    'text':'Window Modal'
                }
            ];
            $scope.staticTextObj=JSON.stringify({
                "headerAppName":"eDeisgn Terms And Conditions Updated",
                "tncText":"Terms of Use",
                "logoURL":"./images/se-logo.png",
                "agreeText":"AGREE",
                "rejectText":"DECLINE"
            });
        }

        $scope.configure = function() {
            var tokenObj = tncMgmtService.getTncAcceptanceStatus();
            if(tokenObj && (tokenObj.tnc_acceptance==='unavailable' || tokenObj.tnc_acceptance==='Not found')|| tokenObj.tnc_acceptance==='false'){
                demoConfigService.getTncAcceptance($scope.clientId, $scope.country, $scope.app_version).then(function(result){
                    if(result.data.acceptance_status===false) {
                        $scope.configureDemo();
                    } else {
                        $scope.error=true;
                        $scope.errorMsg="You already accept tnc for configured Parameter!!! Please proceed on :) ";
                        $('#errorModal').modal('show');

                    }
                    
                }, function(error){
                    $scope.configureDemo();
                });
                
            }else {
               $scope.error=true;
                $scope.errorMsg="You already accept tnc !!! Please proceed on(Please note: it is coming from /token or /refreshToken) :) ";
                $('#errorModal').modal('show');
                //$scope.configureDemo();
            }
        };

        $scope.configureDemo = function() {
            var obj={};
            if($scope.country) {
                obj.country = $scope.country;
            }
            if($scope.app_version) {
                obj.app_version = $scope.app_version;
            }
            if($scope.baseUrl) {
                obj.baseUrl = $scope.baseUrl;
            }
            if($scope.staticTextObj) {
                obj.staticTextObj = JSON.parse($scope.staticTextObj);
            }
            if($scope.model_choose) {
               obj.model_choose = $scope.model_choose;
            } else {
                var selectedObj={};
                $scope.windowModal.forEach(function(modal){
                    if(modal.selected===true) {
                        selectedObj = modal;
                    }
                });
                if(selectedObj) {
                    obj.model_choose = selectedObj;
                }
            }
            obj.clientId = $scope.clientId;
            demoConfigService.setConfigObj(obj);
            $location.path("/demo")
        }

    };
