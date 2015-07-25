var abc = 0;
var adminurl = "http://wohlig.co.in/tweeke/index.php/json/";
angular.module('starter.controllers', ['ngDraggable', 'ngCordova', 'myservices', 'ngTouch'])

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

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices) {
    $ionicModal.fromTemplateUrl('templates/popup-design.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
})

.controller('CustomizeCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices, $ionicScrollDelegate, $ionicLoading) {


    $timeout(function() {
        $ionicScrollDelegate.$getByHandle('mainScroll').freezeAllScrolls(true);
    }, 50);


    //ngDraggable
    $scope.num = 9;
    $.jStorage.set("num", $scope.num);
    console.log($.jStorage.get("num"));
    $scope.blurclass = "";
    $scope.dropstatus = "true";
    $scope.pillowImages = [
        [{
            name: 'three',
            img: "img/pillow.jpg",
            opacity: ''
        }]
    ];

        var options1 = {
            quality: 80,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true
        };
    	
        var options2 = {
            quality: 80,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
    	    cameraDirection  : 1
        };
    
        var options = {
            maximumImagesCount: 9 - $scope.pillowImages.length,
            width: 800,
            height: 800,
            quality: 80,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true
    
        };

    $scope.newfun = function(index) {
        console.log(index);
    }

    //	CLICK PHOTO


    var callback = function(result) {
        console.log(result);
    };

    $scope.clickPhoto = function() {

        if ($scope.pillowImages.length == 9) {
            var alertPopup = $ionicPopup.show({
                title: "Number Of Images Excceds!",
            });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        } else {
            $cordovaCamera.getPicture(options1).then(function(imageData) {
                //			  $scope.num = $scope.num - 1;
                $.jStorage.set("num", $.jStorage.get("num") - 1);
                console.log($.jStorage.get("num"));
                if ($scope.pillowImages[0][0].img == 'img/pillow.jpg') {
                    $scope.pillowImages = [
                        [{
                            name: 'three',
                            img: imageData,
                            opacity: ''
                        }]
                    ];
                } else {
                    $scope.pillowImages.push([{
                        name: 'three',
                        img: imageData,
                        opacity: ''
                    }]);
                    console.log($scope.pillowImages);
                }

                $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", imageData, {})
                    .then(function(result) {
                        console.log(result);
                        var data = JSON.parse(result.response);
                        callback(data);
                    }, function(err) {
                        console.log(err);
                    }, function(progress) {
                        console.log("progress");
                    });

                console.log(imageData);
            }, function(err) {
                // error
            });
        }
    }


    $scope.clickPhotoFront = function() {

        if ($scope.pillowImages.length == 9) {
            var alertPopup = $ionicPopup.show({
                title: "Number Of Images Excceds!",
            });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        } else {
            $cordovaCamera.getPicture(options2).then(function(imageData) {
                //			  $scope.num = $scope.num - 1;
                $.jStorage.set("num", $.jStorage.get("num") - 1);
                console.log($.jStorage.get("num"));
                if ($scope.pillowImages[0][0].img == 'img/pillow.jpg') {
                    $scope.pillowImages = [
                        [{
                            name: 'three',
                            img: imageData,
                            opacity: ''
                        }]
                    ];
                } else {
                    $scope.pillowImages.push([{
                        name: 'three',
                        img: imageData,
                        opacity: ''
                    }]);
                    console.log($scope.pillowImages);
                }

                $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", imageData, {})
                    .then(function(result) {
                        console.log(result);
                        var data = JSON.parse(result.response);
                        callback(data);
                    }, function(err) {
                        console.log(err);
                    }, function(progress) {
                        console.log("progress");
                    });

                console.log(imageData);
            }, function(err) {
                // error
            });
        }
    }

    //upload photo instagram

    $scope.instagramPhoto = function() {
        console.log("Data");
        $scope.toPushSocial = [];
        $ionicLoading.show({
            template: 'Loading...'
        });

        MyServices.checkLogin("Instagram").success(
            function(data, status) {
                if (data.value) {
                    MyServices.getInstagramImages().success(function(data) {
                        $ionicLoading.hide();
                        $scope.socialimages = [];
                        _.each(data, function(n) {
                            $scope.socialimages.push({
                                url: n,
                                status: false
                            });
                        });

                        $scope.showimages = true;
                        $scope.socialimagesrow = partitionarray($scope.socialimages, 3);
                    });
                } else {
                    $ionicLoading.hide();
                    $scope.socialimages = [];
                    $scope.facebooklogid = data.id;
                    $scope.facebookLogin("Instagram");
                }
            }
        );
    };


    //upload photo facebook

    $scope.showimages = false;


    $scope.facebookPhoto = function() {
        console.log("Data");
        $scope.toPushSocial = [];
        $ionicLoading.show({
            template: 'Loading...'
        });

        MyServices.checkLogin("Facebook").success(
            function(data, status) {
                if (data.value) {
                    MyServices.getFacebookImages().success(function(data) {
                        $ionicLoading.hide();
                        $scope.socialimages = [];
                        _.each(data, function(n) {
                            $scope.socialimages.push({
                                url: n,
                                status: false
                            });
                        });

                        $scope.showimages = true;
                        $scope.socialimagesrow = partitionarray($scope.socialimages, 3);
                    });
                } else {
                    $ionicLoading.hide();
                    $scope.socialimages = [];
                    $scope.facebooklogid = data.id;
                    $scope.facebookLogin("Facebook");
                }
            }
        );
    };

    $scope.toPushSocial = [];
    $scope.cancelSocialPhoto = function() {
        $scope.showimages = false;
        $scope.socialimages = [];
        $scope.socialimagesrow = [];
        $scope.modal.hide();
        $scope.toPushSocial = [];
    }
    $scope.doneSocialPhoto = function() {


        _.each($scope.toPushSocial, function(n) {
            $scope.pillowImages.push([{
                name: 'three',
                img: n.url,
                opacity: ''
            }]);
        });


        $scope.cancelSocialPhoto();
    }

    $scope.socialImageClick = function(image) {
        if ((9 - $scope.pillowImages.length - $scope.toPushSocial.length) > 0 || image.status) {
            image.status = !image.status;
            if (image.status) {
                $scope.toPushSocial.push(image);
            } else {
                var index1 = $scope.toPushSocial.indexOf(image);
                $scope.toPushSocial.splice(index1, 1);

            }
        }
        console.log($scope.toPushSocial);
    }


    // FACEBOOK LOGO

    var stopinterval = 0;

    var checkfb = function(data, status) {
        console.log(data);
        if (data.value == null) {
            console.log("Do nothing");
        } else {
            ref.close();
            if (data.value == "SUCCESS" && !$scope.showimages) {
                if (data.type == "Facebook") {
                    $scope.facebookPhoto();
                }
                if (data.type == "Instagram") {
                    $scope.instagramPhoto();
                }
            }
            $interval.cancel(stopinterval);
        }
    }

    var callAtIntervalfb = function() {
        MyServices.checkLogid($scope.facebooklogid).success(checkfb);
    };

    $scope.facebookLogin = function(provider) {
        ref = window.open(adminhauth + 'login/' + provider + '?logid=' + $scope.facebooklogid, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervalfb, 1000);
        ref.addEventListener('exit', function(event) {
            $interval.cancel(stopinterval);
        });
    };


    //	UPLOAD PHOTO

    $scope.uploadPhoto = function() {
        console.log("picture");
        if ($scope.pillowImages.length > 8) {
            var alertPopup = $ionicPopup.show({
                title: "Number Of Images Excceds!",
            });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);

        } else {

                           /*if ($scope.pillowImages[0][0].img == 'img/pillow.jpg') {
                            $scope.pillowImages = [
                                [{
                                    name: 'three',
                                    img: 'img/demo1.jpg',
                                    opacity: ''
                                }]
                            ];
                        } else {
                            $scope.pillowImages.push([{
                                name: 'three',
                                img: 'img/demo.jpg',
                                opacity: ''
                            }]);
                            console.log($scope.pillowImages);
                        }*/


            options.maximumImagesCount = 9 - $scope.pillowImages.length;

            $cordovaImagePicker.getPictures(options).then(function(resultImage) {
                // Success! Image data is here
                $scope.cameraimage = resultImage[0];

                _.forEach(resultImage, function(n, key) {
                    //				 $scope.num = $scope.num - 1;
                    $.jStorage.set("num", $.jStorage.get("num") - 1);
                    options.maximumImagesCount = $.jStorage.get("num");
                    if ($scope.pillowImages[0][0].img == 'img/pillow.jpg') {
                        $scope.pillowImages = [
                            [{
                                name: 'three',
                                img: resultImage[key],
                                opacity: ''
                            }]
                        ];
                    } else {
                        $scope.pillowImages.push([{
                            name: 'three',
                            img: resultImage[key],
                            opacity: ''
                        }]);
                        console.log($scope.pillowImages);
                    }

                });
                console.log($.jStorage.get("num"));
                options.maximumImagesCount = $.jStorage.get("num");
                console.log(options);
                $.jStorage.set("pillow", $scope.pillowImages);
                $scope.modal.hide();
                //
            }, function(err) {
                // An error occured. Show a message to the user
            });
        }

    }

    // ON DROP DELETE
    $scope.onDropDelete = function(data, evt) {
        $scope.pillowImages.splice($scope.deleteindex, 1);
        if ($scope.pillowImages.length == 0) {
            $scope.pillowImages = [
                [{
                    name: 'three',
                    img: 'img/pillow.jpg',
                    opacity: ''
                }]
            ];
        }
    }


    $scope.onDropComplete = function(index, obj, evt) {
        abc = $element;
        var classname = $($element).attr("class");
        classname = "." + classname;
        for (var i = 0; i < 5; i++) {
            classname = classname.replace(" ", ".");
        }
        classname = classname.substr(0, classname.length - 1) + index + " img";
        setTimeout(function() {
            $(classname).css("margin-top", lastmargin);
            $(classname).css("margin-left", lastmarginleft);
        }, 50);


        if (obj != null && $scope.dropstatus == "true") {
            var otherObj = $scope.pillowImages[index];
            var otherIndex = $scope.pillowImages.indexOf(obj);
            $scope.pillowImages[index] = obj;
            $scope.pillowImages[otherIndex] = otherObj;
        }
    };

    //modal for picture
    $ionicModal.fromTemplateUrl('templates/popup-innerdesign.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.Time = 150;
    $scope.altTime = 125;

    var promise;
    $scope.mouseDown = function() {
        promise = $interval(function() {
            $scope.Time = $scope.Time + 1;
            console.log($scope.Time);
        }, 100);
    };

    $scope.openedit = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.cancelSocialPhoto();
        $scope.modal.hide();
    };


    //Edit and Done button toggle
    $scope.editimg = "true";
    $scope.edit_img = function() {
        $scope.dropstatus = "false";
        console.log($scope.dropstatus);
        $scope.edit = true;
        $scope.doneimg = true;
        $scope.editimg = false;
        $scope.overlaydiv = true;
    }

    $scope.done_img = function() {
        _.forEach($scope.pillowImages, function(n, key) {
            $scope.pillowImages[key][0].opacity = "";
        });
        $scope.dropstatus = "true";
        $scope.edit = false;
        $scope.doneimg = false;
        $scope.editimg = true;
        $scope.overlaydiv = false;
    }
    $scope.mouseUp = function() {
        $interval.cancel(promise);
    };
    //    Popup for image selection
    /* $scope.imgselected = function () {

                var alertPopup = $ionicPopup.show({
                    title: "Image selected!",
                    //                template: 'Login Successfull'
                });
                $timeout(function () {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            }*/

    //Moving image in the mask image
    var imgid = '';

    $scope.getImageId = function(imgd, mykey) {
        imgid = imgd;
        console.log(imgid);
        console.log(mykey);
        console.log($scope.pillowImages);
        if ($scope.dropstatus == "false") {
            _.forEach($scope.pillowImages, function(n, key) {
                $scope.pillowImages[key][0].opacity = "img_opacity";
                $scope.pillowImages[mykey][0].opacity = "";
                console.log($scope.pillowImages[key][0].opacity);
            });
        }

    };

    $scope.dragg = "true";
    $scope.onTap = function(evt) {
        console.log("on tap");
        console.log(evt);
        console.log($scope.dragg);
        if ($scope.dragg == "true")
            $scope.dragg = "false";
        else
            $scope.dragg = "true";
    }

    $scope.deleteindex = '';
    $scope.ondrag = function(ind) {
        $scope.deleteindex = ind;
    }






    $scope.moveImg = function(str, ishold) {
        console.log(imgid);
        var step = 50; // change this to different step value

        switch (str) {
            case "down":
                if (ishold == 0) {
                    var x = document.getElementById(imgid).style.backgroundPositionY;
                    var index = x.indexOf("px");
                    console.log(index);
                    if (index == -1) {
                        console.log(index);
                        document.getElementById(imgid).style.backgroundPositionY = "1px";
                    } else {
                        x = x.substr(0, index);
                        console.log(x);
                        var down = parseInt(x) + 1;
                        console.log("Down=" + down);
                        document.getElementById(imgid).style.backgroundPositionY = down + "px";
                    }
                } else if (ishold == 1) {
                    promise = $interval(function() {
                        var x = document.getElementById(imgid).style.backgroundPositionY;
                        var index = x.indexOf("px");
                        console.log(index);
                        if (index == -1) {
                            console.log(index);
                            document.getElementById(imgid).style.backgroundPositionY = "1px";
                        } else {
                            x = x.substr(0, index);
                            console.log(x);
                            var down = parseInt(x) + 1;
                            console.log("Down=" + down);
                            document.getElementById(imgid).style.backgroundPositionY = down + "px";
                        }
                    }, 100);
                }
                break;
            case "up":
                if (ishold == 0) {
                    var x = document.getElementById(imgid).style.backgroundPositionY;
                    var index = x.indexOf("px");
                    console.log(index);
                    if (index == -1) {
                        console.log(index);
                        document.getElementById(imgid).style.backgroundPositionY = "-1px";
                    } else {
                        x = x.substr(0, index);
                        console.log(x);
                        var up = parseInt(x) - 1;
                        console.log("Up=" + up);
                        document.getElementById(imgid).style.backgroundPositionY = up + "px";
                    }
                } else if (ishold == 1) {
                    promise = $interval(function() {
                        var x = document.getElementById(imgid).style.backgroundPositionY;
                        var index = x.indexOf("px");
                        console.log(index);
                        if (index == -1) {
                            console.log(index);
                            document.getElementById(imgid).style.backgroundPositionY = "-1px";
                        } else {
                            x = x.substr(0, index);
                            console.log(x);
                            var up = parseInt(x) - 1;
                            console.log("Up=" + up);
                            document.getElementById(imgid).style.backgroundPositionY = up + "px";
                        }
                    }, 100);
                }
                break;
            case "left":
                if (ishold == 0) {
                    var x = document.getElementById(imgid).style.backgroundPositionX;
                    var index = x.indexOf("px");
                    console.log(index);
                    if (index == -1) {
                        console.log(index);
                        document.getElementById(imgid).style.backgroundPositionX = "-1px";
                    } else {
                        x = x.substr(0, index);
                        console.log(x);
                        var left = parseInt(x) - 1;
                        console.log("Left=" + left);
                        document.getElementById(imgid).style.backgroundPositionX = left + "px";
                    }
                } else if (ishold == 1) {
                    promise = $interval(function() {
                        var x = document.getElementById(imgid).style.backgroundPositionX;
                        var index = x.indexOf("px");
                        console.log(index);
                        if (index == -1) {
                            console.log(index);
                            document.getElementById(imgid).style.backgroundPositionX = "-1px";
                        } else {
                            x = x.substr(0, index);
                            console.log(x);
                            var left = parseInt(x) - 1;
                            console.log("Left=" + left);
                            document.getElementById(imgid).style.backgroundPositionX = left + "px";
                        }
                    }, 100);
                }
                break;
            case "right":
                if (ishold == 0) {
                    var x = document.getElementById(imgid).style.backgroundPositionX;
                    var index = x.indexOf("px");
                    console.log(index);
                    if (index == -1) {
                        console.log(index);
                        document.getElementById(imgid).style.backgroundPositionX = "1px";
                    } else {
                        x = x.substr(0, index);
                        console.log(x);
                        var right = parseInt(x) + 1;
                        console.log("Right=" + right);
                        document.getElementById(imgid).style.backgroundPositionX = right + "px";
                    }
                } else if (ishold == 1) {
                    promise = $interval(function() {
                        var x = document.getElementById(imgid).style.backgroundPositionX;
                        var index = x.indexOf("px");
                        console.log(index);
                        if (index == -1) {
                            console.log(index);
                            document.getElementById(imgid).style.backgroundPositionX = "1px";
                        } else {
                            x = x.substr(0, index);
                            console.log(x);
                            var right = parseInt(x) + 1;
                            console.log("Right=" + right);
                            document.getElementById(imgid).style.backgroundPositionX = right + "px";
                        }
                    }, 100);
                }
                break;
        }
    }

})

.controller('CheckoutCtrl', function($scope) {})

.controller('CartCtrl', function($scope) {})

.controller('OrderCtrl', function($scope) {})

.controller('RegisterCtrl', function($scope) {})

.controller('LoginAccCtrl', function($scope) {})

.controller('ProductCtrl', function($scope, $ionicPopup, $timeout, $window) {
    $scope.addcart = function() {

        var alertPopup = $ionicPopup.show({
            title: "Added to cart!",
            //                template: 'Login Successfull'
        });
        $timeout(function() {
            alertPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    }
})

.controller('LoginCtrl', function($scope) {})

.directive('time', function($interval) {
    return {
        templateUrl: 'time.html',
        restrict: 'E',
        scope: {
            Time: '=value'
        },
        link: function(scope, element, attrs) {
            element.addClass('time');

            var promise;
            scope.mouseDown = function() {
                promise = $interval(function() {
                    scope.Time = scope.Time + 1;
                    console.log(scope.Time);
                }, 100);

            };

            scope.mouseUp = function() {
                $interval.cancel(promise);
            };
        }
    };
});