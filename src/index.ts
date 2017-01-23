import {UserService} from "./service/UserService";
import {StorageService} from "./service/StorageService";
import {User} from "./model/User";

export {User} from "./model/User";

export function getUser(): User {
    return UserService.instance().getUser();
}

export function getUserProducts(): Array<string> {
    return getUser().getProducts();
}

export function isUserLoggedIn(): boolean {
    return UserService.instance().isUserLoggedIn();
}

export function isUpdateForced(): boolean {
    return UserService.instance().isUpdateForced();
}

export function isUserSessionExpired(): boolean {
    return UserService.instance().isUserSessionExpired();
}

export function hasCookie(cookiename: string): boolean {
    return StorageService.instance().hasCookie(cookiename);
}

export function getCookieValue(cookiename: string): string {
    return StorageService.instance().getCookieValue(cookiename);
}

export function getFeatureLoggingState(): string {
    return StorageService.instance().getFeatureLoggingState();
}