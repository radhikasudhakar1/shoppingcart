

export class Product{
    public productid: number;
    public categoryid: number;
    public name: string;
    public description: string;
    public price: number;
    public isstockavailable: number;
    public totalno: number;
    public isofferavailable: number;
    public offerprice: number;
    public reviewid: number;
    public imagepath: string;

    constructor( productid: number,  categoryid: number, name: string,description: string,price: number,
        isstockavailable: number, totalno: number, isofferavailable: number, offerprice: number,
        reviewid: number, imagepath: string ){

            this.productid = productid;
            this.categoryid = categoryid;
            this.name = name;
            this.description = description;
            this.price = price;
            this.isstockavailable = isstockavailable;
            this.totalno = totalno;
            this.isofferavailable = isofferavailable;
            this.offerprice = offerprice;
            this.reviewid = reviewid;
            this.imagepath = imagepath;

    }

}