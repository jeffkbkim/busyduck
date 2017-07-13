//angular ships with built-in router
//need to tell angular what routes we have in our app

import {Routes, RouterModule} from "@angular/router";
import {AuthenticationComponent} from "../auth/authentication.component";
import {AUTH_ROUTES} from "../auth/auth.routes";

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/auth', pathMatch: 'full' },
    {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

//make angular aware
//re-export modified routes
export const routing = RouterModule.forRoot(APP_ROUTES);


