
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

    _actual: boolean = true;
    _preferred: boolean = false;

    actualChecked(evt) {
      if (evt.target.checked) {
        this._actual = true;
        this._preferred = false;
      } else {
        this._actual = false;
        this._preferred = true;
      }
    }

    preferredChecked(event) {
      if (event.target.checked) {
        this._actual = false;
        this._preferred = true;
      } else {
        this._actual = true;
        this._preferred = false;
      }
    }

    toggle(event) {
        let clickedID : string = event.target.id;
    }

    downId : string;
    downAction(downId) {
        this.downId = downId;
        this.colorCell(downId);
    }

    colorCell(hover_id) {
        let hover_idArray = hover_id.split("_");
        let downIdArray = this.downId.split("_");
        if (hover_idArray[1] === downIdArray[1]) {
            document.getElementById(hover_id).style.backgroundColor = this.colorSchemaArray[0];
        }
    }

    upAction(upId) {
        let upIdArray = upId.split("_");
        let downIdArray = this.downId.split("_");

        // make sure a user inputs a day's schedule
        if (upIdArray[1] === downIdArray[1]) {
            this.colorCell(this.downId);
            let startTime: string = (Number(downIdArray[0]) + 7).toString();
            let startDay : number = Number(downIdArray[1]);
            let duration : string = (1 + Number(upIdArray[0]) - Number(downIdArray[0])).toString();
            alert ("Work on " + this.dates[startDay].day + " starts at " + startTime + " for " + duration + " hours");
        }
    }

    hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

    ngOnInit() {
        this.newJobForm = new FormGroup({
            location: new FormControl(null, Validators.required),
            position: new FormControl(null, Validators.required)
        });
    }

    dates = [{"day" : "Monday", "id": 0},
            {"day" : "Tuesday", "id": 1},
            {"day" : "Wednesday", "id": 2},
            {"day" : "Thursday", "id": 3},
            {"day" : "Friday", "id":  4},
            {"day" : "Saturday", "id":  5},
            {"day" : "Sunday", "id": 6}];

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
                    "day": 0,
                    "start": 10,
                    "duration": 5
                },
                {
                    "day": 1,
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
                    "day": 2,
                    "start": 8,
                    "duration": 5
                },
                {
                    "day": 3,
                    "start": 16,
                    "duration": 6
                },
                {
                    "day": 5,
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
                    "day": 0,
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