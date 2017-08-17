import {Component} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-logout',
    template: `
    <div style="height: 90vh">
    <div style="margin:2% 4% 2% 4%;border: 0.3px solid #07889B; background-color:rgba(5,91,104,0); height: 45vh">
        <div class="header" style="background-color:#07889B; color:azure; height:40px;">
            <p style="font-size: 20px; padding-top:0.4%; margin-left: 3%">Are you sure you want to leave us?😢</p>
        </div>
        <div style='text-align:center;'>
            <button class="btn btn" style='margin: auto; background-color: rgba(168, 24, 95, 0.5); margin-top: 5%; width:150px; height:50px; display:block' (click)="onLogout()">
                😈
                Yes
            </button>
        </div>
    </div>
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