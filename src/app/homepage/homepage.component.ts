import { Component, OnInit } from '@angular/core';

import { Categories } from './categories.model';
import { HomepageService } from './homepage.service';

import { map} from 'rxjs/operators';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit {

  public categories = new Array<Categories>();

  constructor(private _homepageService: HomepageService) { 
    
    this._homepageService.getCategoriesDetails().subscribe( response =>
      {
        //console.log(response);
        this.categories = response['category'].map(item =>
          {
           
            return new Categories(
              item.categoryid, item.categoryname, item.categorydescription
            );
          }
        );
      }
    )
    
  }

  ngOnInit() {

  }

}
