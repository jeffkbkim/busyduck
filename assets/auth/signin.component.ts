import {Component, OnInit, Input} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../app/user.model";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent {

}