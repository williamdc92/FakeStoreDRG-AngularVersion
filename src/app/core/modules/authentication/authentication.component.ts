import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/providers/auth.service';
import { AppState } from 'src/app/store/app.state';
import { MustMatch } from '../../utils/validators/confirm-password.validator';
import { loginUser, registerUser } from 'src/app/store/currentUser/currentuser.action';



@Component({
  selector: 'app-auth',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit{

  signup: boolean = false;
  login: boolean = true;

  SignupForm: FormGroup;
  LoginForm: FormGroup;


  constructor(
    public formBuilder: FormBuilder, 
    public auth: AuthService, 
    private router: Router, 
    private toastr: ToastrService,
    private store: Store<AppState>,
    ) {
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
      this.store.dispatch(registerUser({validationForm: this.SignupForm.value}));
    }
  }

  logIn = () => {
    if (this.LoginForm.valid) {
      this.store.dispatch(loginUser({validationForm: this.LoginForm.value}))
  }
  }


}
