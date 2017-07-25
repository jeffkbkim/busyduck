import {Component, Input} from "@angular/core";
import {CurrentUserService} from "../current-user.service";
import {User} from "../../../auth/user.model";


@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent {
    @Input() currUser : User;
    constructor(private currUserService : CurrentUserService) {
        this.currUser = this.currUserService.curr_User;
    }
}