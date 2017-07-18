import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent {
    registerForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-](?:[a-z0-9-]*[a-z0-9-])?\.)+[a-z0-9-](?:[a-z0-9-]*[a-z0-9-])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.registerForm.value.email, this.registerForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/mainpage');
                },
                error => console.error(error)
            );

        this.registerForm.reset();
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}