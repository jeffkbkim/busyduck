
import {Component} from "@angular/core";
@Component({
    selector: "app-scheduler",
    templateUrl: "./scheduler.component.html",
    styleUrls: ["./scheduler.component.css"]
})

export class SchedulerComponent {
    dates = [{"day" : "Monday", "id": 1},
            {"day" : "Tuesday", "id": 2},
            {"day" : "Wednesday", "id": 3},
            {"day" : "Thursday", "id": 4},
            {"day" : "Friday", "id":  5},
            {"day" : "Saturday", "id":  6},
            {"day" : "Sunday", "id": 7}];

}