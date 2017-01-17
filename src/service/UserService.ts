import {Logger} from "../utils/Logger";
import {User} from "../model/User";
import {StorageService} from "./StorageService";
import {Base64} from "../utils/Base64";

export class UserService {

    public static INSTANCE: UserService = new UserService();

    private LOG: Logger = new Logger("UserService");
    private storageService: StorageService = StorageService.instance();

    private user: User;
    private invalidData: boolean = false;
    private alreadyParsed: boolean = false;
    private updateWindowBeforeExpiration: number = 1800 * 1000;

    public static instance(): UserService {
        return UserService.INSTANCE;
    }

    public isUserLoggedIn(): boolean {
        const user: User = this.getUser();
        return !(user === undefined);
    }

    public hasInvalidSessionData(): boolean {
        this.getUser();
        return this.invalidData;
    }

    public  isUserSessionExpired(): boolean {
        const user: User = this.getUser();
        let isExpired: boolean = false;
        if (user !== undefined) {
            isExpired = this.needsSessionUpdateRespectingLocalClockdrift(user.getExpireDate());
        }
        return isExpired;
    }

    public getUser(): User {
        if (!this.alreadyParsed) {
            const rawData: string = this.storageService.getUserSessionData();
            if (rawData !== undefined) {
                this.user = this.parseUserFromRawData(rawData);
            }
            this.alreadyParsed = true;
        }
        return this.user;
    }

    public isUpdateForced(): boolean {
        return this.storageService.getAndResetReauthState();
    }


    private needsSessionUpdateRespectingLocalClockdrift(sessionExpireDate: Date): boolean {
        const localClockDrift: number = this.storageService.getLocalClockDrift();
        const nowFromServerPerspective: number = new Date().getTime() + localClockDrift;
        const sessionExpireTime: number = sessionExpireDate.getTime();
        return (nowFromServerPerspective - sessionExpireTime) > 0 - this.updateWindowBeforeExpiration;
    }

    private parseUserFromRawData(data: string): User {
        try {
            const urlsaveReplaced: string = data.replace("_", "/").replace("-", "+");
            const decodedData: string = Base64.decode(urlsaveReplaced);
            const userJson: any = this.extractPayloadJSON(decodedData);
            return new User(userJson.id, userJson.fn, userJson.ln, new Date(userJson.exp), userJson.a, userJson.p, data);
        } catch (e) {
            this.LOG.error("invalid/unparsable user session information value:", e);
            this.invalidData = true;
            return undefined;
        }
    }

    private extractPayloadJSON(decodedValue: string): any {
        const rawPayload: string = decodedValue.split("###")[0];
        return JSON.parse(rawPayload);
    }
}
