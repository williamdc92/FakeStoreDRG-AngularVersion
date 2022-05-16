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
    isAdmin: string;
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

  subs = new SubscriptionsContainer;
  isLogged: boolean | null = false;
  analyzeToken: checkToken | undefined;
  

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


  constructor(private http: HttpClient, public toastr: ToastrService) {
    if (localStorage.getItem('token')) {
    
      this.checkTokensExpiration();
    
    //this.checkAuthToken(localStorage.getItem('token'));
    }

  }

  ngOnDestroy() {
    this.subs.dispose();
  }

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

checkTokensExpiration = () => {
  const nToken = localStorage.getItem('token')
  const rToken = localStorage.getItem('refreshToken');
  if (nToken && rToken) {

  if (this.isExpired(nToken) && this.isExpired(rToken) ) {
      this.toastr.warning('Section expired, please login again', 'Warning', {
        positionClass: "toast-bottom-left"
     });
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
     this.analyzeToken = undefined;
     this.isLogged = false;
     
     
  }
  else {
     this.analyzeToken = this.parseJwt(localStorage.getItem('token'));;
     this.isLogged = true;
  }
}
 
}


  checkAuthToken = (token: string | null) => {
    
      this.subs.add = this.GetMe(localStorage.getItem('token')).subscribe({
        next: () => {
          this.isLogged = true;
          token = localStorage.getItem('token');
        },
        error: (error) => {
         this.toastr.warning('Section expired, please login again', 'Warning', {
            positionClass: "toast-bottom-left"
         });
          localStorage.removeItem('token');
         token = null;
         this.analyzeToken = undefined;
         this.isLogged = false;
         console.log("error in auth service " + error);
        }
      })
    return token;

  }

}
