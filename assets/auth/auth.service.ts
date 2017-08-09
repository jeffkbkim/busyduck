import {User} from "../app/user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
    constructor(private http: Http) {}
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getCurrUser() {
        //const headers = new Headers({'Content-Type': 'application/json'});
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