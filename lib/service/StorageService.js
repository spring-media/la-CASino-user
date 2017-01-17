"use strict";
var StorageService = (function () {
    function StorageService() {
    }
    StorageService.instance = function () {
        return StorageService.INSTANCE;
    };
    StorageService.prototype.getUserSessionData = function () {
        if (this.hasCookie(StorageService.SESSION_COOKIE_NAME)) {
            return this.getCookieValue(StorageService.SESSION_COOKIE_NAME);
        }
        return undefined;
    };
    StorageService.prototype.getCookieValue = function (cookiename) {
        var re = new RegExp("[; ]" + cookiename + "=([^\\s;]*)");
        var sMatch = (" " + document.cookie).match(re);
        if (cookiename && sMatch) {
            return decodeURI(sMatch[1]);
        }
        return "";
    };
    StorageService.prototype.hasCookie = function (cookiename) {
        return document.cookie.indexOf(cookiename + "=") !== -1;
    };
    StorageService.prototype.getLocalClockDrift = function () {
        if (this.hasCookie(StorageService.CLOCKDRIFT_COOKIE_NAME)) {
            return parseInt(this.getCookieValue(StorageService.CLOCKDRIFT_COOKIE_NAME), 10);
        }
        return 0;
    };
    StorageService.prototype.getFeatureLoggingState = function () {
        return this.getCookieValue(StorageService.FEATURE_LOGGING_COOKIE_NAME);
    };
    StorageService.prototype.deleteCookie = function (cookiename) {
        document.cookie = cookiename + "=; path=/; domain=welt.de; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    };
    StorageService.prototype.getAndResetReauthState = function () {
        if (this.hasCookie(StorageService.REAUTH_COOKIE_NAME)) {
            this.deleteCookie(StorageService.REAUTH_COOKIE_NAME);
            return true;
        }
        return false;
    };
    return StorageService;
}());
StorageService.SESSION_COOKIE_NAME = "userdata";
StorageService.CLOCKDRIFT_COOKIE_NAME = "lolacd";
StorageService.REAUTH_COOKIE_NAME = "lolareauth";
StorageService.FEATURE_LOGGING_COOKIE_NAME = "featureLogging";
StorageService.INSTANCE = new StorageService();
exports.StorageService = StorageService;
