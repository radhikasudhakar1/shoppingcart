export class Cart{
    public loginid: number;
    public details = new Map();

    constructor(loginid: number, details: any){
        this.loginid = loginid;
        this.details = details;
    }
}