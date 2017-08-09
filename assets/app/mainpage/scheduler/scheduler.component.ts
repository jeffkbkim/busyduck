
import {Component, OnInit} from "@angular/core";
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

    tempSchedule = [
        {
            "work": "White Windmill",
            "schedule":
            [
                {
                    "day": 1,
                    "start": 10,
                    "duration": 8
                },
                {
                    "day": 2,
                    "start": 14,
                    "duraton": 4
                }
            ]
        }
    ];

    ngOnInit(): void {
        for (let i : number = 0; i < this.tempSchedule[0].schedule.length; i++) {
            let day : number = this.tempSchedule[0].schedule[i].day;
            let start : number = this.tempSchedule[0].schedule[i].start - 7;
            let targetID : string = start.toString() + "_" + day.toString();
            console.log(targetID);
            console.log(document.getElementById(targetID));
        }
    }
}