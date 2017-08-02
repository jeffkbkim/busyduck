import {Component, Input, OnInit} from "@angular/core";
import {CurrentUserService} from "../current-user.service";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from "../../../auth/user.model";


@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    @Input() currUser : User;
    rForm : FormGroup;
    post:any;
    description : string = '';
    name : string = '';

    constructor(private currUserService : CurrentUserService, private fb: FormBuilder) {
        this.currUser = this.currUserService.curr_User;

        this.rForm = fb.group({
            'name' : [null, Validators.required],
            'description' : [null, Validators.compose([Validators.required, Validators.minLength(30) , Validators.maxLength(500)])],
            'validate' : ''
        });
    }

    addPost(post) {
        this.description = post.description;
        this.name = post.name;
    }

    ngOnInit() {
        if (this.currUserService.curr_User == null) {
            this.currUserService.getCurrUser()
                .subscribe(
                    (curr_user) => {
                    this.currUserService.setCurrUser(curr_user);
                    this.currUser = curr_user;
                },
                    err => {
                        console.log(err);
                    }
                );
        }
    }

}