var adminbase = "http://wohlig.co.in/osb/";
var myserverbase = "http://wohlig.co.in/spingr/index.php/json/";
//var adminbase = "http://192.168.2.28/osb/";
var adminurl = adminbase + "index.php/json/";
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

    return returnval;
});