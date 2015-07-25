var adminbase = "http://wohlig.co.in/tweeke";
var myserverbase = "http://wohlig.co.in/spingr/index.php/json/";
//var adminbase = "http://192.168.2.28/osb/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";

var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {

    //    user = $.jStorage.get("user");
    var returnval = {};
    returnval.login = function () {
        return "hello";
    };

    returnval.getFacebook = function () {
        return "hello";
    };
    returnval.checkLogin = function (type) {
        return $http.get(adminhauth + "checkLogin", {
            params: {
                type: type
            }
        });
    }
    returnval.getFacebookImages = function () {
        return $http.get(adminhauth + "getFacebookImages");
    }
    returnval.getInstagramImages = function () {
        return $http.get(adminhauth + "getInstagramImages");
    }
    returnval.checkLogid=function(logid) {
        return $http.get(adminhauth + "checkLogid",{params:{logid:logid}});
    }

    return returnval;
});