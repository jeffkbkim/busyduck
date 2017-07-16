import {Routes} from "@angular/router";
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {LogoutComponent} from "./logout.component";
import {MainpageComponent} from "../app/mainpage/mainpage.component";
import {AuthGuardService} from "../app/auth-guard-service";

// these paths are now seen relative of /auth
// ex: localhost:3000/auth/[ .... ]
export const AUTH_ROUTES: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'signin', pathMatch: 'full', canActivate:[AuthGuardService] }
];

