import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth.service';
import { ShopService } from 'src/app/providers/shop.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'
import { Observable, of, Subscription } from 'rxjs';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  producers$ : Observable<string[]> = new Observable;
  categories$ : Observable<string[]> = new Observable;
 // producers : Subscription | undefined




  constructor(public shop: ShopService, public auth: AuthService, public toastr: ToastrService, public router: Router) { }


  ngOnInit(): void {
    
    this.producers$ = this.getProducers(); 
    this.categories$ = this.getCategories();
    //this.producers = this.getProducers().subscribe(); alternative

    
     

  }

 getProducers() : Observable<string[]> {
   return this.shop.getproducts().pipe(
  map(product => product.map(product => product.producer).filter((item, pos, self) => { return self.indexOf(item) == pos; })),
  catchError((err) => {
    console.log(err)
    return of ([])
  }),
  take(1)
  );
 }


 getCategories()  : Observable<string[]> {
   return this.shop.getproducts().pipe(
     map(product => product.map(product => product.category).filter((item, pos, self) => { return self.indexOf(item) == pos; })),
     catchError((err) => {
      console.log(err)
      return of ([])
    }),
    take(1)
   );
 }


 refreshNavbar= () => {
   if (this.shop.dbChange==true) {
    this.getProducers().subscribe();
    this.getCategories().subscribe();
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

  




}
