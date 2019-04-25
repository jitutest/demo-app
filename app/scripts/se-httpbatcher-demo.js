'use strict';
angular.module('se-branding')
    .controller('tncDemoCtrl',tncDemoCtrl);

    tncDemoCtrl.$inject=['$scope', 'demoConfigService', 'seTncUiURL', 'tncMgmtService'];

    function tncDemoCtrl($scope, demoConfigService, seTncUiURL, tncMgmtService) {
        var vm = this;
        vm.isPopUpClicked=false;
        $scope.$on('tncContentReady', function(result){
            vm.isTncReady=true;
        });
        /*$scope.$on('scroll.top', function(){
            alert('Hea You reached the top of the scroll');
        });
        $scope.$on('scroll.between', function() {
            alert('Hea you reached after top');
        });
        $scope.$on('scroll.bottom', function() {
            alert('Hea you reached at the bottom');
        });*/
        initData();
        function initData() {
            var configObj = demoConfigService.getConfigObj();
            vm.staticTextObj = configObj.staticTextObj;
            if(configObj.model_choose.id==='isPopUp') {
                vm.isNormal=false;
                vm.isPopUpClicked=true;
            } else {
                vm.isNormal=true;
                vm.isPopUpClicked=false;
            }
            vm.country = configObj.country;
            vm.language = configObj.language;
            if(configObj.baseUrl) {
                seTncUiURL.setBaseURL(configObj.baseUrl);
            }
            if(configObj.clientId) {
                seTncUiURL.setClientId(configObj.clientId);
            }
            if(configObj.app_version){
                seTncUiURL.setAppVersion(configObj.app_version);
            }
            //seTncUiURL.setBasicAuth('Basic ZGV2OkhXbUM3NUVxNlk='); //CI credential
            seTncUiURL.setBasicAuth('Basic c3FlOkpDWkpaZkQ2'); //SQE credential


        }
        vm.errorCallback = function(data) {
            if(data.getTncContent === true) {
                vm.isError=true;
                vm.errorMsg ="Error While getting Tnc Contnent";
            } else if (data.acceptTnc===true) {
                vm.isError = true;
                vm.errorMsg="Error While accepting the tnc";
            }
        };
        vm.errorCallbackForPopup = function(data) {
            if(data.getTncContent === true) {
                vm.isError=true;
                vm.errorMsg ="Error While getting Tnc Contnent";
            } else if (data.acceptTnc===true) {
                vm.isError = true;
                vm.errorMsg="Error While accepting the tnc";
            }
        }

        console.log('This is the demo controller');
        vm.acceptCallback = function(version, data) {
			tncMgmtService.updateTncAcceptanceStatus(true);
        };
        vm.rejectCallback = function() {
            alert('Rejected');
        };
        vm.errorMsg = {
            'onviewError':{msg:"error while retrieving data from Tnc", show:true},
            'onAcceptError':{msg:"Error while accepting the T&C", show:true},
            'onRejectError':{msg:"Error while rjecting the tnc", show:true}
        };
    };
