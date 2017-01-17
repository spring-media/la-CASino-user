export class StorageService {

    private static SESSION_COOKIE_NAME: string = "userdata";
    private static CLOCKDRIFT_COOKIE_NAME: string = "lolacd";
    private static REAUTH_COOKIE_NAME: string = "lolareauth";
    private static FEATURE_LOGGING_COOKIE_NAME: string = "featureLogging";
    private static INSTANCE: StorageService = new StorageService();

    public static instance(): StorageService {
        return StorageService.INSTANCE;
    }

    public getUserSessionData(): string {
        if (this.hasCookie(StorageService.SESSION_COOKIE_NAME)) {
            return this.getCookieValue(StorageService.SESSION_COOKIE_NAME);
        }
        return undefined;
    }

    public getCookieValue(cookiename: string): string {
        const re: RegExp = new RegExp("[; ]" + cookiename + "=([^\\s;]*)");
        const sMatch: RegExpMatchArray = (" " + document.cookie).match(re);
        if (cookiename && sMatch) {
            return decodeURI(sMatch[1]);
        }
        return "";
    }

    public hasCookie(cookiename: string): boolean {
        return document.cookie.indexOf(cookiename + "=") !== -1;
    }

    public getLocalClockDrift(): number {
        if (this.hasCookie(StorageService.CLOCKDRIFT_COOKIE_NAME)) {
            return parseInt(this.getCookieValue(StorageService.CLOCKDRIFT_COOKIE_NAME), 10);
        }
        return 0;
    }

    public getFeatureLoggingState(): string {
        return this.getCookieValue(StorageService.FEATURE_LOGGING_COOKIE_NAME);
    }

    public deleteCookie(cookiename: string): void {
        document.cookie = cookiename + "=; path=/; domain=welt.de; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }

    public getAndResetReauthState(): boolean {
        if (this.hasCookie(StorageService.REAUTH_COOKIE_NAME)) {
            this.deleteCookie(StorageService.REAUTH_COOKIE_NAME);
            return true;
        }
        return false;
    }



}
