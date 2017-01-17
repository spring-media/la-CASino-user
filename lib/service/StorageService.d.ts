export declare class StorageService {
    private static SESSION_COOKIE_NAME;
    private static CLOCKDRIFT_COOKIE_NAME;
    private static REAUTH_COOKIE_NAME;
    private static FEATURE_LOGGING_COOKIE_NAME;
    private static INSTANCE;
    static instance(): StorageService;
    getUserSessionData(): string;
    getCookieValue(cookiename: string): string;
    hasCookie(cookiename: string): boolean;
    getLocalClockDrift(): number;
    getFeatureLoggingState(): string;
    deleteCookie(cookiename: string): void;
    getAndResetReauthState(): boolean;
}
