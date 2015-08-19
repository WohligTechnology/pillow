// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'myservices'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
	
	 $httpProvider.defaults.withCredentials = true;
	  $ionicConfigProvider.views.maxCache(0);
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.product', {
        url: "/product",
        views: {
            'menuContent': {
                templateUrl: "templates/product.html",
                controller: 'ProductCtrl'
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })
        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: 'HomeCtrl'
                }
            }
        })

    .state('app.order', {
        url: "/order",
        views: {
            'menuContent': {
                templateUrl: "templates/order.html",
                controller: 'OrderCtrl'
            }
        }
    })

    .state('app.checkout', {
        url: "/checkout",
        views: {
            'menuContent': {
                templateUrl: "templates/checkout.html",
                controller: 'CheckoutCtrl'
            }
        }
    })

    .state('app.cart', {
        url: "/cart",
        views: {
            'menuContent': {
                templateUrl: "templates/cart.html",
                controller: 'CartCtrl'
            }
        }
    })

    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: 'RegisterCtrl'
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('login-acc', {
        url: "/login-acc",
        templateUrl: "templates/login_acc.html",
        controller: 'LoginAccCtrl'
    })

    .state('app.customize', {
        url: "/customize",
        views: {
            'menuContent': {
                templateUrl: "templates/customize.html",
                controller: 'CustomizeCtrl'
            }
        }
    })
    .state('app.edit', {
        url: "/edit/:id",
        views: {
            'menuContent': {
                templateUrl: "templates/editpillow.html",
                controller: 'EditCtrl'
            }
        }
    })
    .state('app.editproduct', {
        url: "/editproduct",
        views: {
            'menuContent': {
                templateUrl: "templates/editproduct.html",
                controller: 'EditProductCtrl'
            }
        }
    })
        .state('app.time', {
            url: "/time",
            views: {
                'menuContent': {
                    templateUrl: "templates/time.html",
                    controller: 'CustomizeCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
})

.directive('dragbox', function() {
    return {
        link: function(scope, element, attr) {
            var lastdata = {};

            var myelem = {};
            var imagedim = {};


            function movetouches(data, element2, dimensions, what) {

                var margin = "";
                if (what == "height") {
                    margin = "margin-top";

                } else {
                    margin = "margin-left";
                }

                var newtouch = {
                    newx: 0,
                    newy: 0
                };
                var newx = 0;
                var newy = 0;
                if (data.x) {
                    newtouch.newx = data.x;
                    newtouch.newy = data.y;
                } else if (data.layerX && data.layerX != 0) {
                    newtouch.newx = data.layerX;
                    newtouch.newy = data.layerY;
                } else if (data.touches) {
                    newtouch.newx = data.touches[0].clientX;
                    newtouch.newy = data.touches[0].clientY;
                }
                if (lastdata.newx) {
                    if (!isdragger) {

                        var currentmargin = -1 * parseInt($(element2).css(margin));
                        if (what == "height") {
                            var changemargin = lastdata.newy - newtouch.newy;
                        } else {
                            var changemargin = lastdata.newx - newtouch.newx;
                        }

                        if ((changemargin >= 1 || changemargin <= -1) && (changemargin < 10 && changemargin > -10)) {
                            canceldrag();
                        };


                        if (what == "height") {
                            if (changemargin < 10 && changemargin > -10 && dimensions.differenceheight > (changemargin + currentmargin) && (changemargin + currentmargin) > 0) {
                                $(element2).css(margin, -1 * (changemargin + currentmargin));
                            } else if (changemargin < 10 && changemargin > -10 && dimensions.differenceheight <= (changemargin + currentmargin)) {
                                $(element2).css(margin, -1 * dimensions.differenceheight);
                            } else if (changemargin < 10 && changemargin > -10 && (changemargin + currentmargin) < 0) {
                                $(element2).css(margin, 0);
                            }
                        } else {
                            if (changemargin < 10 && changemargin > -10 && dimensions.differencewidth > (changemargin + currentmargin) && (changemargin + currentmargin) > 0) {
                                $(element2).css(margin, -1 * (changemargin + currentmargin));
                            } else if (changemargin < 10 && changemargin > -10 && dimensions.differencewidth <= (changemargin + currentmargin)) {
                                $(element2).css(margin, -1 * dimensions.differencewidth);
                            } else if (changemargin < 10 && changemargin > -10 && (changemargin + currentmargin) < 0) {
                                $(element2).css(margin, 0);
                            }

                        }


                    }
                }
                lastdata = newtouch;





            }

            function createwidthdragger(element2, dimensions) {

                ionic.on("touchmove", function(data) {
                    movetouches(data, element2, dimensions, "width");
                }, element2);
                ionic.on("mousemove", function(data) {
                    movetouches(data, element2, dimensions, "width");
                }, element2);
            }

            function createheightdragger(element2, dimensions) {



                ionic.on("touchmove", function(data) {
                    movetouches(data, element2, dimensions, "height");
                }, element2);
                ionic.on("mousemove", function(data) {
                    movetouches(data, element2, dimensions, "height");
                }, element2);
            }




            //            var myelem = {};
            //            var imagedim = {};
            $element = $(element);
            myelem.height = $element.height();
            myelem.width = $element.width();
            myelem.ratio = myelem.width / myelem.height;
            $element.children("img").load(function() {
                imagedim.height = $(this).height();
                imagedim.width = $(this).width();
                imagedim.ratio = imagedim.width / imagedim.height;

                if (myelem.ratio == imagedim.ratio) {
                    $(this).css("width", "100%");
//                    $(this).css("margin-left", "");
                } else if (myelem.ratio > imagedim.ratio) {
                    $(this).css("width", "100%");
//                    $(this).css("margin-left", "");
                    imagedim.same = "width";
                    console.log("width same");
                    imagedim.newwidth = myelem.width;
                    imagedim.newheight = imagedim.height * imagedim.newwidth / imagedim.width;
                    imagedim.differenceheight = imagedim.newheight - myelem.height;



                    createheightdragger(this, imagedim);
                } else {
                    $(this).css("height", "100%");
//                    $(this).css("margin-top", "");
//                    $(this).css("margin-left", "");
                    imagedim.same = "height";
                    console.log("height same");
                    imagedim.newheight = myelem.height;
                    imagedim.newwidth = imagedim.newheight * imagedim.width / imagedim.height;
                    imagedim.differencewidth = imagedim.newwidth - myelem.width;
                    createwidthdragger(this, imagedim);
                }

            });
        }
    };
})

.directive('myDraggable', function($document) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            image: '=drSrc'
        },
        template: '<img src="{{image.blob_url}}">',
        link: function(scope, element, attr) {
            var startX = 0,
                startY = 0,
                x = scope.image.x || 0,
                y = scope.image.y || 0;

            element.css({
                position: 'absolute',
                cursor: 'pointer',
                top: y + 'px',
                left: x + 'px'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;

                if (y < 0) {
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }
            }

            function mouseup() {
                $document.unbind('mousemove', mousemove);
                $document.unbind('mouseup', mouseup);
            }
        }

    }
})


.filter('imgpath', function () {
    return function (input) {
        if (input.slice(0, 3) == "htt") {
            return input;
        } else {
            return adminbase+"uploads/" + input;
        }
    };
})


.filter('timeFilter', function() {
    return function(value, max) {
        if (value == max) return 'All';
        var h = parseInt(value / 60);
        var m = parseInt(value % 60);
        var hStr = (h > 0) ? h >= 10 ? h : '0' + h : '00';
        var mStr = (m > 0) ? m >= 10 ? m : '0' + m : '00';
        var glue = (hStr && mStr) ? ':' : '';
        return hStr + glue + mStr;
    };
});



var formvalidation = function (allvalidation) {
    var isvalid2 = true;
    for (var i = 0; i < allvalidation.length; i++) {
        console.log("checking");
        console.log(allvalidation[i].field);
        if (allvalidation[i].field == "" || !allvalidation[i].field) {
            allvalidation[i].validation = "ng-dirty";
            isvalid2 = false;
        }
    }
    return isvalid2;
};

function partitionarray(myarray, number) {
    var arrlength = myarray.length;
    var newarray = [];
    var j = -1;
    for (var i = 0; i < arrlength; i++) {
        if (i % number == 0) {
            j++;
            newarray[j] = [];
        }
        newarray[j].push(myarray[i]);
    }
    return newarray;
};