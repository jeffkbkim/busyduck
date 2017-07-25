import {Routes} from "@angular/router";
import {SchedulerComponent} from "./scheduler/scheduler.component";
import {ChatComponent} from "./chat/chat.component";
import {ProfileComponent} from "./profile/profile.component";
import {LogoutComponent} from "./logout.component";

// these paths are now seen relative of /auth
// ex: localhost:3000/auth/[ .... ]
export const MAINPAGE_ROUTES:
    Routes = [
    { path: 'scheduler', component: SchedulerComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'logout', component: LogoutComponent },
    { path: '', redirectTo: 'scheduler', pathMatch: 'full'}
];

