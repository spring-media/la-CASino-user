export declare class User {
    private exp;
    private id;
    private fn;
    private ln;
    private a;
    private p;
    private token;
    constructor(id: string, fn: string, ln: string, exp: Date, a: boolean, p: string[], token: string);
    getSsoId(): string;
    getExpireDate(): Date;
    getFirstName(): string;
    getLastName(): string;
    isActivated(): boolean;
    getProducts(): string[];
    getToken(): string;
}
