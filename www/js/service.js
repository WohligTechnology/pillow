var adminbase = "http://localhost/pillowbackend/pillow/";
//var adminbase = "http://wohlig.co.in/tweeke/";
var myserverbase = "http://wohlig.co.in/spingr/index.php/json/";
//var adminbase = "http://192.168.2.28/osb/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";

var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};
var cart = $.jStorage.get("cart");
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
    returnval.getProduct = function() {
        return $http.get(adminurl + "getallproducts");
    }
    returnval.getallcartbyuser = function(page) {
        return $http.get(adminurl + "getallcartbyuser?userid="+$.jStorage.get("user").id+"&pageno="+page);
    }
    returnval.getuserproductcartbyid = function(id) {
        return $http.get(adminurl + "getuserproductcartbyid?id="+id);
    }
    returnval.checkLogid = function(logid) {
        return $http.get(adminhauth + "checkLogid", {
            params: {
                logid: logid
            }
        });
    }
    returnval.setUser = function(data) {
	    $http.get(adminurl + "getallcartbyuser?userid="+data.id).success(function(data){
		    cart = data.queryresult.length;
		    $.jStorage.set("cart", cart);
	    });
        return $.jStorage.set("user", data);
    }
    returnval.getUser = function() {
        return $.jStorage.get("user");
    }
    returnval.getCart = function() {
	    $http.get(adminurl + "getallcartbyuser?userid="+$.jStorage.get("user").id).success(function(data){
		    cart = data.queryresult.length;
		    $.jStorage.set("cart", cart);
	    });
	    
        return $.jStorage.get("cart");
    }
    returnval.setCart = function() {
	    cart = $.jStorage.get("cart") + 1;
        return $.jStorage.set("cart", cart);
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
    returnval.getImages = function() {
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
    returnval.addtocart  = function(data, callback) {
        $http({
            url: adminurl + "addtocart",
            method: "POST",
            data: data
        }).success(callback);
    }
    returnval.editcart  = function(data, callback) {
        $http({
            url: adminurl + "editcart",
            method: "POST",
            data: data
        }).success(callback);
    }

    return returnval;
});