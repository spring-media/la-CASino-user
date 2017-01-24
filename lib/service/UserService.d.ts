import { User } from "../model/User";
export declare class UserService {
    static INSTANCE: UserService;
    private LOG;
    private storageService;
    private user;
    private invalidData;
    private updateWindowBeforeExpiration;
    static instance(): UserService;
    isUserLoggedIn(): boolean;
    hasInvalidSessionData(): boolean;
    isUserSessionExpired(): boolean;
    getUser(): User;
    isUpdateForced(): boolean;
    private needsSessionUpdateRespectingLocalClockdrift(sessionExpireDate);
    private parseUserFromRawData(data);
    private extractPayloadJSON(decodedValue);
}
