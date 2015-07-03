angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('HomeCtrl', function($scope,$ionicModal, $timeout) {
    $ionicModal.fromTemplateUrl('templates/popup-design.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };
})
.controller('CustomizeCtrl', function($scope,$ionicModal, $timeout) {
    $ionicModal.fromTemplateUrl('templates/popup-design.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };
})
.controller('CheckoutCtrl', function($scope) {})
.controller('CartCtrl', function($scope) {})
.controller('OrderCtrl', function($scope) {})
.controller('ProductCtrl', function($scope,$ionicPopup, $timeout, $window) {
      $scope.addcart = function () {

        var alertPopup = $ionicPopup.show({
            title: "Added to cart!",
            //                template: 'Login Successfull'
        });
        $timeout(function () {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    }
})
.controller('LoginCtrl', function($scope) {})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
