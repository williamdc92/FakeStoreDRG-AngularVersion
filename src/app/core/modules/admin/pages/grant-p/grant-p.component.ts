
import { AuthService } from 'src/app/core/providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/app/core/providers/user.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changeAdminStatus } from 'src/app/store/users/users.actions';
import { getUsers } from 'src/app/store/users/users.selector';
import { ColDef } from 'ag-grid-community';
import { CellCustomButtonComponent } from '../../components/cell-custom-button/cell-custom-button.component';
import { CellCustomButtonAdminsComponent } from '../../components/cell-custom-button-admins/cell-custom-button-admins.component';

@Component({
  selector: 'app-grant-p',
  templateUrl: './grant-p.component.html',
  styleUrls: ['./grant-p.component.css']
})
export class GrantPComponent implements OnInit {
  
  users$ : Observable<User[] | undefined> = new Observable;
  currentId = this.auth.analyzeToken?.user_id;

  constructor( 
    public user: UserService,
     public auth:AuthService,
     private store : Store<AppState>
     ) { }

  ngOnInit(): void {
  this.users$ = this.store.select(getUsers);
  }



  colDefs: ColDef[] = [
    {
      field: "id"
    }
    ,
 
     {
       field: "name",
       sortable: true,
       filter: true,
     },
 
     {
       field: "surname",
       sortable: true,
       filter: true
     },
 
     {
       field: "email",
       filter: true
     },
 
     {
       field: "isAdmin",
       sortable: true,
       filter: true,
     },

     {
       field : "Change Status",
       cellRendererFramework : CellCustomButtonAdminsComponent
     }
   ]
  


}
