import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth.service';
import { ShopService } from 'src/app/providers/shop.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  producers: string[] = [];
  producers$ : Observable<string[]> = new Observable;
  categories: string[] = [];



  constructor(public shop: ShopService, public auth: AuthService, public toastr: ToastrService, public router: Router) { }


  ngOnInit(): void {
    
    this.getProducers();
    this.getCategories();
    
     

  }

 getProducers() {
   return this.shop.getproducts().pipe(
  map(product => product.map(product => product.producer)),
  tap((producer) => {
    this.producers = [... new Set(producer)]
  }),
  catchError((err) => {
    console.log(err)
    return of ([])
  }),
  take(1)
  ).subscribe();
 }


 getCategories= () => {
   this.shop.getproducts().pipe(
     map(product => product.map(product => product.category)),
     tap((category) => {
       this.categories = [...new Set(category)];
     }),
     catchError((err) => {
      console.log(err)
      return of ([])
    }),
    take(1)
   ).subscribe();
 }


 refreshNavbar= () => {
   if (this.shop.dbChange==true) {
    this.getProducers();
    this.getCategories();
    this.shop.dbChange = false;
   }
 }
  


  logOut(): void {
    
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.auth.analyzeToken = undefined;
    this.auth.isLogged = false;

    this.toastr.success('Logout successful!', 'Success', {
      positionClass:"toast-bottom-left"
    });
  }

  

  ngOnDestroy(): void {
  
  }



}
