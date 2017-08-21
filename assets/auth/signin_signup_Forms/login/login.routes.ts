

import {Routes} from "@angular/router";
import {SigninAdminComponent} from "./signin.admin.component";
import {SigninUserComponent} from "./signin.user.component";
export const LOGIN_ROUTES: Routes = [
    { path: 'user', component: SigninUserComponent },
    { path: 'admin', component: SigninAdminComponent },
    { path: '', redirectTo: 'user', pathMatch: 'full'}
];