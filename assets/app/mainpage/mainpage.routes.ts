import {Routes} from "@angular/router";
import {SchedulerComponent} from "./scheduler.component";

// these paths are now seen relative of /auth
// ex: localhost:3000/auth/[ .... ]
export const MAINPAGE_ROUTES
: Routes = [
    { path: 'scheduler', component: SchedulerComponent },
    { path: '', redirectTo: 'scheduler', pathMatch: 'full'}
];

