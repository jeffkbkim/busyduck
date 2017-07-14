
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
@NgModule ({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [BrowserModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [AuthService],
    bootstrap: [AppComponent]
})

export class AppModule {

}