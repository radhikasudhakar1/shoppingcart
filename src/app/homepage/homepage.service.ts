import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Categories } from './categories.model';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  getCategoriesDetails(): Observable<Categories[]>  
  {
    const catUrl = "http://localhost:3000/category";
    return this.http.get<Categories[]>(catUrl);
  }
}
