import { AuthService } from 'src/app/providers/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, User } from 'src/app/providers/user.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionsContainer } from 'src/app/subscription-container';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-grant-p',
  templateUrl: './grant-p.component.html',
  styleUrls: ['./grant-p.component.css']
})
export class GrantPComponent implements OnInit, OnDestroy {


  subs = new SubscriptionsContainer();
  users : User[] = [];
  users$ : Observable<User[]> = new Observable;
  currentId = this.auth.analyzeToken?.user_id;

  constructor( public user: UserService, private toastr: ToastrService, public auth:AuthService) { }

  ngOnInit(): void {
  this.takeUsers();
   
  }

  takeUsers = () => {
    this.users$= this.user.getUsers().pipe(
     catchError((err) => {
      console.log(err);
      return of ([]);
     }
    ))
  }

  changeAdminStatus = (idu:string) => {
    this.subs.add = this.user.changeAdminStatus(idu,localStorage.getItem('token')).subscribe({
      next: () => {
        this.takeUsers();
        this.toastr.success('Admin status changed successfully', 'Success', {
          positionClass:"toast-bottom-left"
        });
      },
      error: (err) => {
        this.toastr.error('Cannot change admin status, please try again', 'Error', {
          positionClass:"toast-bottom-left"
        });
        console.log(err);}
    })
  }
  
  ngOnDestroy(): void {
      this.subs.dispose();
  }

}
