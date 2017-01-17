"use strict";
var StorageService_1 = require("../service/StorageService");
var Logger = (function () {
    function Logger(name) {
        this.loggingPrefix = "[casino]";
        this.storageService = StorageService_1.StorageService.instance();
        this.name = name;
        this.logLevel = process && process.pid ? "FATAL" : "DEBUG";
        this.loggingEnabled = this.storageService.getFeatureLoggingState();
        this.debug = this.isDebugEnabled() ?
            console.log.bind(window.console, "[DEBUG]" + this.getLoggerName()) :
            function () { return; };
        this.error = this.isErrorEnabled() ?
            console.error.bind(window.console, "[ERROR]" + this.getLoggerName()) :
            function () { return; };
    }
    Logger.prototype.isDebugEnabled = function () {
        return this.logLevel === "DEBUG" && this.loggingEnabled === "true";
    };
    Logger.prototype.isErrorEnabled = function () {
        return (this.logLevel === "DEBUG" || this.logLevel === "ERROR") && this.loggingEnabled === "true";
    };
    Logger.prototype.getLoggerName = function () {
        return this.loggingPrefix + "[" + this.name + "] ";
    };
    return Logger;
}());
exports.Logger = Logger;
