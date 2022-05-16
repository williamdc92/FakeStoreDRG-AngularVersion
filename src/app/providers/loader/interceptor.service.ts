import { AuthService } from 'src/app/providers/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, Observable } from 'rxjs';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { SubscriptionsContainer } from 'src/app/subscription-container';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  subs = new SubscriptionsContainer;

  constructor(private spinner: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.startLoading();
    return next.handle(req).pipe(
      finalize(
        () => {
          this.spinner.finishLoading();
        }
      ),
    );
  }
}
