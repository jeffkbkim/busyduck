
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AuthenticationComponent} from "../auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "../auth/logout.component";
import {SignupComponent} from "../auth/signup.component";
import {SigninComponent} from "../auth/signin.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AuthGuardService} from "./auth-guard-service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CollapseDirective} from "ng-bootstrap";
import {SchedulerComponent} from "./mainpage/scheduler.component";

@NgModule ({
    declarations: [
        CollapseDirective,
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        MainpageComponent,
        SchedulerComponent
    ],
    imports: [BrowserModule,
        routing,
        ReactiveFormsModule,
        HttpModule,
        NgbModule.forRoot()
    ],
    providers: [AuthService, AuthGuardService],
    bootstrap: [AppComponent]
})

export class AppModule {

}