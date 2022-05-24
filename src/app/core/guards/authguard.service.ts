import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
import {CanActivate} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{

  constructor( public auth: AuthService, private router: Router) { 
    
  }

canActivate() {
    if (this.auth.isLogged) {
      return true;
    }
    else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}
