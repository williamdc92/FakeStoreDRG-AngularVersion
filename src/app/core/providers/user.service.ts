import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Valutation } from './shop.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  token: string;
  refresh_token: string;
  address: string;
  isAdmin: boolean;
  orders: [];
  cart: CartElement[];
  favourites: [];
}

export interface Me {
  id: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  producer: string;
  image: string;
}

export interface CartElement {
  tot: number;
  quantity: number;
  product: Product;
}

export interface orders {
  date: Date;
  total: number;
  items: CartElement[];
  id:string;
  evaded: string;
  nations : string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( 
    private http: HttpClient,
    private auth : AuthService
    ) { }

  addValutation = (id: string | null | undefined, obj: Valutation, token:string | null) : Observable<Valutation> => {
    
  
    
    return this.http.post <Valutation>(`${environment.host}/products/${id}`, obj);

  }

  getCart = (id: string | null) : Observable<CartElement[]> => {
    
    return this.http.get<CartElement[]>(`${environment.host}/users/${id}/cart`);

  }



  increaseInCart = (idp: string | null) : Observable<CartElement> => {

  const id = this.auth.analyzeToken!.user_id;
  return this.http.put <CartElement>(`${environment.host}/users/${id}/cart/${idp}/increase`, {})

  }

  decreaseInCart = (idp : string | null) => {
  const id = this.auth.analyzeToken!.user_id;
  return this.http.put <CartElement>(`${environment.host}/users/${id}/cart/${idp}/decrease`, {})

  }

  removeProductFromCart = (idp: string | null) : Observable<CartElement> => {
    const id = this.auth.analyzeToken!.user_id;
    return this.http.delete<CartElement>(`${environment.host}/users/${id}/cart/${idp}`, {})
  }

  addProductInCart = (idproduct: string | null) : Observable<CartElement> => {
    
    const body = {
      "id": idproduct
    }

    const id = this.auth.analyzeToken!.user_id;
    
    

    return this.http.post<CartElement>(`${environment.host}/users/${id}/cart`, body)
  }

  getUsers = () :Observable<User[]> => { return this.http.get<User[]>(`${environment.host}/users/`, {}) };


  changeAdminStatus = (id: string, token_admin: string | null) : Observable <User> => {
    return this.http.put<User>(`${environment.host}/users/${id}/isadmin`, {})
  }; 

  addOrder = () : Observable <orders> => {
    const id = this.auth.analyzeToken!.user_id;
    return this.http.post<orders>(`${environment.host}/users/${id}/orders`, {});
  } 

  getOrders = (id: string | null) : Observable <orders []> => { return this.http.get<orders[]>(`${environment.host}/users/${id}/orders`, {})};

  getOrderById = (id:string | null, ido:string) : Observable<orders> => {
    return this.http.get<orders>(`${environment.host}/users/${id}/orders/${ido}`);
  }
  
}

