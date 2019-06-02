import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const currentMember = this.authService.currentMemberValue;
    //     if (currentMember) {
    //         // logged in so return true
    //         return true;
    //     }

    //     // not logged in so redirect to login page with the return url
    //     this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    // }
    canActivate(): boolean {
        if (this.authService.loggedIn()) {
          console.log('true')
          return true
        } else {
          console.log('false')            
          this.router.navigate(['/login'])
          return false
        }
      }
}