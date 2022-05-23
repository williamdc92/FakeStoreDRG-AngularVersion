import { UserService } from 'src/app/providers/user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { failureLoginUser, loginUser, successLoginUser, logoutUser, clearUser, registerUser, failureRegisterUser, getUserCart, successGetUserCart, failureGetUserCart, getUserOrders, successGetUserOrders, failureGetUserOrders, manageUserCart, failureManageUserCart, addUserOrder, failureAddUserOrder, clearCart, addValutation, failureAddValutation, getOrderById, successGetOrderById, failureGetOrderById } from './currentuser.action';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap, take, skipWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';
import { loadProductById } from '../products/products.actions';
import { UserOrders } from './currentuser.selector';
import { FiltersEffect } from '../filters';


@Injectable() 

export class currentuserEffect {
    constructor(
      private actions$: Actions,
      private store: Store<AppState>,
      private users: UserService,
      private toastr: ToastrService,
      private auth: AuthService, 
      private router: Router, 
      private filters: FiltersEffect
    ) { }

     successMessage = "";
     errorMessage = "";
    loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap((auth) =>
        (this.auth.logIn(auth.validationForm)).pipe(
          tap((res) => {
            this.toastr.success('You are now logged!', 'Success', {
              positionClass: "toast-bottom-left"
            });
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.auth.analyzeToken = this.auth.parseJwt(res.token);
            this.auth.isLogged = true;
            this.router.navigate(['/products']);
          }),
          map((user) => 
          successLoginUser({ currentuser: user })
          ),
          catchError((err) =>{
            if (err.status === 409) this.toastr.error('Invalid username or password', 'Error', {
              positionClass: "toast-bottom-left"
            });
            else this.toastr.error('Server Error', 'Error', {
              positionClass: "toast-bottom-left"
            });
           return of(failureLoginUser({ err }));}),
          take(1)
        )
      )
    )
  );

  logoutUser$ = createEffect(()=> 
    this.actions$.pipe(
      ofType(logoutUser),
      tap(()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.auth.analyzeToken = undefined;
        this.auth.isLogged = false;
        this.toastr.success('Logout successful!', 'Success', {
          positionClass:"toast-bottom-left"
        })
      }),
      take(1)
    )
  )

  registerUser$ = createEffect(()=> 
  this.actions$.pipe(
    ofType(registerUser),
    switchMap((auth) =>
      (this.auth.signUp(auth.validationForm)).pipe(
        tap((res) => {
          this.toastr.success('You are now registered!', 'Success', {
            positionClass: "toast-bottom-left"
          });
          this.router.navigate(['/auth']);
        }),
        catchError((err) =>{
          if (err.status === 409) this.toastr.error('Invalid username or password', 'Error', {
            positionClass: "toast-bottom-left"
          });
          else this.toastr.error('Server Error', 'Error', {
            positionClass: "toast-bottom-left"
          });
         return of(failureRegisterUser({ err }));}),
        take(1)
      )
    )
  )
);

  clearUser$ = createEffect(()=> 
    this.actions$.pipe(
      ofType(clearUser),
      tap(()=>{
        this.toastr.warning('Section expired, please login again', 'Warning', {
          positionClass: "toast-bottom-left"
       });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.auth.analyzeToken = undefined;
        this.auth.isLogged = false;
      }),
      take(1)
    )
  )

  getUserCart$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUserCart),
    switchMap(() =>
      (this.users.getCart(this.auth.analyzeToken!.user_id)).pipe(
        map((cart) => 
        successGetUserCart({ cart: cart })
        ),
        catchError((err) =>{
         return of(failureGetUserCart({ err }));}),
        take(1)
      )
    )
  )
);

getOrderById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderById),
      switchMap(() => this.store.select(UserOrders).pipe(
        skipWhile(data => data?.length == 0),
        map(() => {
          if (this.filters.allFilters.lastOrderId != undefined) {
            return successGetOrderById({
              id:this.filters.allFilters.lastOrderId
            })
          } else {
            return failureGetOrderById()
          }
        })

      ))
    )
  );


getUserOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUserOrders),
    switchMap(() =>
      (this.users.getOrders(this.auth.analyzeToken!.user_id)).pipe(
        map((orders) => 
        successGetUserOrders({ orders: orders })
        ),
        catchError((err) =>{
         return of(failureGetUserOrders({ err }));}),
        take(1)
      )
    )
  )
);

manageUserCart$ = createEffect(()=> 
this.actions$.pipe(
  ofType(manageUserCart),
  tap((props) => {
    this.successMessage = props.successMsg;
    this.errorMessage = props.errorMsg;
  }),
  switchMap((props) =>
    (props.request$).pipe(
      tap((props) => {
        this.toastr.success(`${this.successMessage}`, 'Success', {
         positionClass: "toast-bottom-left"
       });
     }),
      map(() => 
      getUserCart()
      ),
      catchError((err) =>{
        this.toastr.warning(`${this.errorMessage}`, 'Error', {
          positionClass: "toast-bottom-left"
        });
       return of(failureManageUserCart({ err }));}),
      take(1)
    )
  )
)
);

addUserOrder$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addUserOrder),
    switchMap(() =>
      (this.users.addOrder()).pipe(
        map(() => 
        getUserOrders()
        ),
        tap(() => {
          this.toastr.success(`Order added successfully`, 'Success', {
            positionClass: "toast-bottom-left"
          });
        }),
        map(() => 
        clearCart()),
        catchError((err) =>{
        this.toastr.success(`Can't add order...`, 'Error', {
          positionClass: "toast-bottom-left"
        });
         return of(failureAddUserOrder({ err }));}),
        take(1)
      )
    )
  )
);


addValutation$ = createEffect(() =>
this.actions$.pipe(
  ofType(addValutation),
  switchMap((action) => this.users.addValutation(
    this.filters.allFilters.lastProductId,
    action.valutation,
    (localStorage.getItem('token'))
    ).pipe(
      tap(() => {
        this.toastr.success('Valutation added, thanks!', 'Success', {
          positionClass: "toast-bottom-left"
        });
      }),
      map (() => loadProductById({ id: this.filters.allFilters.lastProductId}) ),
      catchError((err) =>{
        this.toastr.warning(`Cannot add valutation`, 'Error', {
          positionClass: "toast-bottom-left"
        });
       return of(failureAddValutation({ err }));}),
      take(1)

    )
  )
))

}