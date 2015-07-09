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
    .controller('CustomizeCtrl', function ($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window) {

        //modal for picture
        $ionicModal.fromTemplateUrl('templates/popup-design.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.Time = 150;
        $scope.altTime = 125;

        var promise;
        $scope.mouseDown = function () {
            promise = $interval(function () {
                $scope.Time = $scope.Time + 1;
                console.log($scope.Time);
            }, 100);

        };

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
            $scope.overlaydiv = true;
        }

        $scope.done_img = function () {
            $scope.edit = false;
            $scope.doneimg = false;
            $scope.editimg = true;
            $scope.overlaydiv = false;
        }
        $scope.mouseUp = function () {
            $interval.cancel(promise);
        };
        //Popup for image selection
        //        $scope.imgselected = function () {
        //
        //            var alertPopup = $ionicPopup.show({
        //                title: "Image selected!",
        //                //                template: 'Login Successfull'
        //            });
        //            $timeout(function () {
        //                alertPopup.close(); //close the popup after 3 seconds for some reason
        //            }, 3000);
        //        }

        //Moving image in the mask image
        $scope.moveImg = function (str, ishold) {
            var step = 50; // change this to different step value
            switch (str) {
            case "down":
                if (ishold == 0) {
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
                } else if (ishold == 1) {
                    promise = $interval(function () {
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
                    }, 100);
                }
                break;
            case "up":
                if (ishold == 0) {
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
                } else if (ishold == 1) {
                    promise = $interval(function () {
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
                    }, 100);
                }
                break;
            case "left":
                if (ishold == 0) {
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
                } else if (ishold == 1) {
                    promise = $interval(function () {
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
                    }, 100);
                }
                break;
            case "right":
                if (ishold == 0) {
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
                } else if (ishold == 1) {
                    promise = $interval(function () {
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
                    }, 100);
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
    .controller('PlaylistCtrl', function ($scope, $stateParams) {})

.directive('time', function ($interval) {
    return {
        templateUrl: 'time.html',
        restrict: 'E',
        scope: {
            Time: '=value'
        },
        link: function (scope, element, attrs) {
            element.addClass('time');

            var promise;
            scope.mouseDown = function () {
                promise = $interval(function () {
                    scope.Time = scope.Time + 1;
                    console.log(scope.Time);
                }, 100);

            };

            scope.mouseUp = function () {
                $interval.cancel(promise);
            };
        }
    };
});