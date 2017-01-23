"use strict";
var UserService_1 = require("./service/UserService");
var StorageService_1 = require("./service/StorageService");
var User_1 = require("./model/User");
exports.User = User_1.User;
function getUser() {
    return UserService_1.UserService.instance().getUser();
}
exports.getUser = getUser;
function getUserProducts() {
    return getUser().getProducts();
}
exports.getUserProducts = getUserProducts;
function isUserLoggedIn() {
    return UserService_1.UserService.instance().isUserLoggedIn();
}
exports.isUserLoggedIn = isUserLoggedIn;
function isUpdateForced() {
    return UserService_1.UserService.instance().isUpdateForced();
}
exports.isUpdateForced = isUpdateForced;
function isUserSessionExpired() {
    return UserService_1.UserService.instance().isUserSessionExpired();
}
exports.isUserSessionExpired = isUserSessionExpired;
function hasCookie(cookiename) {
    return StorageService_1.StorageService.instance().hasCookie(cookiename);
}
exports.hasCookie = hasCookie;
function getCookieValue(cookiename) {
    return StorageService_1.StorageService.instance().getCookieValue(cookiename);
}
exports.getCookieValue = getCookieValue;
function getFeatureLoggingState() {
    return StorageService_1.StorageService.instance().getFeatureLoggingState();
}
exports.getFeatureLoggingState = getFeatureLoggingState;
