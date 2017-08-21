
import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {User} from "../../../app/user.model";
@Component({
    selector: 'my-signup-admin',
    templateUrl: './signup.admin.component.html'
})
export class SignupAdminComponent implements OnInit {
    isAdmin: boolean = true;

    registerForm: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.registerForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9-](?:[a-z0-9-]*[a-z0-9-])?\.)+[a-z0-9-](?:[a-z0-9-]*[a-z0-9-])?")
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.registerForm.value.email,
            this.registerForm.value.password,
            this.isAdmin,
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
        );
        this.authService.signup(user)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        this.registerForm.reset();
    }
}