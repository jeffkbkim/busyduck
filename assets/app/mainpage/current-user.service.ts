import {Injectable} from "@angular/core";
import {User} from "../../auth/user.model";
import {Http, Response} from "@angular/http";
import {Observable, Subject} from "rxjs";
@Injectable()

export class CurrentUserService {
    //private currUser : Subject<User> = new Subject<User>();
    //currUser$ = this.currUser.asObservable();
    curr_User: User;
    constructor(private http: Http) {}

    setCurrUser(user: User) {
        this.curr_User = user;
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