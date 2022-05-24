import {
  Injectable
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { clearCart, clearOrders, getUserCart, getUserOrders } from 'src/app/store/currentUser/currentuser.action';
import { clearProduct, loadProducts } from 'src/app/store/products/products.actions';
import { clearUsers, loadUsers } from 'src/app/store/users/users.actions';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService implements CanActivate, CanDeactivate < any > {

  constructor(
    private store: Store < AppState > 
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    if (url)  this.store.dispatch(loadProducts());

  
    if (url.indexOf("admins") > -1) {this.store.dispatch(loadUsers());}
    if (url.indexOf("auth") > -1) {}
    if (url.indexOf("orders") > -1) this.store.dispatch(getUserOrders());
    if (url.indexOf("products") > -1 && localStorage.getItem('token'))  this.store.dispatch(getUserCart());
    if (url.indexOf("cart") > -1) this.store.dispatch(getUserCart());

    return true;
  }

  public canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState ? : RouterStateSnapshot): boolean {
    const url = currentState.url;
    if (url.indexOf("admins") > -1) this.store.dispatch(clearUsers());
    if (url.indexOf("auth") > -1) {}
    if (url.indexOf("orders") > -1) this.store.dispatch(clearOrders());
    if (url.indexOf("products") > -1 && localStorage.getItem('token')) this.store.dispatch(clearCart())
    if (url.indexOf("cart") > -1) this.store.dispatch(clearCart());

    return true;
  }
}
