import { changeAdminStatus } from './../../../../../store/users/users.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShopService } from 'src/app/core/providers/shop.service';
import { AppState } from 'src/app/store/app.state';
import { AuthService } from 'src/app/core/providers/auth.service';

@Component({
  selector: 'app-cell-custom-button-admins',
  templateUrl: './cell-custom-button-admins.component.html',
  styleUrls: ['./cell-custom-button-admins.component.css']
})
export class CellCustomButtonAdminsComponent implements OnInit {

  data: any;
  params: any;

  currentId = this.auth.analyzeToken?.user_id;
  constructor(
    private store: Store < AppState >,
    private auth : AuthService
  ) { }

  agInit(params:any) {
    this.params = params;
    this.data = params.value;
  }

  currentAdmin() {
    if (this.currentId == this.params.data.id) return true
    else return false
  }

  isAdmin() {
    if (this.params.data.isAdmin) return true
    else return false
  }

  ngOnInit(): void {
  }

  changeAdminStatus = () => {
    this.store.dispatch(changeAdminStatus({id:this.params.data.id}))
  }

}
