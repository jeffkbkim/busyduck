import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {CurrentUserService} from "./mainpage/current-user.service";

@Component({
    selector: 'app-footer',

    templateUrl: './footer.component.html'
})

export class FooterComponent {
    public isCollapsed = true;
    constructor(private authService: AuthService){}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}