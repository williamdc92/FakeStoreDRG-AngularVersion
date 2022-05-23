import { clearUser, successLoginUser } from '../store/currentUser/currentuser.action';
import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  environment
} from 'src/environments/environment';
import {
  Observable
} from 'rxjs';
import {
  SubscriptionsContainer
} from '../subscription-container';
import {
  ToastrService
} from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';


export interface SignUpFormInterface {

  name: string,
    surname: string,
    email: string,
    password: string,
    confirmPassword: string

}

export interface LoginFormInterface {
  email: string,
    password: string
}

export interface SuccessfulLogin {
    grantType: string,
    token: string,
    refreshToken: string,
    email: string,
    id: string,
    isAdmin: boolean;
}

export interface RefreshToken {
  token: string
}

export interface Me {
  id: string;
  email: string;
  isAdmin: boolean;
  token: string;
}


export interface checkToken {
  email: string;
  exp: number;
  iat: number;
  isAdmin: boolean;
  user_id: string;
}




@Injectable({
  providedIn: 'root'
})


export class AuthService {

  isLogged: boolean | null = false;
  analyzeToken: checkToken | undefined;
  

  constructor(
    private http: HttpClient, 
    private store: Store<AppState>
    ) {

    if (localStorage.getItem('token')) {
      this.checkTokensExpiration();

    }

  }


  parseJwt = (token: string | null) => {
    if (token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }


  };

  isExpired = (token: string) => {
    var isExpiredToken = false;
    var dateNow = new Date();
    var decodedToken = this.parseJwt(token);

    if (decodedToken.exp < dateNow.getTime() / 1000)

    {
      isExpiredToken = true;
    }

    return isExpiredToken;
  }

  checkTokensExpiration = () => {
    const nToken = localStorage.getItem('token')
    const rToken = localStorage.getItem('refreshToken');
    if (nToken && rToken) {
  
    if (this.isExpired(nToken) && this.isExpired(rToken) ) {
        this.store.dispatch(clearUser());
    }
    else {
       
       this.analyzeToken = this.parseJwt(localStorage.getItem('token'));;
       const user : SuccessfulLogin = {
        grantType : "bearer",
        token : localStorage.getItem('token')!,
        refreshToken : localStorage.getItem('refreshToken')!,
        email : this.analyzeToken?.email!,
        id : this.analyzeToken?.user_id!,
        isAdmin : this.analyzeToken?.isAdmin!
       }
       this.store.dispatch(successLoginUser({ currentuser: user }));
       this.isLogged = true;
    }
  }}



  signUp = (form: SignUpFormInterface): Observable < Response > => {
    return this.http.post < Response > (`${environment.host}/register`, form)
  };

  logIn = (form: LoginFormInterface): Observable < SuccessfulLogin > => {
    return this.http.post < SuccessfulLogin > (`${environment.host}/login`, form)
  };

  GetMe = (token: string | null): Observable < Me > => {
    return this.http.get < Me > (`${environment.host}/me`)
  }

  refreshToken = () : Observable<RefreshToken> => {
    return this.http.post <RefreshToken> (`${environment.host}/token`, {})
  }



}
