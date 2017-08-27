import {Routes} from "@angular/router";
import {SchedulerComponent} from "./scheduler/scheduler.component";
import {ChatComponent} from "./chat/chat.component";
import {ProfileComponent} from "./profile/profile.component";
import {LogoutComponent} from "./logout.component";
import {AdminSchedulerComponent} from "./scheduler/admin-scheduler.component";
import {EmployeesComponent} from "./employees/employees.component";
import {AdminGuardService} from "./scheduler/admin-guard-service";

// these paths are now seen relative of /auth
// ex: localhost:3000/auth/[ .... ]
export const MAINPAGE_ROUTES:
    Routes = [
    { path: 'scheduler', component: SchedulerComponent, canActivate:[AdminGuardService] },
    { path: 'admin-scheduler', component: AdminSchedulerComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'scheduler', pathMatch: 'full'}
];

