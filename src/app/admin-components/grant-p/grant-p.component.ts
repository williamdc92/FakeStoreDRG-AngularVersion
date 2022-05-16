import { AuthService } from 'src/app/providers/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';
import { Observable, catchError, of, tap, take, switchMap } from 'rxjs';

@Component({
  selector: 'app-grant-p',
  templateUrl: './grant-p.component.html',
  styleUrls: ['./grant-p.component.css']
})
export class GrantPComponent implements OnInit, OnDestroy {

  users : User[] = [];
  users$ : Observable<User[]> = new Observable;
  currentId = this.auth.analyzeToken?.user_id;

  constructor( public user: UserService, private toastr: ToastrService, public auth:AuthService) { }

  ngOnInit(): void {
  this.takeUsers();
  }

  takeUsers() : Observable<User[]> {
    return this.users$= this.user.getUsers().pipe(
     catchError((err) => {
      console.log(err);
      return of ([]);
     }
    ))
  }

  changeAdminStatus = (idu:string) => {
    this.user.changeAdminStatus(idu,localStorage.getItem('token')).pipe(
      tap(() => {
        this.toastr.success('Admin status changed successfully', 'Success', {
          positionClass:"toast-bottom-left"
        });
      }),
      catchError(() => {
        this.toastr.error('Cannot change admin status, please try again', 'Error', {
          positionClass:"toast-bottom-left"
        });
        return of ([]);
      }),
      switchMap(() => {
        return this.takeUsers();
      }),
      take(1)
    ).subscribe();
  }
  
  ngOnDestroy(): void {
 
  }

}
