"use strict";
var Logger_1 = require("../utils/Logger");
var User_1 = require("../model/User");
var StorageService_1 = require("./StorageService");
var Base64_1 = require("../utils/Base64");
var UserService = (function () {
    function UserService() {
        this.LOG = new Logger_1.Logger("UserService");
        this.storageService = StorageService_1.StorageService.instance();
        this.invalidData = false;
        this.alreadyParsed = false;
        this.updateWindowBeforeExpiration = 1800 * 1000;
    }
    UserService.instance = function () {
        return UserService.INSTANCE;
    };
    UserService.prototype.isUserLoggedIn = function () {
        var user = this.getUser();
        return !(user === undefined);
    };
    UserService.prototype.hasInvalidSessionData = function () {
        this.getUser();
        return this.invalidData;
    };
    UserService.prototype.isUserSessionExpired = function () {
        var user = this.getUser();
        var isExpired = false;
        if (user !== undefined) {
            isExpired = this.needsSessionUpdateRespectingLocalClockdrift(user.getExpireDate());
        }
        return isExpired;
    };
    UserService.prototype.getUser = function () {
        if (!this.alreadyParsed) {
            var rawData = this.storageService.getUserSessionData();
            if (rawData !== undefined) {
                this.user = this.parseUserFromRawData(rawData);
            }
            this.alreadyParsed = true;
        }
        return this.user;
    };
    UserService.prototype.isUpdateForced = function () {
        return this.storageService.getAndResetReauthState();
    };
    UserService.prototype.needsSessionUpdateRespectingLocalClockdrift = function (sessionExpireDate) {
        var localClockDrift = this.storageService.getLocalClockDrift();
        var nowFromServerPerspective = new Date().getTime() + localClockDrift;
        var sessionExpireTime = sessionExpireDate.getTime();
        return (nowFromServerPerspective - sessionExpireTime) > 0 - this.updateWindowBeforeExpiration;
    };
    UserService.prototype.parseUserFromRawData = function (data) {
        try {
            var urlsaveReplaced = data.replace("_", "/").replace("-", "+");
            var decodedData = Base64_1.Base64.decode(urlsaveReplaced);
            var userJson = this.extractPayloadJSON(decodedData);
            return new User_1.User(userJson.id, userJson.fn, userJson.ln, new Date(userJson.exp), userJson.a, userJson.p, data);
        }
        catch (e) {
            this.LOG.error("invalid/unparsable user session information value:", e);
            this.invalidData = true;
            return undefined;
        }
    };
    UserService.prototype.extractPayloadJSON = function (decodedValue) {
        var rawPayload = decodedValue.split("###")[0];
        return JSON.parse(rawPayload);
    };
    return UserService;
}());
UserService.INSTANCE = new UserService();
exports.UserService = UserService;
