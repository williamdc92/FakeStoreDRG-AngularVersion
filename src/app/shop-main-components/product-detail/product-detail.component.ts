import { SubscriptionsContainer } from './../../subscription-container';
import { Valutation } from './../../providers/shop.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShopService,RootObject } from 'src/app/providers/shop.service';
import { AuthService } from 'src/app/providers/auth.service';
import { CartElement, Product, UserService } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  subs = new SubscriptionsContainer;

  subscription = new Subscription();
  subProducer = new Subscription();
  id:string = "";
  valutation: undefined | number;
  length:number = 0;
  isError:boolean = false;
  cart: CartElement[] = [];
  
  product:RootObject | undefined;


  currentValutation: Valutation = {
    nickname: this.auth.analyzeToken?.email,
    star: 0,
    comment: "",
  };


  
  constructor(public user: UserService, public shop: ShopService, private route: ActivatedRoute, private router: Router, public auth:AuthService, public toastr: ToastrService) {

 
    this.subs.add = route.params.subscribe(params => {
      this.id = params['id'];
      this.getProductData();
    });}




    getProductData = () => {
      this.subs.add = this.shop.getProductById(this.id).subscribe({
        next: (product) => {
          this.product=product
          this.length = this.product.valutations.length;
          this.valutation = product.valutations.map(valutation =>valutation.star).reduce((sum,valutation) => sum + valutation,0)/this.length;
          this.isError = false;
        },
        error: (err) => {
          this.isError = true;
          console.log(err.message);
        }
      });


      this.subs.add = this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0)
      });

      
    }


  

  ngOnInit(): void {
    this.subs.add = this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  if (localStorage.getItem('isLogged') === 'true') {this.getUserCart();}
  }

  addReview = () => {
  
    this.subs.add = this.user.addValutation(this.id,this.currentValutation,(localStorage.getItem('token'))).subscribe({

      next: () => {
        this.toastr.success('Valutation added, thanks!', 'Success', {
          positionClass:"toast-bottom-left"
        });

      this.getProductData();
        
      },
      error: (err) => {
        this.toastr.error('cannot send valutation, please try again!', 'Error', {
          positionClass:"toast-bottom-left"
        });
      }
    })
    
  }
  
  getUserCart() {
    this.subs.add = this.user.getCart(this.auth.analyzeToken!.user_id).subscribe({
      next: (cart) => {
         this.cart = cart;
        },
      error: (err) => { console.log(err); }
    })
  }

  addInCart(idproduct: string): void {
    this.subs.add = this.user.addProductInCart(this.auth.analyzeToken!.user_id,idproduct,localStorage.getItem('token')).subscribe({
      next: () => {
        this.getUserCart();
        this.toastr.success('Product added in cart!', 'Success', {
          positionClass:"toast-bottom-left"
        });
      },
      error: () => {

        this.toastr.warning('Cannot add product', 'Error', {
          positionClass:"toast-bottom-left"
        });
      }
    })
  }

 
  removeElement = (idp: string | null) => {
    this.user.removeProductFromCart(this.auth.analyzeToken!.user_id, idp).subscribe({
      next: () => {
        this.toastr.warning('Product removed successfully', 'Success', {
          positionClass: "toast-bottom-left"
        });
        this.getUserCart();
      },
      error: () => {
        this.toastr.warning('Cannot remove product', 'Error', {
          positionClass: "toast-bottom-left"
        });
      }
    })
  }

  isInCart = (idp: string) => {
    if (localStorage.getItem('token')) {
      if (this.cart.some(p => p.product.id === idp)) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }

ngOnDestroy(): void {
    this.subs.dispose();
}
}
