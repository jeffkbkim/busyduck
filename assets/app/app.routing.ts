//angular ships with built-in router
//need to tell angular what routes we have in our app

import {Routes, RouterModule} from "@angular/router";
import {AuthenticationComponent} from "../auth/authentication.component";
import {AUTH_ROUTES} from "../auth/auth.routes";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AuthGuardService} from "./auth-guard-service";
import {MAINPAGE_ROUTES} from "./mainpage/mainpage.routes";

const APP_ROUTES: Routes = [
    {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES },
    {path: 'mainpage', component: MainpageComponent, children: MAINPAGE_ROUTES, canActivate:[AuthGuardService]},
    {path: '', redirectTo: 'mainpage', pathMatch: 'full'},
    {path: '**', redirectTo: '' }
];

//make angular aware
//re-export modified routes
export const routing = RouterModule.forRoot(APP_ROUTES);


