import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

export interface Valutation {
  nickname: string | undefined ;
  star: number;
  comment: string;
}

export interface RootObject {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  producer: string;
  image: string;
  valutations: Valutation[];
}


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  searchTerm:string = "";
  dbChange:boolean = false;

  constructor(private http: HttpClient) { }


  getproducts = () : Observable<RootObject[]> => {
    return this.http.get <RootObject[]>( `${environment.host}/products`, {});
  }

  getProductsOfProducer = (producer: string) : Observable<RootObject[]> => {
    return this.http.get<RootObject[]>( `${environment.host}/products?producer=${producer}`, {});
  }

  getProductsOfCategory = (category: string) : Observable<RootObject[]> => {
    return this.http.get <RootObject[]>( `${environment.host}/products?category=${category}`, {});
  }

  getProductById = (id: string) : Observable<RootObject> => {
    return this.http.get<RootObject>(`${environment.host}/products/${id}`, {})
  }

  addProduct = (obj:RootObject) : Observable<RootObject> => { return this.http.post<RootObject>(`${environment.host}/products`,obj) }

  deleteProductById = (id: string) : Observable<RootObject> => { return this.http.delete<RootObject>(`${environment.host}/products/${id}`, {})}
  
}
