export class Orderhistory{
    public orderid: number;
    public loginid: number;
    public orderstatus: number;
    public description: string;
    public paymenttype: string;
    public paymentamount: number;
    public datetime: string;

    constructor(orderid?: number, loginid?: number, orderstatus?: number,
        description?: string, paymenttype?: string, paymentamount?: number, datetime?: string){
            this.orderid = orderid;
            this.loginid = loginid;
            this.orderstatus = orderstatus;
            this.description = description;
            this.paymenttype = paymenttype;
            this.paymentamount = paymentamount;
            this.datetime = datetime;
        }
}