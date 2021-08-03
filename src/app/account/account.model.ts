export class Account {
    public accountid: number;
    public loginid: number;
    public firstname: string;
    public lastname: string;
    public emailid: string;
    public address: string;
    public city: string;
    public state: string;
    public postal: number;
    public country: string;
    public language: string;
    public phone: number;

    constructor(accountid: number, loginid: number, firstname: string, lastname: string, emailid: string,address: string,city: string,state: string,postal: number,country: string,language: string,phone: number){
        this.accountid = accountid;
        this.loginid = loginid;
        this.firstname = firstname;
        this.lastname = lastname;
        this.emailid = emailid;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postal = postal;
        this.country = country;
        this.language = language;
        this.phone = phone;
    }
}