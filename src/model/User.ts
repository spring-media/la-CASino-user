export class User {

    private exp: Date; //expire Date
    private id: string; //SsoId
    private fn: string; //fistName
    private ln: string; //lastName
    private a:  boolean; //activated
    private p: string[]; // products
    private token: string;

    constructor(id: string, fn: string, ln: string, exp: Date, a: boolean, p: string[], token: string) {
        this.id = id;
        this.fn = fn;
        this.ln = ln;
        this.exp = exp;
        this.a = a;
        this.p = p;
        this.token = token;
    }

    public getSsoId(): string {
        return this.id;
    }
    public getExpireDate(): Date {
        return this.exp;
    }
    public getFirstName(): string {
        return this.fn;
    }
    public getLastName(): string {
        return this.ln;
    }
    public isActivated(): boolean {
        return this.a;
    }
    public getProducts(): string[] {
        return this.p;
    }
    public getToken(): string {
        return this.token;
    }
}
