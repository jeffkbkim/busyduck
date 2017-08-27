

import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
@Injectable()

export class AdminGuardService implements CanActivate{

    constructor(private router: Router, private authService : AuthService) {}

    canActivate(route : ActivatedRouteSnapshot, RouteStateSnapShot) : boolean {
        if (this.authService.isAdmin()) {
            this.router.navigate(['/mainpage/admin-scheduler']);
            return false;
        } else {
            return true;
        }
    }
}