'use strict';

angular.module('copayApp.controllers').controller('preferencesUnitController', function($scope, $log, configService, $ionicHistory, gettextCatalog, walletService, profileService) {

  var config = configService.getSync();
  $scope.unitList = [{
    name: 'bits (1,000,000 bits = 1AUR)',
    shortName: 'bits',
    value: 100,
    decimals: 2,
    code: 'bit',
  }, {
    name: 'AUR',
    shortName: 'AUR',
    value: 100000000,
    decimals: 8,
    code: 'btc',
  }];

  $scope.save = function(newUnit) {
    var opts = {
      wallet: {
        settings: {
          unitName: newUnit.shortName,
          unitToSatoshi: newUnit.value,
          unitDecimals: newUnit.decimals,
          unitCode: newUnit.code,
        }
      }
    };

    configService.set(opts, function(err) {
      if (err) $log.warn(err);

      $ionicHistory.goBack();
      walletService.updateRemotePreferences(profileService.getWallets())
    });
  };

  $scope.$on("$ionicView.enter", function(event, data){
    $scope.currentUnit = config.wallet.settings.unitCode;
  });
});
