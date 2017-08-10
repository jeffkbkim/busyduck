
import {Component, Input, AfterViewInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
@Component({
    selector: "app-scheduler",
    templateUrl: "./scheduler.component.html",
    styleUrls: ["./scheduler.component.css"]
})

export class SchedulerComponent {
    newJobForm: FormGroup;
    onSubmit() {
        alert(this.newJobForm.value.location + this.newJobForm.value.position);
    }

    ngOnInit() {
        this.newJobForm = new FormGroup({
            location: new FormControl(null, Validators.required),
            position: new FormControl(null, Validators.required)
        });
    }

    dates = [{"day" : "Monday", "id": 1},
            {"day" : "Tuesday", "id": 2},
            {"day" : "Wednesday", "id": 3},
            {"day" : "Thursday", "id": 4},
            {"day" : "Friday", "id":  5},
            {"day" : "Saturday", "id":  6},
            {"day" : "Sunday", "id": 7}];

    colorSchemaArray : Array<string> = ["#A8185F", "#E7D016", "#18A819"];

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
            "type": "hair",
            "status": "waiting_for_approval",
            "color": "#eee"
        }
    ];

    tempPositionsNew = this.tempPositions.map(
        function(x:any, index:number):object {
            x.color = ["#A8185F", "#E7D016", "#18A819"][index];
            x.glyphicon = {"cashier": "glyphicon glyphicon-credit-card",
                            "cook": "glyphicon glyphicon-cutlery",
                            "hair": "glyphicon glyphicon-scissors"
                        }[x.type];
            return x;
        }
    );

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