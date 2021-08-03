import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "../productpage/product.model";

@Pipe( { name: 'SearchByName' } )
export class SearchByName implements PipeTransform{
    transform(products: Product[], searchName: string){
        if(searchName==null || searchName == ''){
            return null;
        }else{
            return products.filter(product => product.name.indexOf(searchName) !== -1);
        }
        
    }
}