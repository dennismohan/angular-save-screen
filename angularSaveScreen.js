(function(){
	"use strict";
	angular.module('BW.LoadingScreen', [])
		.directive('bwSavingScreen', SavingScreen);

		SavingScreen.$inject = ['$timeout', '$document', '$compile'];
		function SavingScreen($timeout, $document, $compile){
			var directive = {
				restrict: 'A',
				scope: {
					//add dynamic glyphy-icons
					saving: '=status'
				},
				controller: SavingScreenController,
				link: Linker
			};
			return directive;

			function Linker(scope, elem, attrs){
				var saveOverlay = $('#bw_saving_overlay');
				if(!saveOverlay.length){
					var pageBody = $('#ui-view-container');
					pageBody.append('<style>.bw-ss-bg-overlay{background-color:rgba(0,0,0,.8);position:absolute;z-index:1;top:0;bottom:0;width:100%;text-align:center}.bw-ss-progress-container{margin:0 auto;}.bw-ss-message-text{padding-top:30px;color:#fff;font-size:20px;font-weight:700;text-shadow:1px 1px 3px #000}.bw-ss-icon{font-size:48px;font-weight:bold;padding-bottom:28px;padding-top:30px;text-shadow:1px 1px 3px #000}.bw-ss-icon-success{color:#6CF200}.bw-ss-icon-failure{color:#F20000}.bw-ss-continue-btn{margin-top:50px;}</style><div id="bw_saving_overlay" class="bw-ss-bg-overlay"><div class="mdl-progress mdl-js-progress mdl-progress__indeterminate bw-ss-progress-container" ng-show="saving.isSuccess==null"></div><i class="material-icons bw-ss-icon bw-ss-icon-success" ng-show="saving.isSuccess==true">check</i><i class="material-icons bw-ss-icon bw-ss-icon-failure" ng-show="saving.isSuccess==false">clear</i><div class="bw-ss-message-text">{{saving.message}}</div><button ng-show="saving.isSuccess==false" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored bw-ss-continue-btn" ng-click="hideLoadingScreen()">Continue</button></div>');

					var template = $('#bw_saving_overlay').hide();
					$compile(template.contents())(scope);
				}

				elem.bind('click', buttonHandler);

				function buttonHandler(){
					setPageStyle();
					$('#bw_saving_overlay').show();
				}

				function setPageStyle(){
					//Add blur to page container
					var container = $('.event-login-container');
					container.css('-webkit-filter', 'blur(6px)');
					container.css('-moz-filter', 'blur(6px)');
					container.css('-o-filter', 'blur(6px)');
					container.css('filter', 'blur(6px)');

					// Set save screen to full page height
					var overlay = $('.bw-ss-bg-overlay');
					overlay.css("height",$document.height());
					overlay.css("padding-top",$('body').scrollTop()+200);

					// disable scroll on body
					var bodyElem = $('body');
					bodyElem.css("overflow-x","hidden");
					bodyElem.css("overflow-y","hidden");
				}

			}

			SavingScreenController.$inject = ['$scope'];
			function SavingScreenController($scope){
				debugger;//start here and in the watch make sure $scope.saving is set properly
				$scope.$watch(function(){return $scope.saving;}, function(newValue, oldvalue){
					debugger;
					if(newValue && newValue.isSuccess==true){
						$timeout($scope.hideLoadingScreen, 1500);
					}
				}, true);

				$scope.hideLoadingScreen = function(){
					$('#bw_saving_overlay').hide();
					$scope.removePageStyle();
				};

				$scope.removePageStyle = function(){
					var container = $('.event-login-container');
					container.css('-webkit-filter', '');
					container.css('-moz-filter', '');
					container.css('-o-filter', '');
					container.css('filter', '');

					var bodyElem = $('body');
					bodyElem.css("overflow-x","visible");
					bodyElem.css("overflow-y","visible");
				};
			}
		}

})();