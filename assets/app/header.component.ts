import {Component} from "@angular/core";
import {AuthService} from "../auth/auth.service";

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
}