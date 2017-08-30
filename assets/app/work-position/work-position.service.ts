
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {WorkPosition} from "./work-position.model";
import {Observable} from "rxjs";
@Injectable()

export class WorkPositionService {
    workPositions : WorkPosition[] = [];

    constructor(private http: Http) {}

    requestPosition(workPosition: WorkPosition) {
        const body = JSON.stringify(workPosition);
        const headers = new Headers({'Content-Type': 'application/json'});
        const userId = localStorage.getItem('userId');

        return this.http.patch('http://localhost:3000/work-position/' + userId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getWorkPositions() {
        const userId = localStorage.getItem('userId');
        return this.http.get('http://localhost:3000/work-position/' + userId)
            .map((response: Response) => {
                const workPositions = response.json().obj;
                let transformedWorkPositions: WorkPosition[] = [];
                for (let workPosition of workPositions) {
                    transformedWorkPositions.push(new WorkPosition(
                        workPosition.workplace,
                        workPosition.type,
                        workPosition.status,
                        workPosition.color
                    ));
                }
                this.workPositions = transformedWorkPositions;
                return transformedWorkPositions;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
}