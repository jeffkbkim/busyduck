import {Component, Input, OnInit} from "@angular/core";
import {CurrentUserService} from "../current-user.service";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {User} from "../../user.model";
import {WorkPositionService} from "../../work-position/work-position.service";
import {WorkPosition} from "../../work-position/work-position.model";

@Component({
    selector: "my-profile",
    templateUrl: "./profile.component.html"
})

export class ProfileComponent implements OnInit {
    @Input() currUser : User;
    rForm : FormGroup;
    post:any;
    description : string = "";
    firstName : string = "";
    lastName : string = "";

    passwordForm : FormGroup;
    passwordConfirmed : boolean = true;
    workPositions: WorkPosition[];
    tempPositions: any = [
        {
            "workid": "0xbed0",
            "workName": "White Windmill",
            "type": "cashier",
            "status": "approved",
            "color": "#eee"
        },
        {
            "workid": "0xff3b",
            "workName": "Jang Su Jang",
            "type": "cook",
            "status": "approved",
            "color": "#eee"
        },
        {
            "workid": "0x0car",
            "workName": "Emily J",
            "type": "hair designer",
            "status": "waiting_for_approval",
            "color": "#eee"
        }
    ];

    tempPositionsNew = this.tempPositions.map(
        function(x:any, index:number):object {
            x.color = ["#A8185F", "#E7D016", "#18A819"][index];
            x.glyphicon = {"cashier": "glyphicon glyphicon-credit-card",
                            "cook": "glyphicon glyphicon-cutlery",
                            "hair designer": "glyphicon glyphicon-scissors"
                        }[x.type];
            return x;
        }
    );

    constructor(private currUserService : CurrentUserService, private workPositionService : WorkPositionService, private fb: FormBuilder) {
        this.currUser = this.currUserService.curr_User;

        this.rForm = fb.group({
            "firstName" : [null, Validators.required],
            "lastName" : [null, Validators.required],
            "email" : [null, Validators.required],
            "validate" : ""
        });


    }

    addPost(post) {
        this.description = post.email;
        this.firstName = post.firstName;
        this.lastName = post.lastName;
    }

    submitPassword(post) {
        if (post.newPassword != post.confirmPassword) {
            this.passwordConfirmed = false;

        } else {
            const user = new User(this.currUser.email, this.passwordForm.value.oldPassword, this.currUser.isAdmin);
            this.currUserService.updatePassword(user, post.newPassword)
                .subscribe(
                    (token) => {
                        localStorage.setItem('token', token);
                        console.log("Updated Successfully!");
                    },
                    err => {
                        console.log(err);
                    }
                );
        }
        // if (this.currUserService.curr_User == null) {
        //     this.currUserService.getCurrUser()
        //         .subscribe(
        //             (curr_user) => {
        //                 this.currUserService.setCurrUser(curr_user);
        //                 this.currUser = curr_user;
        //             },
        //             err => {
        //                 console.log(err);
        //             }
        //         );
        // }
        this.passwordForm.reset();
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

        this.passwordForm = new FormGroup({
            oldPassword: new FormControl(null, Validators.required),
            newPassword: new FormControl(null, Validators.required),
            confirmPassword: new FormControl(null, Validators.required)
        });

        this.workPositionService.getWorkPositions()
            .subscribe(
                (workPositions : WorkPosition[]) => {
                    console.log(workPositions);
                    this.workPositions = workPositions;
                },
                    err => {
                        console.log(err);
                    }
            );
    }
}