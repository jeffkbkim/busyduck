import {Routes} from "@angular/router";
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {LOGIN_ROUTES} from "./signin_signup_Forms/login/login.routes";
import {SIGNUP_ROUTES} from "./signin_signup_Forms/signup/signup.routes";

// these paths are now seen relative of /auth
// ex: localhost:3000/auth/[ .... ]
export const AUTH_ROUTES: Routes = [
    { path: 'signup', component: SignupComponent, children: SIGNUP_ROUTES },
    { path: 'signin', component: SigninComponent, children: LOGIN_ROUTES },
    { path: '', redirectTo: 'signup', pathMatch: 'full'}
];

