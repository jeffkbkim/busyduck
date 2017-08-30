import {Component} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-logout',
    template: `
    <style>
    .header {
        background-color:#595C57;
        color:azure;
        height:10vh;
        font-size: 9vh;
        padding-left: 2%
    }
    .btn.btn.normal {
        border: 2px solid #595C57
    }
    </style>
    <div style="height: 90vh; background-color:rgba(89, 92, 87, 0.1)">
    <div class="header">
        Logout
    </div>
    <div style='text-align:center;'>
        <button class="btn btn normal" style='margin: auto; margin-top: 5%; display:block' (click)="onLogout()">
            😈
            Logout
        </button>
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