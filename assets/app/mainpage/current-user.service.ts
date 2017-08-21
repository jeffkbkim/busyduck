import {Injectable} from "@angular/core";
import {User} from "../user.model";
import {Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
@Injectable()

export class CurrentUserService {
    curr_User: User;
    constructor(private http: Http) {}

    setCurrUser(user: User) {
        this.curr_User = user;
    }

    getCurrUser() {
        const token = localStorage.getItem('token') ?
            '?token=' + localStorage.getItem('token')
            : '';

        return this.http.get('http://localhost:3000/user' + token)
            .map((response: Response) => {
                const user =  response.json().user;
                return new User(user.email, user.password, user.firstName, user.lastName);
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


}