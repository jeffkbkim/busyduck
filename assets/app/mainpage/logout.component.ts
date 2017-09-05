import {Component} from "@angular/core";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
@Component({
    selector: 'app-logout',
    template: `
    <style>
    .header {
        height:14vh;
    }

    .header>h1 {
        font-size: 9vh;
        padding-top: 0.6%;
        padding-left: 3%;
        text-align: left;
        vertical-align: middle;
        position: absolute;
    }

    .btn.btn.normal {
        border: 2px solid #595C57
    }

    </style>
    <div style="height: 90vh;">
    <div class="header">
        <h1>Are you sure?</h1>
    </div>
    <div style='text-align:center;'>
        <button class="btn btn normal" style='margin: auto; display:block' (click)="onLogout()">
            😈
            Yes
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