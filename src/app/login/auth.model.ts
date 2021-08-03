export class Auth{
    public authid: number;
    public loginid: number;
    public token: string;
    public timestamp: string;

    constructor(authid: number, loginid: number, token: string, timestamp: string){
        this.authid = authid;
        this.loginid = loginid;
        this.token = token;
        this.timestamp = timestamp;
    }
}