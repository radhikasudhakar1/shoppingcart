export class Categories{
    public categoryid: number;
    public categoryname: string;
    public categorydescription: string;

    constructor(categoryid: number, categoryname: string, categorydescription: string){
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.categorydescription = categorydescription;
    }
}