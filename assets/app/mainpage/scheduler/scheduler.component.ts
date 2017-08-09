
import {Component, Input, AfterViewInit} from "@angular/core";
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

    @Input() tempPreferredSchedule = [
        {
            "work": "White Windmill",
            "schedule":
            [
                {
                    "day": 1,
                    "start": 10,
                    "duration": 5
                },
                {
                    "day": 2,
                    "start": 14,
                    "duration": 4
                }
            ]
        }
        ,
        {
            "work": "Jang Su Jang",
            "schedule":
            [
                {
                    "day": 3,
                    "start": 8,
                    "duration": 5
                },
                {
                    "day": 4,
                    "start": 16,
                    "duration": 6
                },
                {
                    "day": 6,
                    "start": 14,
                    "duration": 8
                }
            ]
        },
        {
            "work": "Emily J",
            "schedule":
            [
                {
                    "day": 1,
                    "start": 17,
                    "duration": 2
                }
            ]
        }
    ];

    colorSchemaArray : Array<string> = ["#A8185F", "#E7D016", "#18A819"];

    ngAfterViewInit(): void {
        for (let i : number = 0; i < this. tempPreferredSchedule.length; i++) {
            for (let j : number = 0; j < this.tempPreferredSchedule[i].schedule.length; j++) {
                let day : number = this.tempPreferredSchedule[i].schedule[j].day;
                let start : number = this.tempPreferredSchedule[i].schedule[j].start - 7;
                let duration : number = this.tempPreferredSchedule[i].schedule[j].duration;

                for (let offset : number = 0; offset < duration; offset++) {
                    let targetID : string = (start + offset).toString() + "_" + (day).toString();
                    document.getElementById(targetID).style.backgroundColor = this.colorSchemaArray[i];
                }
            }
        }
    }

    // ngOnChanges(): 
}