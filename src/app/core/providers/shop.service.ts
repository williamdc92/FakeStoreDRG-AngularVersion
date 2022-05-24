import { loadProductById } from 'src/app/store/products/products.actions';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  Observable
} from 'rxjs';
import {
  map,
  tap
} from 'rxjs/operators';
import {
  NavigationEnd,
  Router
} from '@angular/router';
import {
  AppState
} from '../../store/app.state';
import {
  Store
} from '@ngrx/store';
import {
  loadFilteredProducts
} from '../../store/products/products.actions';
import { getOrderById } from '../../store/currentUser/currentuser.action';
import { hasLoaded } from '../../store/products/products.selector';
import { routerNavigatedAction } from '@ngrx/router-store';

export interface Valutation {
  nickname: string | undefined;
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

  searchTerm: string = "";
  dbChange: boolean = false;
  filter: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store < AppState > ) {
    
    
  }


  getproducts = (): Observable < RootObject[] > => {
    return this.http.get < RootObject[] > (`${environment.host}/products`, {});
  }

  getProductsOfProducer = (producer: string): Observable < RootObject[] > => {
    return this.http.get < RootObject[] > (`${environment.host}/products?producer=${producer}`, {});
  }

  getProductsOfCategory = (category: string): Observable < RootObject[] > => {
    return this.http.get < RootObject[] > (`${environment.host}/products?category=${category}`, {});
  }

  getProductById = (id: string): Observable < RootObject > => {
    return this.http.get < RootObject > (`${environment.host}/products/${id}`, {})
  }

  addProduct = (obj: RootObject): Observable < RootObject > => {
    return this.http.post < RootObject > (`${environment.host}/products`, obj)
  }

  deleteProductById = (id: string): Observable < RootObject > => {
    return this.http.delete < RootObject > (`${environment.host}/products/${id}`, {})
  }

}
