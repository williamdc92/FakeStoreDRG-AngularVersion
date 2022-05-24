import { Injectable } from '@angular/core';

import {CanActivate, Router} from "@angular/router";
import { AuthService } from 'src/app/core/providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardService implements CanActivate {

  constructor( public auth: AuthService, private router: Router) { }

  canActivate() {
    if (this.auth.analyzeToken?.isAdmin == true) {
      return true;
    }
    else {
      this.router.navigate(['/forbidden']);
      return false;
    }
  }
}
