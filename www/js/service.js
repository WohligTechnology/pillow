//var adminbase = "http://192.168.2.11/pillowbackend/pillow/";
var adminbase = "http://wohlig.co.in/tweeke/";
var myserverbase = "http://wohlig.co.in/spingr/index.php/json/";
//var adminbase = "http://192.168.2.28/osb/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";

var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function($http) {

    //    user = $.jStorage.get("user");
    var returnval = {};
    

    returnval.getFacebook = function() {
        return "hello";
    }
    returnval.checkLogin = function(type) {
        return $http.get(adminhauth + "checkLogin", {
            params: {
                type: type
            }
        });
    }
    returnval.getFacebookImages = function() {
        return $http.get(adminhauth + "getFacebookImages");
    }
    returnval.getInstagramImages = function() {
        return $http.get(adminhauth + "getInstagramImages");
    }
    returnval.checkLogid = function(logid) {
        return $http.get(adminhauth + "checkLogid", {
            params: {
                logid: logid
            }
        });
    }
    returnval.setUser = function(data) {
        return $.jStorage.set("user", data);
    }
    returnval.getUser = function() {
        return $.jStorage.get("user");
    }
    returnval.authenticate = function(data) {
        return $http.get(adminurl + "authenticate");
    }
    returnval.logout = function(data) {
        return $http.get(adminurl + "logout");
    }
    returnval.logoutJstorage = function() {
        $.jStorage.flush();
    }
    returnval.setImages = function(data) {
        $.jStorage.set("pillowImages", data);
    }
    returnval.getImages = function(data) {
        return $.jStorage.get("pillowImages");
    }
    returnval.signup = function(data, callback) {
        $http({
            url: adminurl + "signup",
            method: "POST",
            data: {
                "email": data.email,
                "password": data.password
            }
        }).success(callback);
    }
    returnval.login = function(data, callback) {
        $http({
            url: adminurl + "login",
            method: "POST",
            data: {
                "email": data.email,
                "password": data.password
            }
        }).success(callback);
    }

    return returnval;
});