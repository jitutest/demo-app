angular.module("seTemplateCacheModule", []).run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("views/demoConfiguration.html",
    "<div class=\"container http-batcher-container\" ng-init=initFunc();><form name=batchForm><div class=\"form-group se-form-group\"><label for=baseUrl>Base URL</label><input class=\"form-control se-form-control\" id=baseUrl placeholder=URL ng-model=baseUrl></div><div class=\"form-group se-form-group\"><label for=country>Country</label><input class=\"form-control se-form-control\" id=country name=country ng-model=country></div><div class=\"form-group se-form-group\"><label for=app_version>App Version</label><input class=\"form-control se-form-control\" id=app_version name=app_version placeholder=app_version ng-model=app_version></div><div class=\"form-group se-form-group\"><label for=client_id>Client Id</label><input class=\"form-control se-form-control\" id=clientId name=clientId placeholder=clientId ng-model=clientId></div><div class=\"form-group se-form-group\"><label for=staticTextObj>Static Text Object</label><textarea class=\"form-control se-form-control\" id=staticTextObj name=staticTextObj placeholder=Data ng-model=staticTextObj rows=5></textarea></div><br><p>Your Images url could be : ./images/bgLanding.png , ./images/common-sprite.png, ./images/comon-sprite@2x.png, ./images/footer-logo.png, ./images/gg.png, ./images/in.png</p><br><div class=\"form-group se-form-group\"><label for=\"Model Window\">Model Window</label><se-dropdowns class=se-light-green divider=yes items=windowModal label=Select ng-model=model_choose visible-options=3></se-dropdowns></div><br><input type=button class=\"se-btn se-btn-light-green se-btn-normal\" value=Configure ng-click=configure()></form></div><div class=\"modal fade\" id=errorModal tabindex=-1 role=dialog aria-labelledby=myModalLabel><div class=modal-dialog role=document><div class=modal-content><div class=modal-header><button type=button class=close data-dismiss=modal aria-label=Close><span aria-hidden=true>&times;</span></button><h4 class=modal-title id=myModalLabel>Warning Popup</h4></div><div class=modal-body>{{errorMsg}}</div><div class=modal-footer><button type=button class=\"btn btn-default\" data-dismiss=modal>Close</button></div></div></div></div>");
  $templateCache.put("views/httpbatcher.html",
    "<div ng-controller=\"tncDemoCtrl as vm\" class=\"container http-batcher-container\"><div ng-if=vm.isPopUpClicked><se-tnc-ui error-callback=vm.errorCallbackForPopup is-pop-up=true country=vm.country language=vm.language static-text-obj=vm.staticTextObj accept-callback=\"vm.acceptCallback(version, data)\" reject-callback=vm.rejectCallback() error-msg=vm.errorMsg data-toggle=modal data-target=#myModal1></se-tnc-ui></div><div ng-if=vm.isNormal><se-tnc-ui error-callback=vm.errorCallback is-pop-up=false country=vm.country></se-tnc-ui><se-tnc-ui-button is-tnc-content=vm.isTncReady is-pop-up=false is-button=true country=vm.country language=vm.language static-text-obj=vm.staticTextObj accept-callback=\"vm.acceptCallback(version, data)\" reject-callback=vm.rejectCallback() error-msg=vm.errorMsg></se-tnc-ui-button></div><div ng-if=vm.isError><div style=color:red>{{vm.errorMsg}}</div></div></div>");
  $templateCache.put("views/se-landing.html",
    "<div class=container><div class=row><div class=bs-docs-section><h1 id=btn-groups class=page-header>TERMS AND CONDITIONS UI</h1><h1 id=btn-groups class=sub-header>Introduction</h1><div class=segment id=def><span>Terms and conditions UI component is designed to fetch and display application specific terms and conditions content and capture user's acceptance of the same.<br>Applications can integrate this component to show the terms and conditions to the user at the time of login and also during SSO scenario.</span></div><div class=segement id=Dependencies><h3 class=page-header>Dependencies</h3><p>This component contains a set of native AngularJS directives based on CSS. The required dependencies are:</p><ul><li><strong>AngularJS</strong> (requires AngularJS 1.3.x or higher, tested with 1.5.9).</li><li><strong>bootstrap:>3.2.0</strong></li></ul></div><div class=segement id=Installation><h3 class=page-header>Installation</h3><p>To install terms and conditions UI Component, include the json package entry in existing bower.json file in project folder.</p><div class=highlight><pre class=prettyprint>          <span class=s>\"sdk-t-c-ui\"</span><span class=na>:</span> <span class=s>\"1.0.0\"</span>\n" +
    "            </pre></div><p>Run \"bower install\" in your cmd prompt or kernel to get latest component and it's dependencies in your working application folder</p><p><strong>Note:</strong>Replace the contents of .bowerrc file with below code to use DCES Artifactory</p><div class=highlight><pre class=prettyprint>\n" +
    "                {\n" +
    "                  \"registry\" : \"http://artifactory-dces.schneider-electric.com/artifactory/api/bower/bower\",\n" +
    "                   \"resolvers\" : [\"bower-art-resolver\"]\n" +
    "                }\n" +
    "             </pre></div><p><strong>Note:</strong> The CSS and JS dependencies in HTML files has to be updated as below:</p><div class=highlight><pre class=prettyprint><code class=language-markup>\n" +
    "              <span class=s>&lt;link</span> rel=\"stylesheet\" href=\"/bower_components/sdk-t-c-ui/sdk-t-c-ui-all.css\" &gt;\n" +
    "              <span class=s>&lt;script</span> src=\"/bower_components/sdk-t-c-ui/sdk-t-c-ui-all.js\"&gt;&lt;/script&gt;\n" +
    "              <span class=s>&lt;script</span> src=\"bower_components/pdfjs-dist/build/pdf.js\"&gt;&lt;/script&gt;\n" +
    "              <span class=s>&lt;script</span> src=\"bower_components/pdfjs-dist/build/pdf..worker.js\"&gt;&lt;/script&gt;\n" +
    "            </code></pre></div><br><div class=hightlight><p>Images need to be copied for mahilu plugin</p><pre class=prettyprint><span class=s>&lt;script</span> src=\"bower_components/mahilu-custom-scrollbar-plugin/(.png)\"&gt;&lt;/script&gt;</pre><p>Modify the grunt job as below:</p><pre class=prettyprint>\n" +
    "                  {\n" +
    "                    expand: true,\n" +
    "                    cwd: '<%= projectSettings.deps %>/mahilu-custom-scrollbar-plugin',\n" +
    "                    dest: '<%= projectSettings.dist %>/styles/',\n" +
    "                    src: ['*.png']\n" +
    "                  }</pre></div><p>As soon as all the files get downloaded and are included in the page, declare a dependency on the SE ELM module:</p><div class=highlight><pre class=prettyprint>            angular.module('your_module', ['seTncUi']);\n" +
    "              </pre></div><div class=segement id=Directive><h3 class=page-header>Directive</h3><p>Include below directive in your view html file to render the component.</p><pre class=prettyprint>          <span class=s>&lt;se-tnc-ui </span>\n" +
    "                        errorCallback=\"errorCallback\"\n" +
    "                        is-pop-up=\"isPopUp\"\n" +
    "                        country=\"country\"\n" +
    "                        static-text-obj=\"staticTextObj\"\n" +
    "                        accept-callback=\"acceptCallback(version, data)\"\n" +
    "                        reject-callback=\"rejectCallback()\"\n" +
    "                        data-toggle=\"modal\"\n" +
    "                        data-target=\"#myModal1\"\n" +
    "                        &gt;\n" +
    "                      <span class=s>&lt;/se-tnc-ui&gt;</span>\n" +
    "\n" +
    "                    </pre></div></div><div class=segement id=DataModal><h3 class=page-header>Data Modal</h3><p>The below modal value has to be supplied to render the tncui directive. Each configuration settings will be explained in \"Arguments\" segment.</p><pre class=highlight>\n" +
    "                            $scope.isPopUp = true; // Is always true becuase without that you couldnot get popup.\n" +
    "                            $scope.country=\"INT\"; // based on country the content will vary.\n" +
    "                            $scope.errorCallback = function(data){\n" +
    "                                if(data.getTncContent === true) {\n" +
    "                                    //When getTncContent is failed , i.e. When we occured error while getting tnc content\n" +
    "                                    //Might be you need to intimate user , that there is a error while featching tnc content\n" +
    "                                } else if (data.acceptTnc===true) {\n" +
    "                                   //When Accept the tnc failed, i.e. when we occured error while accepting the tnc.\n" +
    "                                }\n" +
    "                            };\n" +
    "                            $scope.rejectCallback = function() {\n" +
    "                                //When user reject the tnc , application will get the callback, depend on application use case either they could navigate to error page or applicaiton page.\n" +
    "                            };\n" +
    "                            $scope.staticTextObj = {\n" +
    "                                \"headerAppName\":\"eDeisgn Terms And Conditions Updated\", // Popup Header text\n" +
    "                                \"tncText\":\"Terms of Use\", //Second Header in the popup\n" +
    "                                \"logoURL\":\"./images/se-logo.png\", // Logo need to display in popup\n" +
    "                                \"agreeText\":\"AGREE\", //Agree button Text\n" +
    "                                \"rejectText\":\"DECLINE\" //Decline button Text\n" +
    "                            };\n" +
    "                            $scope.acceptCallback = function(version, data) {\n" +
    "                                //Once accepted this function will be called, might be applicaiton\n" +
    "                            };\n" +
    "            </pre></div><div class=segement id=DataModal><h3 class=page-header>Component Configuration</h3><p>Configure the provider/ service as below:</p><pre class=highlight>\n" +
    "                <p>If you are using provider, use seTncUiURLProvider.setBaseURL(configObj.baseUrl) or\n" +
    "                  you can use seTncUiURL.setBaseURL(configObj.baseUrl)</p>\n" +
    "                seTncUiURL.setBaseURL('https://login-ci.schneider-electric.com/tnc');\n" +
    "                seTncUiURL.setClientId('demo');\n" +
    "                seTncUiURL.setAppVersion(1.0);//This is app_version for Tnc Component.\n" +
    "                seTncUiURL.setAccessToken(authenticationService.getToken().access_token); //Here we can set access_token\n" +
    "            </pre></div><div class=segement id=externalDocumentation><h3 class=page-header>Notes:</h3><p>Before rendering the UI, we need to check whether user has accepted the terms and conditions already or not. This logic needs to be handled by the application. To check the user's acceptance status, we can use the /v2/token API or /tncAcceptance API.</p><p>Those who are not using CSM/token API , they can still use below url as reference :</p><br><pre class=hightlight>\n" +
    "                    https://login-ci.schneider-electric.com/tnc/v1/swagger-ui.html#!/tnc45acceptance45controller/checkTncAcceptanceUsingGET\n" +
    "            </pre><p>Those who are using csm they have to go to swagger documentation of csm, they can use /token or /refreshToken api where user will get tnc Acceptance</p><pre class=highlight>\n" +
    "                https://schneider-electric-se.atlassian.net/wiki/spaces/SMW/pages/52527250/CSM+-+API+Documentation\n" +
    "          </pre></div><div class=segement><h3 class=page-header>Demo Snapshots</h3><img src=./images/DemoPopup.png></div></div></div></div>");
}]);
