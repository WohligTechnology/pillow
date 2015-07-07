// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
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

.config(function ($stateProvider, $urlRouterProvider) {
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
    $urlRouterProvider.otherwise('/app/home');
})

.filter('timeFilter', function () {
    return function (value, max) {
      if (value == max) return 'All';
      var h = parseInt(value / 60);
      var m = parseInt(value % 60);
      var hStr = (h > 0) ? h >= 10 ? h  : '0' + h : '00';
      var mStr = (m > 0) ? m >= 10 ? m  : '0' + m : '00';
      var glue = (hStr && mStr) ? ':' : '';
      return hStr + glue + mStr;
    };
  });