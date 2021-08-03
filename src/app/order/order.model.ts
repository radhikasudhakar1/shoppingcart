export class Order{
    public orderid: number;
    public productid: number;
    public noofproducts: number;
    public price: number;
    public description: string;


    constructor(orderid?: number, productid?: number, noofproducts?: number,
        price?: number, description?: string){
            this.orderid = orderid;
            this.productid = productid;
            this.noofproducts = noofproducts;
            this.price= price;
            this.description = description;
        }
}