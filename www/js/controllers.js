var abc = 0;
//var adminurl = "http://wohlig.co.in/tweeke/index.php/json/";
angular.module('starter.controllers', ['ngDraggable', 'ngCordova', 'myservices', 'ngTouch'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.$watch('cart', function() {
        $scope.cart = cart;
    });
    $scope.cart = $.jStorage.get("cart");
    $scope.user = MyServices.getUser();

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

    //cart
    //	MyServices.getallcartbyuser().success(function(data){
    //		$scope.cart = data.queryresult.length;
    //	});
})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices) {

    $scope.cart = MyServices.getCart();

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

.controller('CustomizeCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices, $ionicScrollDelegate, $ionicLoading, $location) {

    $scope.cart = MyServices.getCart();

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
            img: "pillow.jpg",
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
        cameraDirection: 1
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
        console.log("click result");
        console.log(result);
        if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
            $scope.pillowImages = [
                [{
                    name: 'three',
                    img: result,
                    opacity: ''
                }]
            ];
        } else {
            $scope.pillowImages.push([{
                name: 'three',
                img: result,
                opacity: ''
            }]);
            console.log($scope.pillowImages);
        }
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
                //                console.log($.jStorage.get("num"));
                //                                if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                //                                    $scope.pillowImages = [
                //                                        [{
                //                                            name: 'three',
                //                                            img: imageData,
                //                                            opacity: ''
                //                                        }]
                //                                    ];
                //                                } else {
                //                                    $scope.pillowImages.push([{
                //                                        name: 'three',
                //                                        img: imageData,
                //                                        opacity: ''
                //                                    }]);
                //                                    console.log($scope.pillowImages);
                //                                }

                $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", imageData, {})
                    .then(function(result) {
                        var data = JSON.parse(result.response);
                        console.log("in response");
                        console.log(data);
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
                if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
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

        console.log("in images");
        console.log($scope.socialimages);
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

        console.log("socail facebook");
        console.log($scope.toPushSocial);
        _.each($scope.toPushSocial, function(n) {

            if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                $scope.pillowImages = [
                    [{
                        name: 'three',
                        img: n.url,
                        opacity: ''
                    }]
                ];
            } else {
                $scope.pillowImages.push([{
                    name: 'three',
                    img: n.url,
                    opacity: ''
                }]);
            }



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

            /*if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
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
                    //                    if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                    //                        $scope.pillowImages = [
                    //                            [{
                    //                                name: 'three',
                    //                                img: resultImage[key],
                    //                                opacity: ''
                    //                            }]
                    //                        ];
                    //                    } else {
                    //                        $scope.pillowImages.push([{
                    //                            name: 'three',
                    //                            img: resultImage[key],
                    //                            opacity: ''
                    //                        }]);
                    //                        console.log($scope.pillowImages);
                    //                    }
                    //				 

                    $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", resultImage[key], {})
                        .then(function(result) {
                            var data = JSON.parse(result.response);
                            console.log("in response");
                            console.log(data);
                            callback(data);
                        }, function(err) {
                            console.log(err);
                        }, function(progress) {
                            console.log("progress");
                        });


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
                    img: 'pillow.jpg',
                    opacity: ''
                }]
            ];
        }
    }


    $scope.onDropComplete = function(index, obj, evt) {
        abc = $element;
        var classname = $($element).attr("class");
        classname = "." + classname;

        console.log("clas$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(classname);
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

    //proceed
    $scope.proceed = function() {
        console.log($scope.pillowImages);

        _.each($scope.pillowImages, function(n, key) {
            console.log(document.getElementById("imgg" + key).style.marginLeft);
            console.log(document.getElementById("imgg" + key).style.marginTop);

            $scope.left = document.getElementById("imgg" + key).style.marginLeft;
            $scope.top = document.getElementById("imgg" + key).style.marginTop;
            if ($scope.top != '') {
                _.each(n, function(m, key) {
                    m.top = $scope.top;
                });
            }
            if ($scope.left != '') {
                _.each(n, function(m, key) {
                    m.left = $scope.left;
                });
            }
        });
        console.log("after image");
        console.log($scope.pillowImages);

        MyServices.setImages($scope.pillowImages);


        $location.url("/app/product");
    }

})
    .controller('EditCtrl', function($scope, $ionicModal, $timeout, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices, $ionicScrollDelegate, $ionicLoading, $location, $stateParams) {

        $scope.cart = MyServices.getCart();

        $timeout(function() {
            $ionicScrollDelegate.$getByHandle('mainScroll').freezeAllScrolls(true);
        }, 50);


        $scope.pillowImages = [];

        //ngDraggable
        $scope.num = 9;
        $.jStorage.set("num", $scope.num);
        $scope.blurclass = "";
        $scope.dropstatus = "true";
        $scope.status = false;
        if ($.jStorage.get("pillowImages")) {
            $scope.status = true;
            if ($.jStorage.get("pillowImages").id) {
                $scope.status = true;
                $scope.pillowImages = $.jStorage.get("pillowImages").images;
            } else {
                $scope.status = false;
            }
        }



        MyServices.getuserproductcartbyid($stateParams.id).success(function(data) {
            console.log("my data");
            console.log(data);
            $scope.imageData = data;
            if ($scope.status) {
                $scope.pillowImages = $.jStorage.get("pillowImages").images;
            } else {
                console.log("pilllow before");
                console.log(data);

                _.each(data.images, function(n, key) {
                    if (n.top == 0 && n.left == 0) {
                        $scope.pillowImages.push(
                            [{
                                name: 'three',
                                img: n.image,
                                opacity: '',
                                style: ""
                            }]
                        );
                    } else
                    if (n.top == 0) {
                        $scope.pillowImages.push(
                            [{
                                name: 'three',
                                img: n.image,
                                opacity: '',
                                style: "hight:100%;margin-left:" + n.left + "px"
                            }]
                        );
                    } else {
                        $scope.pillowImages.push(
                            [{
                                name: 'three',
                                img: n.image,
                                opacity: '',
                                style: "width:100%;margin-top:" + n.top + "px"
                            }]
                        );
                    }
                });
            }
            console.log($scope.pillowImages);
            $scope.imageData.images = $scope.pillowImages;
            console.log($scope.imageData);
        });
        console.log($stateParams.id);

        //    $scope.pillowImages = [
        //        [{
        //            name: 'three',
        //            img: "pillow.jpg",
        //            opacity: ''
        //        }]
        //    ];

        var options1 = {
            quality: 80,
                                sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true
        };

        var options2 = {
            quality: 80,
                                sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            cameraDirection: 1
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
            console.log("click result");
            console.log(result);
            if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                $scope.pillowImages = [
                    [{
                        name: 'three',
                        img: result,
                        opacity: ''
                    }]
                ];
            } else {
                $scope.pillowImages.push([{
                    name: 'three',
                    img: result,
                    opacity: ''
                }]);
                console.log($scope.pillowImages);
            }
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
                    //                console.log($.jStorage.get("num"));
                    //                                if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                    //                                    $scope.pillowImages = [
                    //                                        [{
                    //                                            name: 'three',
                    //                                            img: imageData,
                    //                                            opacity: ''
                    //                                        }]
                    //                                    ];
                    //                                } else {
                    //                                    $scope.pillowImages.push([{
                    //                                        name: 'three',
                    //                                        img: imageData,
                    //                                        opacity: ''
                    //                                    }]);
                    //                                    console.log($scope.pillowImages);
                    //                                }

                    $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", imageData, {})
                        .then(function(result) {
                            var data = JSON.parse(result.response);
                            console.log("in response");
                            console.log(data);
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
                    if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
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

            console.log("in images");
            console.log($scope.socialimages);
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

            console.log("socail facebook");
            console.log($scope.toPushSocial);
            _.each($scope.toPushSocial, function(n) {

                if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                    $scope.pillowImages = [
                        [{
                            name: 'three',
                            img: n.url,
                            opacity: ''
                        }]
                    ];
                } else {
                    $scope.pillowImages.push([{
                        name: 'three',
                        img: n.url,
                        opacity: ''
                    }]);
                }



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

                /*if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
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
                        //                    if ($scope.pillowImages[0][0].img == 'pillow.jpg') {
                        //                        $scope.pillowImages = [
                        //                            [{
                        //                                name: 'three',
                        //                                img: resultImage[key],
                        //                                opacity: ''
                        //                            }]
                        //                        ];
                        //                    } else {
                        //                        $scope.pillowImages.push([{
                        //                            name: 'three',
                        //                            img: resultImage[key],
                        //                            opacity: ''
                        //                        }]);
                        //                        console.log($scope.pillowImages);
                        //                    }
                        //				 

                        $cordovaFileTransfer.upload(adminurl + "imageuploadproduct", resultImage[key], {})
                            .then(function(result) {
                                var data = JSON.parse(result.response);
                                console.log("in response");
                                console.log(data);
                                callback(data);
                            }, function(err) {
                                console.log(err);
                            }, function(progress) {
                                console.log("progress");
                            });


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
                        img: 'pillow.jpg',
                        opacity: ''
                    }]
                ];
            }
        }


        $scope.onDropComplete = function(index, obj, evt) {
            console.log("op dropppppppp");
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

        //proceed
        $scope.proceed = function() {
            console.log($scope.pillowImages);

            _.each($scope.pillowImages, function(n, key) {
                console.log(document.getElementById("imgg" + key).style.marginLeft);
                console.log(document.getElementById("imgg" + key).style.marginTop);

                $scope.left = document.getElementById("imgg" + key).style.marginLeft;
                $scope.top = document.getElementById("imgg" + key).style.marginTop;
                if ($scope.top != '') {
                    _.each(n, function(m, key) {
                        m.top = $scope.top;
                        m.left = 0;
                    });
                }
                if ($scope.left != '') {
                    _.each(n, function(m, key) {
                        m.left = $scope.left;
                        m.top = 0;
                    });
                }
            });
            console.log("after image");
            console.log($scope.pillowImages);
            $scope.imageData.images = $scope.pillowImages;

            MyServices.setImages($scope.imageData);


            $location.url("/app/editproduct");
        }

    })

.controller('CheckoutCtrl', function($scope, MyServices, $location, $ionicPopup, $timeout) {

    $scope.carts = [];
    $scope.shownocart = false;
    $scope.showloading = true;
    $scope.pageno = 1;
    $scope.total = 0;
    $scope.checkout = {};
    $scope.checkout.shipto = true;

    $.jStorage.deleteKey("pillowImages");

    // all countries
    $scope.countries = MyServices.getCountries();

    //get all in cart
    $scope.cartRefresh = function(page) {

        MyServices.getallcartbyuser(page).success(function(data) {
            console.log(data.queryresult);
            if (data.queryresult.length == 0 && $scope.carts.length == 0) {
                $scope.showloading = false;
                $scope.shownocart = true;
                $scope.keepscrolling = false;
            } else if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            } else {
                $scope.showloading = false;
                $scope.keepscrolling = true;
                _.each(data.queryresult, function(n) {
                    $scope.total += parseInt(n.price);
                    $scope.carts.push(n);
                })
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        });


    }

    $scope.cartRefresh(1);

    $scope.loadMoreCart = function() {
        $scope.cartRefresh(++$scope.pageno);
    }

    //checkout
    $scope.checkOut = function() {

        if ($scope.checkout.shipto == true) {
            $scope.allvalidation = [{
                field: $scope.checkout.firstname,
                validation: ""
            }, {
                field: $scope.checkout.lastnmae,
                validation: ""
            }, {
                field: $scope.checkout.phone,
                validation: ""
            }, {
                field: $scope.checkout.billingaddress,
                validation: ""
            }, {
                field: $scope.checkout.billingcity,
                validation: ""
            }, {
                field: $scope.checkout.billingpincode,
                validation: ""
            }, {
                field: $scope.checkout.billingcountry,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
        } else {
            $scope.allvalidation = [{
                field: $scope.checkout.firstname,
                validation: ""
            }, {
                field: $scope.checkout.lastnmae,
                validation: ""
            }, {
                field: $scope.checkout.phone,
                validation: ""
            }, {
                field: $scope.checkout.billingaddress,
                validation: ""
            }, {
                field: $scope.checkout.billingcity,
                validation: ""
            }, {
                field: $scope.checkout.billingstate,
                validation: ""
            }, {
                field: $scope.checkout.billingpincode,
                validation: ""
            }, {
                field: $scope.checkout.billingcountry,
                validation: ""
            }, {
                field: $scope.checkout.shippingaddress,
                validation: ""
            }, {
                field: $scope.checkout.shippingcity,
                validation: ""
            }, {
                field: $scope.checkout.shippingpincode,
                validation: ""
            }, {
                field: $scope.checkout.shippingcountry,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
        }

        if (check) {
            $scope.checkout.user = $.jStorage.get("user").id;
            $scope.checkout.finalamount = $scope.total;
            MyServices.userCheckout($scope.checkout).success(function(data) {
			  console.log(data);
			  if(data != 0){
				  var alertPopup = $ionicPopup.show({
                            title: "Order is placed.",
                            //                template: 'Login Successfull'
                        });
                        $timeout(function() {
                            alertPopup.close(); //close the popup after 3 seconds for some reason
                        }, 3000);
			  }

            })
        }
    }

})

.controller('CartCtrl', function($scope, MyServices) {

    $scope.carts = [];
    $scope.shownocart = false;
    $scope.showloading = true;
    $scope.pageno = 1;
    $scope.total = 0;

    $.jStorage.deleteKey("pillowImages");


    $scope.cartRefresh = function(page) {

        MyServices.getallcartbyuser(page).success(function(data) {
            console.log(data.queryresult);
            if (data.queryresult.length == 0 && $scope.carts.length == 0) {
                $scope.showloading = false;
                $scope.shownocart = true;
                $scope.keepscrolling = false;
            } else if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            } else {
                $scope.showloading = false;
                $scope.keepscrolling = true;
                _.each(data.queryresult, function(n) {
                    $scope.total += parseInt(n.price);
                    $scope.carts.push(n);
                })
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        });


    }

    $scope.cartRefresh(1);

    $scope.loadMoreCart = function() {
        $scope.cartRefresh(++$scope.pageno);
    }

    
    //remove cart
    $scope.removeCart = function(cart){
	    MyServices.deletecartbyid(cart.id).success(function(data){
		    if(data == "true"){
			    $scope.cartRefresh(1);
		    }
	    });
    }


})

.controller('OrderCtrl', function($scope, MyServices, $location) {

	$scope.orders = [];
    $scope.shownoorder = false;
    $scope.showloading = true;
    $scope.pageno = 1;
    $scope.total = 0;

    $.jStorage.deleteKey("pillowImages");


    $scope.cartRefresh = function(page) {

        MyServices.getorderproductbyuser(page).success(function(data) {
            console.log(data.queryresult);
            if (data.queryresult.length == 0 && $scope.orders.length == 0) {
                $scope.showloading = false;
                $scope.shownoorder = true;
                $scope.keepscrolling = false;
            } else if (data.queryresult.length == 0) {
                $scope.keepscrolling = false;
            } else {
                $scope.showloading = false;
                $scope.keepscrolling = true;
                _.each(data.queryresult, function(n) {
                    $scope.total += parseInt(n.price);
                    $scope.orders.push(n);
                })
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.refreshComplete');
        });


    }

    $scope.cartRefresh(1);

    $scope.loadMoreCart = function() {
        $scope.cartRefresh(++$scope.pageno);
    }


})

.controller('RegisterCtrl', function($scope, MyServices, $timeout, $ionicPopup, $location) {

    $scope.user = {};
    $scope.allvalidation = [];
    $scope.signUp = function() {
        $scope.allvalidation = [{
            field: $scope.user.email,
            validation: ""
        }, {
            field: $scope.user.password,
            validation: ""
        }, {
            field: $scope.user.cpassword,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            if ($scope.user.password != $scope.user.cpassword) {
                var alertPopup = $ionicPopup.show({
                    title: "Password UnMatch",
                    //                template: 'Login Successfull'
                });
                $timeout(function() {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                }, 3000);
            } else {
                MyServices.signup($scope.user, function(data, status) {
                    console.log(data);
                    if (data == "false") {
                        var alertPopup = $ionicPopup.show({
                            title: "User Already exist",
                            //                template: 'Login Successfull'
                        });
                        $timeout(function() {
                            alertPopup.close(); //close the popup after 3 seconds for some reason
                        }, 3000);
                    } else {
                        MyServices.setUser(data);
                        $location.url("/app/home");
                    }

                });
            }
        }
    }

})

.controller('LoginAccCtrl', function($scope, MyServices, $interval, $location, $ionicPopup, $timeout) {

    $scope.user = {};

    $scope.allvalidation = [];

    var callback = function(data, status) {
        console.log(data);
    };

    $scope.normalLogin = function() {

        $scope.allvalidation = [{
            field: $scope.user.email,
            validation: ""
        }, {
            field: $scope.user.password,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            MyServices.login($scope.user, function(data, status) {
                if (data == "false") {
                    var alertPopup = $ionicPopup.show({
                        title: "Wroung Email ID OR password.",
                        //                template: 'Login Successfull'
                    });
                    $timeout(function() {
                        alertPopup.close(); //close the popup after 3 seconds for some reason
                    }, 3000);
                } else {
                    MyServices.setUser(data);
                    $location.url("/app/home");
                }
            });
        }


    }

})

.controller('ProductCtrl', function($scope, $ionicPopup, $timeout, $window, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices, $ionicScrollDelegate, $ionicLoading, $location) {

    $scope.pillowImages = MyServices.getImages();
    $scope.arrayConvert = {};
    $scope.arrayConvert.quantity = 1;
    $scope.arrayConvert.image = [];
    $scope.product = [];
    $scope.keep = {};
    $scope.cart = MyServices.getCart();

    MyServices.getProduct().success(function(data, status) {
        console.log("product");
        console.log(data);
        $scope.product = data;
        $scope.oneproduct = data[0];
        $scope.productsave = data[0];
        $scope.arrayConvert.price = $scope.productsave.price * $scope.arrayConvert.quantity;
    });

    $scope.calculatePrice = function(prod) {
        prod = JSON.parse(prod);
        $scope.productsave = prod;
        $scope.arrayConvert.price = prod.price * $scope.arrayConvert.quantity;
    }

    _.each($scope.pillowImages, function(n, key) {
        _.each(n, function(m, key) {
            if (m.top) {
                m.style = "width:100%;margin-top:" + m.top;
            }
            if (m.left) {
                m.style = "height:100%;margin-left:" + m.left;
            }
        });
    });

    var single = function(left, top, img) {
        $scope.arrayConvert.image.push({
            "left": left,
            "top": top,
            "img": img
        })
    }

    $scope.addCart = function() {


        $ionicLoading.show({
            template: 'Loading...'
        });

        $scope.arrayConvert.image = [];

        _.each($scope.pillowImages, function(n, key) {
            $scope.left = document.getElementById("imgg" + key).style.marginLeft;
            $scope.top = document.getElementById("imgg" + key).style.marginTop;

            _.each(n, function(m, key) {
                if ($scope.top != '') {
                    single(0, $scope.top, m.img);
                } else if ($scope.left != '') {
                    single($scope.left, 0, m.img);
                } else {
                    single(0, 0, m.img);
                }
            });
        });
        console.log("after image");
        $scope.arrayConvert.productid = $scope.productsave.id;
        $scope.arrayConvert.userid = $.jStorage.get("user").id;
        console.log($scope.arrayConvert);


        MyServices.addtocart($scope.arrayConvert, function(data) {
            console.log(data);

            $ionicLoading.hide();

            MyServices.setCart();
            if (data == "true") {
                var alertPopup = $ionicPopup.show({
                    title: "Added to cart!",
                });
                $timeout(function() {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                    $location.url("/app/home");
                }, 3000);
            } else {
                var alertPopup = $ionicPopup.show({
                    title: "Enable to Add!",
                });
                $timeout(function() {
                    alertPopup.close();
                }, 3000);
            }
        });


        //        var alertPopup = $ionicPopup.show({
        //            title: "Added to cart!",
        //            //                template: 'Login Successfull'
        //        });
        //        $timeout(function() {
        //            alertPopup.close(); //close the popup after 3 seconds for some reason
        //        }, 3000);
    }

    $scope.incdec = function(data) {
        if (data == 1) {
            if ($scope.arrayConvert.quantity > 1)
                $scope.arrayConvert.quantity -= 1;
            $scope.arrayConvert.price = $scope.productsave.price * $scope.arrayConvert.quantity;
        } else {
            $scope.arrayConvert.quantity += 1;
            $scope.arrayConvert.price = $scope.productsave.price * $scope.arrayConvert.quantity;
        }
    }
})

.controller('EditProductCtrl', function($scope, $ionicPopup, $timeout, $window, $interval, $ionicPopup, $window, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker, MyServices, $ionicScrollDelegate, $ionicLoading, $location, $stateParams) {
    console.log($stateParams.id);

    $scope.pillowImage = MyServices.getImages();
    $scope.pillowImages = $scope.pillowImage.images;
    $scope.arrayConvert = {};
    $scope.arrayConvert.quantity = parseInt($scope.pillowImage.quantity);
    $scope.arrayConvert.image = [];
    $scope.product = [];
    $scope.keep = {};
    $scope.cart = MyServices.getCart();

    MyServices.getProduct().success(function(data, status) {
        $scope.product = data;
        _.each(data, function(n) {
            if (n.id == $scope.pillowImage.product) {
                console.log(JSON.stringify(n));
                $scope.oneproduct = JSON.stringify(n);
                $scope.productsave = n;
            }
        });

        $scope.arrayConvert.price = parseInt($scope.productsave.price) * parseInt($scope.arrayConvert.quantity);
    });

    $scope.calculatePrice = function(prod) {
        console.log(prod);
        prod = JSON.parse(prod);
        $scope.productsave = prod;
        $scope.arrayConvert.price = parseInt(prod.price) * parseInt($scope.arrayConvert.quantity);
    }

    _.each($scope.pillowImages, function(n, key) {
        _.each(n, function(m, key) {
            if (m.left == 0) {
                m.style = "width:100%;margin-top:" + m.top;
            }
            if (m.top == 0) {
                m.style = "height:100%;margin-left:" + m.left;
            }
        });
    });

    var single = function(left, top, img) {
        $scope.arrayConvert.image.push({
            "left": left,
            "top": top,
            "img": img
        })
    }

    $scope.addCart = function(topage) {


        $ionicLoading.show({
            template: 'Loading...'
        });

        $scope.arrayConvert.image = [];

        _.each($scope.pillowImages, function(n, key) {
            $scope.left = document.getElementById("imgg" + key).style.marginLeft;
            $scope.top = document.getElementById("imgg" + key).style.marginTop;

            _.each(n, function(m, key) {
                if ($scope.top != '') {
                    single(0, $scope.top, m.img);
                } else if ($scope.left != '') {
                    single($scope.left, 0, m.img);
                } else {
                    single(0, 0, m.img);
                }
            });
        });
        console.log("after image");
        $scope.arrayConvert.productid = $scope.productsave.id;
        $scope.arrayConvert.userid = $.jStorage.get("user").id;
        $scope.arrayConvert.userproductcartid = $scope.productsave.id;
        console.log($scope.arrayConvert);


        MyServices.editcart($scope.arrayConvert, function(data) {
            console.log(data);

            $ionicLoading.hide();

            MyServices.setCart();
            if (data == "true") {
                var alertPopup = $ionicPopup.show({
                    title: "Saved to cart!",
                });
                $timeout(function() {
                    alertPopup.close(); //close the popup after 3 seconds for some reason
                    if (topage == 1)
                        $location.url("/app/home");
                    else
                        $location.url("/app/checkout");
                }, 3000);
            } else {
                var alertPopup = $ionicPopup.show({
                    title: "Enable to Save!",
                });
                $timeout(function() {
                    alertPopup.close();
                }, 3000);
            }
        });

    }

    $scope.incdec = function(data) {
        console.log(data);
        if (data == 1) {
            if ($scope.arrayConvert.quantity > 1)
                $scope.arrayConvert.quantity -= 1;
            console.log($scope.arrayConvert.quantity);
            $scope.arrayConvert.price = parseInt($scope.productsave.price) * parseInt($scope.arrayConvert.quantity);
        } else {
            console.log($scope.arrayConvert.quantity);
            $scope.arrayConvert.quantity += 1;
            console.log($scope.arrayConvert.quantity);
            $scope.arrayConvert.price = parseInt($scope.productsave.price) * parseInt($scope.arrayConvert.quantity);
        }
    }
})

.controller('LoginCtrl', function($scope, MyServices, $interval, $location) {


    MyServices.logout();
    MyServices.logoutJstorage();

    var authenticatesuccess = function(data, status) {
        console.log(data);
        if (data != "false") {
		   console.log("in not equal to 0");
            MyServices.setUser(data);
            user = data;
            $location.url("/app/home");
        } else {
		   console.log("in equal to 0");
            console.log("stay here");
        };
    };

    //    MyServices.authenticate().success(authenticatesuccess);

    var checksocial = function(data, status) {
        if (data != "false") {
            console.log("Facebook Login");
            $interval.cancel(stopinterval);
            ref.close();
            MyServices.authenticate().success(authenticatesuccess);
        } else {
            console.log("Do nothing");
        }
    };

    var callAtIntervalsocial = function() {
        MyServices.authenticate().success(checksocial);
    };


    $scope.socialLogin = function(type) {
        console.log(type);
        ref = window.open(adminhauth + 'login/' + type, '_blank', 'location=no');
        stopinterval = $interval(callAtIntervalsocial, 2000);
        ref.addEventListener('exit', function(event) {
            MyServices.authenticate().success(authenticatesuccess);
            $interval.cancel(stopinterval);
        });
    }

})

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