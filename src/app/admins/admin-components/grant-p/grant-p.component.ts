import { changeAdminStatus, clearUsers } from './../../../store/users/users.actions';
import { AuthService } from 'src/app/providers/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';
import { Observable, catchError, of, tap, take, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUsers } from 'src/app/store/users/users.actions';
import { getUsers, getUsersState } from 'src/app/store/users/users.selector';

@Component({
  selector: 'app-grant-p',
  templateUrl: './grant-p.component.html',
  styleUrls: ['./grant-p.component.css']
})
export class GrantPComponent implements OnInit, OnDestroy {

  users : User[] = [];
  users$ : Observable<User[] | undefined> = new Observable;
  currentId = this.auth.analyzeToken?.user_id;

  constructor( 
    public user: UserService,
     public auth:AuthService,
     private store : Store<AppState>
     ) { }

  ngOnInit(): void {
  this.store.dispatch(loadUsers()); 
  this.store.select(getUsers)
  this.users$ = this.getData();
  }

  

  getData() : Observable<User [] | undefined>   {
    return this.store.select(getUsers);
    }

  changeAdminStatus = (idu:string) => {
    this.store.dispatch(changeAdminStatus({id:idu}))
  }
  
  ngOnDestroy(): void {
    this.store.dispatch(clearUsers())
  }

}
