import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from '../providers/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../confirm-password.validator';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  signup: boolean = false;
  login: boolean = true;

  SignupForm: FormGroup;
  LoginForm: FormGroup;


  constructor(public formBuilder: FormBuilder, public auth: AuthService, private router: Router, private toastr: ToastrService) {
    this.SignupForm = this.formBuilder.group({
      name: [, [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      } as AbstractControlOptions)

    this.LoginForm = this.formBuilder.group({
      email: [, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  get fc_name() {
    return this.SignupForm.get('name');
  }


  get fc_email() {
    if (this.login) return this.LoginForm.get('email');
    else return this.SignupForm.get('email');
  }

  get fc_password() {
    if (this.login) return this.LoginForm.get('password');
    else return this.SignupForm.get('password');
  }

  get fc_c_password() {
    return this.SignupForm.get('confirmPassword');
  }


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.toastr.warning('You are already logged in, redirecting...', 'Error', {
        positionClass: "toast-bottom-left"
      });
      this.router.navigate(['/products']);
    }

  }


  signUp = () => {

    if (this.SignupForm.valid) {
      this.auth.signUp(this.SignupForm.value).pipe(
        tap(() => {
          this.toastr.success('You are now registered!', 'Success', {
            positionClass: "toast-bottom-left"
          });
          this.login = true;
          this.signup = false;
        }),
        catchError((err) => {
          if (err.status === 409) this.toastr.error('User already registered!', 'Error', {
            positionClass: "toast-bottom-left"
          });
          else this.toastr.error('Server Error', 'Error', {
            positionClass: "toast-bottom-left"
          });
          return of([]);
        }),
        take(1)
      ).subscribe();
    }
  }

  logIn = () => {
    if (this.LoginForm.valid) {
      this.auth.logIn(this.LoginForm.value).pipe(
        tap((res) => {
          this.toastr.success('Login successful!', 'Success', {
            positionClass: "toast-bottom-left"
          });

          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          this.auth.analyzeToken = this.parseJwt(res.token);
          this.auth.isLogged = true;
          this.router.navigate(['/products']);
        }),
        catchError((err) => {
          if (err.status === 404) {
            this.toastr.error('Invalid username or password', 'Error', {
              positionClass: "toast-bottom-left"
            });
          }
          else {
            this.toastr.error('Server Error', 'Error', {
              positionClass: "toast-bottom-left"
            });
          }
          return of([]);
        }),
        take(1)
      ).subscribe();
    }
  }

  parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  ngOnDestroy(): void {
  }



}
