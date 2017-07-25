import {Component, Input, OnInit} from "@angular/core";
import {CurrentUserService} from "../current-user.service";
import {User} from "../../../auth/user.model";


@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    @Input() currUser : User;
    constructor(private currUserService : CurrentUserService) {
        this.currUser = this.currUserService.curr_User;
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