import {Injectable} from "@angular/core";
import {User} from "../user.model";
import {Http, Response, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";

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
                return new User(user.email, user.password, user.isAdmin, user.firstName, user.lastName);
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }

    updatePassword(user: User, newPassword : string) {
        const token = localStorage.getItem('token') ?
            '?token=' + localStorage.getItem('token')
            : '';
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('email', user.email);
        urlSearchParams.append('password', user.password);
        urlSearchParams.append('newPassword', newPassword);
        let body = urlSearchParams.toString();
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.http.put('http://localhost:3000/user/updatePassword' + token, body, {headers: headers})
            .map((response: Response) => {
                return response.json().token;
            })
            .catch((error: Response) => Observable.throw(error.json()));

    }


}