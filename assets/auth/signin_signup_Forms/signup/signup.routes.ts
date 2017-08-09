

import {Routes} from "@angular/router";
import {SignupAdminComponent} from "./signup.admin.component";
import {SignupUserComponent} from "./signup.user.component";
export const SIGNUP_ROUTES: Routes = [
    { path: 'user', component: SignupUserComponent },
    { path: 'admin', component: SignupAdminComponent },
    { path: '', redirectTo: 'user', pathMatch: 'full'}
];