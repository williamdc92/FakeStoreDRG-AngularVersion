import { SubscriptionsContainer } from './../../subscription-container';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/providers/auth.service';
import { ShopService } from 'src/app/providers/shop.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  
  producers: string[] = [];
  categories: string[] = [];
  isError: boolean = false;
  subs = new SubscriptionsContainer;


  constructor(public shop: ShopService, public auth: AuthService, public toastr: ToastrService, public router: Router) { }


  ngOnInit(): void {
    
    this.getProducers();
    this.getCategories();
    
     

  }

 getProducers = () => {
  this.subs.add = this.shop.getproducts().pipe(map(product => product.map(product => product.producer))).subscribe({
    next: (producer) => {
      this.producers = [...new Set(producer)];
      this.isError = false;
    },
    error: (err) => {
      this.isError = true;
      console.error(err.message);
    }
  }
  )
 }

 getCategories= () => {

  this.subs.add = this.shop.getproducts().pipe(map(product => product.map(product => product.category))).subscribe({
    next: (category) => {
      this.categories = [...new Set(category)];
      this.isError = false;
    },
    error: (err) => {
      this.isError = true;
      console.error(err.message);
    }
  }
  )
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
      this.subs.dispose();
  }



}
