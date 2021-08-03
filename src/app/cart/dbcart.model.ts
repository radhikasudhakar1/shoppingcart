export class Dbcart{
    public cartid: number;
    public loginid: number;
    public productid: number;
    public noofproducts: number;
    public datetime: string;
    public cartdescription: string;
    public price: number;

    constructor(cartid?: number,loginid?: number,productid?: number, noofproducts?: number,
        datetime?: string,cartdescription?: string,price?: number){
        this.cartid= cartid;
        this.loginid = loginid;
        this.productid = productid;
        this.noofproducts = noofproducts;
        this.datetime = datetime;
        this.cartdescription = cartdescription;
        this.price = price;
    }
    
}