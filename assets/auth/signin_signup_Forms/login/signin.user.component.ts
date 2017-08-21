import {Component, OnInit, Input} from "@angular/core";
import {User} from "../../../app/user.model";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
@Component ({
    selector: 'my-signinUser',
    templateUrl: './signin.user.component.html'
})

export class SigninUserComponent implements OnInit {
    isAdmin : boolean = false;
    @Input() user: User;
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

        if (this.isLoggedIn()) {
            this.authService.getCurrUser()
                .subscribe(
                    (currUser: User) => this.user = currUser
                );

        }

    }

    onSubmit() {
        const user = new User(this.registerForm.value.email, this.registerForm.value.password, this.isAdmin);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('isAdmin', data.isAdmin);
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