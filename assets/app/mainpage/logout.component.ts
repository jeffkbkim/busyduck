import {Component} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-logout',
    template: `
    <div class="header" style="background-color:#07889B; color:azure; height:100px;">
        <h1 style="padding-top: 15px; text-align:center">Are you sure you want to leave us?😢</h1>
    </div>
    <div class="col-xs-12" style='text-align:center'>
        <button class="btn btn-danger" style='margin: auto; margin-top: 5%; width:150px; height:50px; display:block' (click)="onLogout()">
            <span class="glyphicon glyphicon-erase" style=""></span>
            Yes
        </button>
    </div>
`
})

export class LogoutComponent {
    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}