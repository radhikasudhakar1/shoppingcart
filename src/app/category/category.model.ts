export class Category{
    public categoryid: number;
    public categoryname: string;
    public categorydescription: string;
    public totalnoofproduct: number;

    constructor(id?: number, name?: string, description?: string, total?: number){
        this.categoryid = id;
        this.categoryname = name;
        this.categorydescription = description;
        this.totalnoofproduct = total;
    }
}