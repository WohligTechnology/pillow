//var adminbase = "http://localhost/pillowbackend/pillow/";
var adminbase = "http://wohlig.co.in/tweeke/";
var myserverbase = "http://wohlig.co.in/spingr/index.php/json/";
//var adminbase = "http://192.168.2.28/osb/";
var adminurl = adminbase + "index.php/json/";
var adminhauth = adminbase + "index.php/hauth/";

var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};

var cart = 9;
var countries = [{
        "value": "Please Select"
    }, {
        "value": "Afganistan"
    }, {
        "value": "Albania"
    }, {
        "value": "Algeria"
    }, {
        "value": "American Samoa"
    }, {
        "value": "Andorra"
    }, {
        "value": "Angola"
    }, {
        "value": "Anguilla"
    }, {
        "value": "Antigua &amp; Ba"
    }, {
        "value": "Argentina"
    }, {
        "value": "Armenia"
    }, {
        "value": "Aruba"
    }, {
        "value": "Australia"
    }, {
        "value": "Austria"
    }, {
        "value": "Azerbaijan"
    }, {
        "value": "Bahamas"
    }, {
        "value": "Bahrain"
    }, {
        "value": "Bangladesh"
    }, {
        "value": "Barbados"
    }, {
        "value": "Belarus"
    }, {
        "value": "Belgium"
    }, {
        "value": "Belize"
    }, {
        "value": "Benin"
    }, {
        "value": "Bermuda"
    }, {
        "value": "Bhutan"
    }, {
        "value": "Bolivia"
    }, {
        "value": "Bonaire"
    }, {
        "value": "Bosnia &amp; Herzegovina"
    }, {
        "value": "Botswana"
    }, {
        "value": "Brazil"
    }, {
        "value": "British Indian Ocean Ter"
    }, {
        "value": "Brunei"
    }, {
        "value": "Bulgaria"
    }, {
        "value": "Burkina Faso"
    }, {
        "value": "Burundi"
    }, {
        "value": "Cambodia"
    }, {
        "value": "Cameroon"
    }, {
        "value": "Canada"
    }, {
        "value": "Canary Islands"
    }, {
        "value": "Cape Verde"
    }, {
        "value": "Cayman Islands"
    }, {
        "value": "Central African Republic"
    }, {
        "value": "Chad"
    }, {
        "value": "Channel Islands"
    }, {
        "value": "Chile"
    }, {
        "value": "China"
    }, {
        "value": "Christmas Island"
    }, {
        "value": "Cocos Island"
    }, {
        "value": "Colombia"
    }, {
        "value": "Comoros"
    }, {
        "value": "Congo"
    }, {
        "value": "Cook Islands"
    }, {
        "value": "Costa Rica"
    }, {
        "value": "Cote DIvoire"
    }, {
        "value": "Croatia"
    }, {
        "value": "Cuba"
    }, {
        "value": "Curacao"
    }, {
        "value": "Cyprus"
    }, {
        "value": "Czech Republic"
    }, {
        "value": "Denmark"
    }, {
        "value": "Djibouti"
    }, {
        "value": "Dominica"
    }, {
        "value": "Dominican Republic"
    }, {
        "value": "East Timor"
    }, {
        "value": "Ecuador"
    }, {
        "value": "Egypt"
    }, {
        "value": "El Salvador"
    }, {
        "value": "Equatorial Guinea"
    }, {
        "value": "Eritrea"
    }, {
        "value": "Estonia"
    }, {
        "value": "Ethiopia"
    }, {
        "value": "Falkland Islands"
    }, {
        "value": "Faroe Islands"
    }, {
        "value": "Fiji"
    }, {
        "value": "Finland"
    }, {
        "value": "France"
    }, {
        "value": "French Guiana"
    }, {
        "value": "French Polynesia"
    }, {
        "value": "French Southern Ter"
    }, {
        "value": "Gabon"
    }, {
        "value": "Gambia"
    }, {
        "value": "Georgia"
    }, {
        "value": "Germany"
    }, {
        "value": "Ghana"
    }, {
        "value": "Gibraltar"
    }, {
        "value": "Great Britain"
    }, {
        "value": "Greece"
    }, {
        "value": "Greenland"
    }, {
        "value": "Grenada"
    }, {
        "value": "Guadeloupe"
    }, {
        "value": "Guam"
    }, {
        "value": "Guatemala"
    }, {
        "value": "Guinea"
    }, {
        "value": "Guyana"
    }, {
        "value": "Haiti"
    }, {
        "value": "Hawaii"
    }, {
        "value": "Honduras"
    }, {
        "value": "Hong Kong"
    }, {
        "value": "Hungary"
    }, {
        "value": "Iceland"
    }, {
        "value": "India"
    }, {
        "value": "Indonesia"
    }, {
        "value": "Iran"
    }, {
        "value": "Iraq"
    }, {
        "value": "Ireland"
    }, {
        "value": "Isle of Man"
    }, {
        "value": "Israel"
    }, {
        "value": "Italy"
    }, {
        "value": "Jamaica"
    }, {
        "value": "Japan"
    }, {
        "value": "Jordan"
    }, {
        "value": "Kazakhstan"
    }, {
        "value": "Kenya"
    }, {
        "value": "Kiribati"
    }, {
        "value": "Korea North"
    }, {
        "value": "Korea South"
    }, {
        "value": "Kuwait"
    }, {
        "value": "Kyrgyzstan"
    }, {
        "value": "Laos"
    }, {
        "value": "Latvia"
    }, {
        "value": "Lebanon"
    }, {
        "value": "Lesotho"
    }, {
        "value": "Liberia"
    }, {
        "value": "Libya"
    }, {
        "value": "Liechtenstein"
    }, {
        "value": "Lithuania"
    }, {
        "value": "Luxembourg"
    }, {
        "value": "Macau"
    }, {
        "value": "Macedonia"
    }, {
        "value": "Madagascar"
    }, {
        "value": "Malaysia"
    }, {
        "value": "Malawi"
    }, {
        "value": "Maldives"
    }, {
        "value": "Mali"
    }, {
        "value": "Malta"
    }, {
        "value": "Marshall Islands"
    }, {
        "value": "Martinique"
    }, {
        "value": "Mauritania"
    }, {
        "value": "Mauritius"
    }, {
        "value": "Mayotte"
    }, {
        "value": "Mexico"
    }, {
        "value": "Midway Islands"
    }, {
        "value": "Moldova"
    }, {
        "value": "Monaco"
    }, {
        "value": "Mongolia"
    }, {
        "value": "Montserrat"
    }, {
        "value": "Morocco"
    }, {
        "value": "Mozambique"
    }, {
        "value": "Myanmar"
    }, {
        "value": "Nambia"
    }, {
        "value": "Nauru"
    }, {
        "value": "Nepal"
    }, {
        "value": "Netherland Antilles"
    }, {
        "value": "Netherlands (Holland, Europe)"
    }, {
        "value": "Nevis"
    }, {
        "value": "New Caledonia"
    }, {
        "value": "New Zealand"
    }, {
        "value": "Nicaragua"
    }, {
        "value": "Niger"
    }, {
        "value": "Nigeria"
    }, {
        "value": "Niue"
    }, {
        "value": "Norfolk Island"
    }, {
        "value": "Norway"
    }, {
        "value": "Oman"
    }, {
        "value": "Pakistan"
    }, {
        "value": "Palau Island"
    }, {
        "value": "Palestine"
    }, {
        "value": "Panama"
    }, {
        "value": "Papua New Guinea"
    }, {
        "value": "Paraguay"
    }, {
        "value": "Peru"
    }, {
        "value": "Philippines"
    }, {
        "value": "Pitcairn Island"
    }, {
        "value": "Poland"
    }, {
        "value": "Portugal"
    }, {
        "value": "Puerto Rico"
    }, {
        "value": "Qatar"
    }, {
        "value": "Republic of Montenegro"
    }, {
        "value": "Republic of Serbia"
    }, {
        "value": "Reunion"
    }, {
        "value": "Romania"
    }, {
        "value": "Russia"
    }, {
        "value": "Rwanda"
    }, {
        "value": "St Barthelemy"
    }, {
        "value": "St Eustatius"
    }, {
        "value": "St Helena"
    }, {
        "value": "St Kitts-Nevis"
    }, {
        "value": "St Lucia"
    }, {
        "value": "St Maarten"
    }, {
        "value": "St Pierre &amp; Miquelon"
    }, {
        "value": "St Vincent &amp; Grenadines"
    }, {
        "value": "Saipan"
    }, {
        "value": "Samoa"
    }, {
        "value": "Samoa American"
    }, {
        "value": "San Marino"
    }, {
        "value": "Sao Tome &amp; Principe"
    }, {
        "value": "Saudi Arabia"
    }, {
        "value": "Senegal"
    }, {
        "value": "Serbia"
    }, {
        "value": "Seychelles"
    }, {
        "value": "Sierra Leone"
    }, {
        "value": "Singapore"
    }, {
        "value": "Slovakia"
    }, {
        "value": "Slovenia"
    }, {
        "value": "Solomon Islands"
    }, {
        "value": "Somalia"
    }, {
        "value": "South Africa"
    }, {
        "value": "Spain"
    }, {
        "value": "Sri Lanka"
    }, {
        "value": "Sudan"
    }, {
        "value": "Suriname"
    }, {
        "value": "Swaziland"
    }, {
        "value": "Sweden"
    }, {
        "value": "Switzerland"
    }, {
        "value": "Syria"
    }, {
        "value": "Tahiti"
    }, {
        "value": "Taiwan"
    }, {
        "value": "Tajikistan"
    }, {
        "value": "Tanzania"
    }, {
        "value": "Thailand"
    }, {
        "value": "Togo"
    }, {
        "value": "Tokelau"
    }, {
        "value": "Tonga"
    }, {
        "value": "Trinidad &amp; Tobago"
    }, {
        "value": "Tunisia"
    }, {
        "value": "Turkey"
    }, {
        "value": "Turkmenistan"
    }, {
        "value": "Turks &amp; Caicos Is"
    }, {
        "value": "Tuvalu"
    }, {
        "value": "Uganda"
    }, {
        "value": "Ukraine"
    }, {
        "value": "United Arab Emirates"
    }, {
        "value": "United Kingdom"
    }, {
        "value": "United States of America"
    }, {
        "value": "Uruguay"
    }, {
        "value": "Uzbekistan"
    }, {
        "value": "Vanuatu"
    }, {
        "value": "Vatican City State"
    }, {
        "value": "Venezuela"
    }, {
        "value": "Vietnam"
    }, {
        "value": "Virgin Islands (Brit)"
    }, {
        "value": "Virgin Islands (USA)"
    }, {
        "value": "Wake Island"
    }, {
        "value": "Wallis &amp; Futana Is"
    }, {
        "value": "Yemen"
    }, {
        "value": "Zaire"
    }, {
        "value": "Zambia"
    }, {
        "value": "Zimbabwe"
    }
];

myservices.factory('MyServices', function($http) {

	
    var obj = {};
    obj.badge = 9;
    //    user = $.jStorage.get("user");
    var returnval = {};
    

    returnval.setBadge = function(val) {
        obj.badge = val;
    }
    returnval.getBadge = function() {
        return obj;
    }
    returnval.getFacebook = function() {
        return "hello";
    }
    returnval.getCountries = function() {
        return countries;
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
    returnval.getcountofcartbyuser = function() {
        return $http.get(adminurl + "getcountofcartbyuser?userid="+$.jStorage.get("user").id);
    }
    returnval.addtocartagain = function(id) {
        return $http.get(adminurl + "pendingaddtocart?orderproductid="+id);
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
	    $http.get(adminurl + "getcountofcartbyuser?userid="+data.id).success(function(data){
		    console.log("user cart");
		    console.log(data);
		    $.jStorage.set("cart", parseInt(data));
	    });
        return $.jStorage.set("user", data);
    }
    returnval.getorderproductbyuser = function(page) {
	    return $http.get(adminurl + "getorderproductbyuser?userid="+$.jStorage.get("user").id+"&pageno="+page);
    }
    returnval.deletecartbyid = function(id) {
	    return $http.get(adminurl + "deletecartbyid?id="+id);
    }
    returnval.getUser = function() {
        return $.jStorage.get("user");
    }
    returnval.getCart = function() {
	    $http.get(adminurl + "getcountofcartbyuser?userid="+$.jStorage.get("user").id).success(function(data){
//		    cart = data.queryresult.length;
		    $.jStorage.set("cart", parseInt(data));
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
    returnval.logout = function() {
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
    returnval.userCheckout = function(data) {
        return $http({
            url: adminurl + "placeorder",
            method: "POST",
            data: data
        });
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