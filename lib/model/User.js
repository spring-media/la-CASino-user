"use strict";
var User = (function () {
    function User(id, fn, ln, exp, a, p, token) {
        this.id = id;
        this.fn = fn;
        this.ln = ln;
        this.exp = exp;
        this.a = a;
        this.p = p;
        this.token = token;
    }
    User.prototype.getSsoId = function () {
        return this.id;
    };
    User.prototype.getExpireDate = function () {
        return this.exp;
    };
    User.prototype.getFirstName = function () {
        return this.fn;
    };
    User.prototype.getLastName = function () {
        return this.ln;
    };
    User.prototype.isActivated = function () {
        return this.a;
    };
    User.prototype.getProducts = function () {
        return this.p;
    };
    User.prototype.getToken = function () {
        return this.token;
    };
    return User;
}());
exports.User = User;
