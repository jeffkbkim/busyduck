
import {Component, OnInit} from "@angular/core";
import {CurrentUserService} from "./current-user.service";
import {User} from "../../auth/user.model";
@Component ({
    selector: 'app-mainpage',
    providers: [CurrentUserService],
    templateUrl: './mainpage.component.html'
})

export class MainpageComponent implements OnInit {
    constructor(private currUserService : CurrentUserService) {}

    ngOnInit() : void {
        this.currUserService.getCurrUser()
            .subscribe(
            (curr_user) => {
                this.currUserService.setCurrUser(curr_user);
            },
            err => {
                console.log(err)
            }
        );
    }

}