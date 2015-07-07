angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

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
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('HomeCtrl', function ($scope, $ionicModal, $timeout) {
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
    .controller('CustomizeCtrl', function ($scope, $ionicModal, $timeout) {

        //modal for picture
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
        //Edit and Done button toggle
        $scope.editimg = "true";
        $scope.edit_img = function () {
            $scope.edit = true;
            $scope.doneimg = true;
            $scope.editimg = false;
        }

        $scope.done_img = function () {
            $scope.edit = false;
            $scope.doneimg = false;
            $scope.editimg = true;
        }

        //Changing the position of image
        //                $scope.moveup = function () {
        //                    document.getElementById('up').style.top = 20 + "px";
        //                }
        //                $scope.moveright = function () {
        //                    document.getElementById('up').style.right = 20 + "px";
        //                }
        //                $scope.movebottom = function () {
        //                    document.getElementById('up').style.bottom = 20 + "px";
        //                }
        //                $scope.moveleft = function () {
        //                    document.getElementById('up').style.left = 20 + "px";
        //                }

        //        $scope.moveImg = function (str) {
        //            var step = 10;
        //            var x = 0; // change this to different step value
        //            var y = 0;
        //            console.log("x=" + x + ",y=" + y);
        //            switch (str) {
        //            case "down":
        //                x = document.getElementById('up').offsetTop;
        //                console.log("Down=" + x);
        //                x = x + step;
        //                document.getElementById('up').style.top = x + "px";
        //                break;
        //
        //            case "up":
        //                x = document.getElementById('up').offsetTop;
        //                console.log("UP=" + x);
        //                x = x - step;
        //                document.getElementById('up').style.top = x + "px";
        //                break;
        //
        //            case "left":
        //                y = document.getElementById('up').offsetLeft;
        //                console.log("Left=" + y);
        //                y = y - step;
        //                document.getElementById('up').style.left = y + "px";
        //                break;
        //
        //            case "right":
        //                y = document.getElementById('up').offsetLeft;
        //                console.log("Right=" + y);
        //                y = y + step;
        //                document.getElementById('up').style.left = y + "px";
        //                break;
        //            }
        //        }

        $scope.moveImg = function (str) {
            var step = 50; // change this to different step value
            switch (str) {
            case "down":
                //                var x = document.getElementById('img1').offsetTop;
                //                x = x - 90 + step;
                //                console.log("Down=" + x);
                var x = document.getElementById('img1').style.backgroundPositionY;
                var index = x.indexOf("px");
                console.log(index);
                if (index == -1) {
                    console.log(index);
                    document.getElementById('img1').style.backgroundPositionY = "1px";
                } else {
                    x = x.substr(0, index);
                    console.log(x);
                    var down = parseInt(x) + 1;
                    console.log("Down=" + down);
                    document.getElementById('img1').style.backgroundPositionY = down + "px";
                }
                //                angular.element('#img1').addClass('backgroundPositionY', x + "px");
                break;

            case "up":
                //                var x = document.getElementById('img1').offsetTop;
                //                x = x + 8 - step;
                //                console.log("Up=" + x);
                //                document.getElementById('img1').style.backgroundPositionY = x + "px";
                var x = document.getElementById('img1').style.backgroundPositionY;
                var index = x.indexOf("px");
                console.log(index);
                if (index == -1) {
                    console.log(index);
                    document.getElementById('img1').style.backgroundPositionY = "-1px";
                } else {
                    x = x.substr(0, index);
                    console.log(x);
                    var up = parseInt(x) - 1;
                    console.log("Up=" + up);
                    document.getElementById('img1').style.backgroundPositionY = up + "px";
                }
                break;

            case "left":
                //                var y = document.getElementById('img1').offsetLeft;
                //                y = y + 14 - step;
                //                console.log("Left=" + y);
                //                document.getElementById('img1').style.backgroundPositionX = y + "px";
                var x = document.getElementById('img1').style.backgroundPositionX;
                var index = x.indexOf("px");
                console.log(index);
                if (index == -1) {
                    console.log(index);
                    document.getElementById('img1').style.backgroundPositionX = "-1px";
                } else {
                    x = x.substr(0, index);
                    console.log(x);
                    var left = parseInt(x) - 1;
                    console.log("Left=" + left);
                    document.getElementById('img1').style.backgroundPositionX = left + "px";
                }
                break;

            case "right":
                //                var y = document.getElementById('img1').offsetLeft;
                //                y = y - 84 + step;
                //                console.log("Right=" + y);
                //                document.getElementById('img1').style.backgroundPositionX = y + "px";
                var x = document.getElementById('img1').style.backgroundPositionX;
                var index = x.indexOf("px");
                console.log(index);
                if (index == -1) {
                    console.log(index);
                    document.getElementById('img1').style.backgroundPositionX = "1px";
                } else {
                    x = x.substr(0, index);
                    console.log(x);
                    var right = parseInt(x) + 1;
                    console.log("Right=" + right);
                    document.getElementById('img1').style.backgroundPositionX = right + "px";
                }
                break;
            }
        }

    })
    .controller('CheckoutCtrl', function ($scope) {})
    .controller('CartCtrl', function ($scope) {})
    .controller('OrderCtrl', function ($scope) {})
    .controller('RegisterCtrl', function ($scope) {})
    .controller('LoginAccCtrl', function ($scope) {})
    .controller('ProductCtrl', function ($scope, $ionicPopup, $timeout, $window) {
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
    .controller('LoginCtrl', function ($scope) {})
    .controller('PlaylistCtrl', function ($scope, $stateParams) {});