
// enable 'document' and 'window' in mocha tests
require('jsdom-global')();

import {User} from "../../src/model/User";
import {UserService} from "../../src/service/UserService";
import {expect} from "chai";

describe("UserService Tests", (): any => {

    const loggedInUserCookie: string = "userdata=eyJpZCI6IkFTQUcxOTg1NzAxIiwiZm4iOm51bGwsImV4cCI6MTQ2Mj" +
        "k1OTAyMTgzNCwibG4iOm51bGx9IyMjZDg3NjUyZjBlMDZmN2ZiYzRmMjAwM2UyZGUxZDVhZDhiNWQyYWRhZg==";
    const reauthCookie: string = " lolareauth=t";

    afterEach(() => {
        document.cookie = "userdata=xxx;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        UserService.INSTANCE = new UserService();
    });

    it("should get instance of userservice", () => {
        expect(UserService.instance()).to.not.be.null;
    });

    it("should read user from usersession", () => {
        document.cookie = "userdata=eyJpZCI6IkFTQUcxOTg1NzAxIiwiZm4iOm51bGwsImV4cCI6MTQ2Mjk1OTAyMTgz" +
            "NCwibG4iOm51bGx9IyMjZDg3NjUyZjBlMDZmN2ZiYzRmMjAwM2UyZGUxZDVhZDhiNWQyYWRhZg==";
        const user: User = UserService.instance().getUser();
        expect(user.getSsoId()).to.equal("ASAG1985701");
    });

    it("should detect user as logged out if no usersession is present", () => {
        expect(UserService.instance().isUserLoggedIn()).to.be.false;
    });

    it("should detect user as logged in if usersession is present", () => {
        document.cookie = loggedInUserCookie;
        expect(UserService.instance().isUserLoggedIn()).to.be.true;
    });

    it("should detect user as logged out if no usersession is present", () => {
        expect(UserService.instance().isUserLoggedIn()).to.be.false;
    });

    it("should detect user with invalid session data", () => {
        document.cookie = "userdata=eyJzc29JZCI6IkFTQUcxOTg1NzAsdfsdxIiwiZmlyc3RuYW1lIjpudWxsLCJleHBpcmVzIjoxNDYyOTU5" +
            "MDIxODM0LCJsYXN0bmFtZSI6bnVsbH0jIyNkODc2NTJmMGUwNmY3ZmJjNGYyMDAzZTJkZTFkNWFkOGI1ZDJhZGFm";
        expect(UserService.instance().hasInvalidSessionData()).to.be.true;
    });

    it("should detect user with expired session data", () => {
        document.cookie = loggedInUserCookie;
        const userService: UserService = UserService.instance();
        const user: User = userService.getUser();
        const calculatedClockDrift: number =  -(new Date().getTime() - user.getExpireDate().getTime()); // now == the expiretime
        document.cookie = "lolacd=" + calculatedClockDrift;
        expect(userService.isUserSessionExpired()).to.be.true;
    });

    it("should detect user with non expired session data", () => {
        document.cookie = loggedInUserCookie;
        const userService: UserService = UserService.instance();
        const user: User = userService.getUser();
        const cd: number =  -(new Date().getTime() - user.getExpireDate().getTime()) - (1810 * 1000); // now 1810s before expiretime
        document.cookie = " lolacd=" + cd;
        expect(userService.isUserSessionExpired()).to.be.false;
    });

    it("should trigger session update for expirationtime in update window", () => {
        document.cookie = loggedInUserCookie;
        const userService: UserService = UserService.instance();
        const user: User = userService.getUser();
        const calculatedClockDrift: number =  -(new Date().getTime() - user.getExpireDate().getTime()) - (1740 * 1000); //1740s before exp
        document.cookie = " lolacd=" + calculatedClockDrift;
        expect(userService.isUserSessionExpired()).to.be.true;
    });

    it("should update user products if update is forced", () => {
        document.cookie = loggedInUserCookie;
        document.cookie = reauthCookie;
        const userService: UserService = UserService.instance();
        const user: User = userService.getUser();
        const cd: number =  -(new Date().getTime() - user.getExpireDate().getTime()) - (1810 * 1000); // now 1810s before expiretime
        document.cookie = " lolacd=" + cd;
        expect(userService.isUpdateForced()).to.be.true;
    });


});
