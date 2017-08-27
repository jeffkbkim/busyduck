import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {CurrentUserService} from "./mainpage/current-user.service";

@Component({
    selector: 'app-header',

    templateUrl: './header.component.html'
})

export class HeaderComponent {
    public isCollapsed = true;
    constructor(private authService: AuthService){}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isAdmin() {
        return this.authService.isAdmin();
    }

}