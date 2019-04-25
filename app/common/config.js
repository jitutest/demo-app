'use strict';
angular.module('se-branding-config',[])
  .constant('seClient', (function() {
    return {
      CLIENT_ID: 'ce66b817-0918-48c5-9961-dae25aed0061', //For Local 
      GMR_CODE:'ce66b817-0918-48c5-9961-dae25aed0061',
      APP_VERSION:'1.0',
      TNC_URL:'https://login-sqe.schneider-electric.com/tnc/v1',
      TNC_ACCEPTANCE:'https://login-sqe.schneider-electric.com/tnc/v1/tncAcceptance',
      AUTH_URL:'https://login-sqe.schneider-electric.com',
      CSM_URL:'https://csm-sqe.schneider-electric.com/csm', //For Local set it up 
      TNC_AUTH:'Basic c3FlOkpDWkpaZkQ2'
	  };
  })());
  // For local you set it modHeader as tnc-demo-local

