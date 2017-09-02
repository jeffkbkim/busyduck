
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AuthenticationComponent} from "../auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {FooterComponent} from "./footer.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "./mainpage/logout.component";
import {SignupComponent} from "../auth/signup.component";
import {SigninComponent} from "../auth/signin.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AuthGuardService} from "./auth-guard-service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CollapseDirective} from "ng-bootstrap";
import {SchedulerComponent} from "./mainpage/scheduler/scheduler.component";
import {ChatComponent} from "./mainpage/chat/chat.component";
import {ProfileComponent} from "./mainpage/profile/profile.component";
import {SigninAdminComponent} from "../auth/signin_signup_Forms/login/signin.admin.component";
import {SigninUserComponent} from "../auth/signin_signup_Forms/login/signin.user.component";
import {SignupUserComponent} from "../auth/signin_signup_Forms/signup/signup.user.component";
import {SignupAdminComponent} from "../auth/signin_signup_Forms/signup/signup.admin.component";
import {CurrentUserService} from "./mainpage/current-user.service";
import {AdminSchedulerComponent} from "./mainpage/scheduler/admin-scheduler.component";
import {EmployeesComponent} from "./mainpage/employees/employees.component";
import {AdminGuardService} from "./mainpage/scheduler/admin-guard-service";
import {WorkPositionService} from "./work-position/work-position.service";
import {ProfileWorkPositionComponent} from "./mainpage/profile/profile.workposition.component";

@NgModule ({
    declarations: [
        CollapseDirective,
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        FooterComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        SigninAdminComponent,
        SigninUserComponent,
        SignupUserComponent,
        SignupAdminComponent,
        MainpageComponent,
        SchedulerComponent,
        AdminSchedulerComponent,
        ChatComponent,
        EmployeesComponent,
        ProfileComponent,
        ProfileWorkPositionComponent
    ],
    imports: [BrowserModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot()
    ],
    providers: [AuthService, WorkPositionService, CurrentUserService, AuthGuardService, AdminGuardService],
    bootstrap: [AppComponent]
})

export class AppModule {

}