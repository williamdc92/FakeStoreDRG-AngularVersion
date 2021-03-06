import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  catchError,
  finalize,
  Observable,
  of,
  retry,
  take,
  tap,
  throwError
} from 'rxjs';
import {
  AuthService
} from '../providers/auth.service';
import {
  key
} from 'src/environments/environment';
import {
  SubscriptionsContainer
} from 'src/app/core/utils/unsubscriber/subscription-container';
import {
  Router
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterceptorAuthService {
  constructor(
    public auth: AuthService,
     private router: Router,
     public toastr: ToastrService,
     ) {}

  subs = new SubscriptionsContainer();
  isRefreshing = false;
  token: string | null = null;
  rToken: string | null = null;
  

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    this.token = localStorage.getItem('token');
    this.rToken = localStorage.getItem('refreshToken');

    if (this.token && this.rToken) {

      if (this.isExpired(this.token)) { //se token principale è scaduto

        if (!this.isExpired(this.rToken)) { // se refreshToken è valido
          localStorage.setItem('token', this.rToken);
          this.token = localStorage.getItem('token');
          req = req.clone({
            setHeaders: {
              'auth': `${this.token}`,
              'authorization': `${key}`
            }
          });
          this.refreshToken(); //genera nuovo refreshToken
        } else if (this.isExpired(this.rToken)) { //se anche il refreshToken è scaduto, slogga l'utente
          this.toastr.warning('Section expired, please login again', 'Warning', {
            positionClass: "toast-bottom-left"
          });
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.auth.analyzeToken = undefined;
          this.auth.isLogged = false;
          this.router.navigate(['/auth']);
        }

      } else { //se token principale è ancora valido
        req = req.clone({
          setHeaders: {
            'auth': `${this.token}`,
            'authorization': `${key}`
          }
        });

      }

    } else if (!this.token) { //se utente non è loggato
      req = req.clone({
        setHeaders: {
          'authorization': `${key}`
        }
      });
    }

    return next.handle(req).pipe(
      retry(2),
      catchError((err) => {

        if (err instanceof HttpErrorResponse) {

          if (err.status === 401 || err.status === 404) {

            if (!this.isRefreshing) {
              console.log(err);
            }
          }
        }
        return throwError(() => err);
      })
    )
  }

  decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  isExpired = (token: string) => {
    var isExpiredToken = false;
    var dateNow = new Date();
    var decodedToken = this.decodeToken(token);

    if (decodedToken.exp < dateNow.getTime() / 1000)

    {
      isExpiredToken = true;
    }

    return isExpiredToken;
  }


  refreshToken = () => {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.auth.refreshToken().pipe(
        tap((res) => {
        const newRefreshToken = res.toString();
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
          this.rToken = localStorage.getItem('refreshToken');
          console.log("provided new refreshToken : " + newRefreshToken);
          this.isRefreshing = false;
        }}),
        catchError((err) => {
          console.log(err.message);
          return of ([])
        }),
        take(1)
      ).subscribe();
    }
  }

  ngOnDestroy() {

  }
}
