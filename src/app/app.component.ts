import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from './providers/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { loadProducts } from './store/products/products.actions';
import {loadUsers } from './store/users/users.actions';
import { getUserCart } from './store/currentUser/currentuser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  constructor(private auth: AuthService, private router: Router, private store : Store<AppState>) {}


  ngOnInit() {
    this.store.dispatch(loadProducts()); //da spostare dopo aver implementato correttamente lazy load
    
  }

  
}
