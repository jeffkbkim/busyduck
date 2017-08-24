
import {Component, Input, AfterViewInit} from "@angular/core";
import {FormGroup, Validators, FormControl} from "@angular/forms";
@Component({
    selector: "app-scheduler",
    templateUrl: "./scheduler.component.html",
    styleUrls: ["./scheduler.component.css"]
})

export class SchedulerComponent {
    workplaceIsCollapsed = false;
    funcIsCollapsed = false;

    newJobForm: FormGroup;
    onSubmit(): void {
        alert(this.newJobForm.value.location + this.newJobForm.value.position);
    }

    _actual: boolean = true;
    _preferred: boolean = false;

    // paint select
    paintColorIndex : number = 0;
    paintColor(index : number): void {
        let div : any= document.getElementById("text_div_"+index);
        for (let i:number=0; i < this.tempPositions.length; i++) {
            if (i !== index) {
                document.getElementById("text_div_"+i).style.color = "#0a0a0a";
            }
        }
        div.style.color = "#4360FF";
        document.getElementById("delete_color").style.color = "#0a0a0a";
        document.getElementById("blackout").style.color = "#0a0a0a";
        this.paintColorIndex = index;
    }

    deleteColor(): void {
        for (let i:number=0; i < this.tempPositions.length; i++) {
            document.getElementById("text_div_"+i).style.color = "#0a0a0a";
        }
    }

    eraserFunc(): void {
        this.deleteColor();
        document.getElementById("delete_color").style.color = "#4360FF";
        document.getElementById("blackout").style.color = "#0a0a0a";
        this.paintColorIndex = this.colorSchemaArray.length -1;
    }

    blackoutFunc(): void {
        this.deleteColor();
        document.getElementById("delete_color").style.color = "#0a0a0a";
        document.getElementById("blackout").style.color = "#4360FF";
        this.paintColorIndex = this.colorSchemaArray.length -2;
    }
    //

    // scheduler
    toggle(event: any): void {
        let clickedID : string = event.target.id;
    }

    clicked : boolean;

    downId : string;
    downAction(downId : string): void {
        if (this._preferred) {
            this.downId = downId;
            this.clicked = true;
            this.colorCell(downId);
        }

    }

    affected: Array<string> = [];
    colorCell(hover_id : string): void {
        if (this.clicked) {
            try {
                let hover_idArray : Array<string> = hover_id.split("_");
                let downIdArray : Array<string> = this.downId.split("_");
                let newID : string = hover_idArray[0] + "_" + downIdArray[1];
                if (hover_idArray[1] === downIdArray[1]) {
                    document.getElementById(hover_id).style.backgroundColor = this.colorSchemaArray[this.paintColorIndex];
                    this.affected.push(hover_id);
                } else {
                    document.getElementById(newID).style.backgroundColor = this.colorSchemaArray[this.paintColorIndex];
                    this.affected.push(newID);
                }
            } catch(e) {
                // empty
            }
        }
    }

    upAction(upId : string): void {
        let upIdArray : Array<string> = upId.split("_");
        let downIdArray : Array<string> = this.downId.split("_");
        let newID : string = upIdArray[0] + "_" + downIdArray[1];

        this.colorCell(newID);
        let startTime: string = (Number(downIdArray[0]) + 7).toString();
        let startDay : number = Number(downIdArray[1]);
        let duration : string = (1 + Number(upIdArray[0]) - Number(downIdArray[0])).toString();
        if (this.paintColorIndex !== this.colorSchemaArray.length-1) {
            console.log("Work on " + this.dates[startDay].day + " starts at " + startTime + " for " + duration + " hours");
        }
        this.affected = [];

        this.clicked = false;
    }

    entireDay(id: string): void {
        if (this._preferred) {
            for (let i:number=0; i < this.hours.length; i++) {
                let color_id : string = this.hours[i].toString() + "_" + id.toString();
                document.getElementById(color_id).style.backgroundColor = this.colorSchemaArray[this.paintColorIndex];
            }
        }

    }
    //

    // button actions
    clearAll(): void {
        for (let i:number=0; i < this.hours.length; i++) {
            for (let j:number=0; j < this.dates.length; j++) {
                let cell_id : string = this.hours[i].toString() + "_" + j.toString();
                 document.getElementById(cell_id).style.backgroundColor = this.colorSchemaArray[this.colorSchemaArray.length-1];
            }
        }
    }

    resetAll(): void {
        this.buildPreferredSchedule();
    }

    colorToHex(color: string): string {
        try {
            let colorArray: Array<string> = color.split("(")[1].split(")")[0].split(",");
            let r : string = Number(colorArray[0]).toString(16).toUpperCase();
            let g : string = Number(colorArray[1]).toString(16).toUpperCase();
            let b : string = Number(colorArray[2]).toString(16).toUpperCase();
            let rgb : string = "#" + r + g + b;
            return rgb;
        } catch(e) {
            return "";
        }

    }

    saveAll(): void {
        // reset the schedule
        this.tempPreferredSchedule.forEach(i => i.schedule.length = 0);
        this.blackoutSchedule[0].schedule.length = 0;

        // generate a new JSON based on current schedule
        for (let i:number = 0; i < this.dates.length; i++) {
            let start : number = 0;
            let duration : number = 0;
            let lastWorkID : number = -1;
            let scheduleArray : Array<number> = [];
            for (let j:number = 0; j < this.hours.length; j++) {
                let id: string = this.hours[j].toString() + "_" + i.toString();
                let color: string = document.getElementById(id).style.backgroundColor;
                let hexColor : string = this.colorToHex(color);
                let workID : number = this.colorSchemaArray.indexOf(hexColor);
                scheduleArray.push(workID); // e.g. [1, 2, 2, -1, -1, 1, 0, 0, -1, -1]
            }

            let currentWork : number;
            while (start < this.hours.length) {
                duration = 0;
                if (scheduleArray[start] !== -1) {
                    while (scheduleArray[start] === scheduleArray[start + duration]) {
                        duration++;
                    }
                    if (scheduleArray[start] === this.colorSchemaArray.length -2) {
                        this.blackoutSchedule[0].schedule.push({"day": i, "start": start+8, "duration": duration});
                    } else {
                        this.tempPreferredSchedule[scheduleArray[start]].schedule.push({"day": i, "start": start+8, "duration": duration});
                    }
                    start += duration;
                }
                start ++;
            }
        }
        alert(JSON.stringify(this.tempPreferredSchedule) + JSON.stringify(this.blackoutSchedule));
    }
    //


    hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];

    ngOnInit(): void {
        this.newJobForm = new FormGroup({
            location: new FormControl(null, Validators.required),
            position: new FormControl(null, Validators.required)
        });
    }

    dates = [{"day" : "Mon", "id": 0},
            {"day" : "Tue", "id": 1},
            {"day" : "Wed", "id": 2},
            {"day" : "Thu", "id": 3},
            {"day" : "Fri", "id":  4},
            {"day" : "Sat", "id":  5},
            {"day" : "Sun", "id": 6}];

    colorSchemaArray : Array<string> = ["#A8185F", "#E7D016", "#18A819", "#F47917", "#0091A7", "#414141", "#eee"];
    // last two elements are special

    tempPositions: any = [
        {
            "workid": "0xbed0",
            "workName": "American Deli",
            "type": "cashier",
            "status": "approved",
            "color": "#eee"
        },
        {
            "workid": "0xff3b",
            "workName": "Taco Mac",
            "type": "cook",
            "status": "approved",
            "color": "#eee"
        },
        {
            "workid": "0x0car",
            "workName": "Crazy Cutz",
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

    @Input() blackoutSchedule = [
        {
            "schedule":
            [
                {
                    "day": 0,
                    "start": 0,
                    "duration": 0
                }
            ]
        }
    ]

    @Input() tempPreferredSchedule = [
        {
            "work": "American Deli",
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
            "work": "Taco Mac",
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
            "work": "Crazy Cutz",
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

    @Input() tempActualSchedule = [
        {
            "work": "American Deli",
            "schedule":
            [
                {
                    "day": 0,
                    "start": 13,
                    "duration": 8
                },
                {
                    "day": 3,
                    "start": 10,
                    "duration": 8
                },
                {
                    "day": 6,
                    "start": 13,
                    "duration": 8
                }
            ]
        }
        ,
        {
            "work": "Taco Mac",
            "schedule":
            [
                {
                    "day": 2,
                    "start": 9,
                    "duration": 6
                },
                {
                    "day": 4,
                    "start": 9,
                    "duration": 6
                }
            ]
        },
        {
            "work": "Crazy Cutz",
            "schedule":
            [
            ]
        }
    ];

    buildBlackoutSchedule(): void {
        for (let j : number = 0; j < this.blackoutSchedule[0].schedule.length; j++) {
            let day : number = this.blackoutSchedule[0].schedule[j].day;
            let start : number = this.blackoutSchedule[0].schedule[j].start - 7;
            let duration : number = this.blackoutSchedule[0].schedule[j].duration;

            for (let offset : number = 0; offset < duration; offset++) {
                let targetID : string = (start + offset).toString() + "_" + (day).toString();
                document.getElementById(targetID).style.backgroundColor = "#414141";
            }
        }
    }

    buildPreferredSchedule(): void {
        this._actual = false;
        this._preferred = true;
        document.getElementById("preferredbutton").style.backgroundColor = "#428bca";
        document.getElementById("preferredbutton").style.color = "white";
        document.getElementById("actualbutton").style.backgroundColor = "white";
        document.getElementById("actualbutton").style.color = "#428bca";
        let tds = document.getElementsByTagName("td");
        for(let i:number=0; i < tds.length; i++) {
            tds[i].style.cursor = "pointer";
        }
        this.deleteColor();
        this.clearAll();
        for (let i : number = 0; i < this.tempPreferredSchedule.length; i++) {
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
        this.buildBlackoutSchedule();
    }

    buildActualSchedule(): void {
        this._actual = true;
        this._preferred = false;
        document.getElementById("actualbutton").style.backgroundColor = "#428bca";
        document.getElementById("actualbutton").style.color = "white";
        document.getElementById("preferredbutton").style.backgroundColor = "white";
        document.getElementById("preferredbutton").style.color = "#428bca";
        let tds = document.getElementsByTagName("td");
        for(let i:number=0; i < tds.length; i++) {
            tds[i].style.cursor = "default";
        }
        this.clearAll();
        for (let i : number = 0; i < this. tempActualSchedule.length; i++) {
            for (let j : number = 0; j < this.tempActualSchedule[i].schedule.length; j++) {
                let day : number = this.tempActualSchedule[i].schedule[j].day;
                let start : number = this.tempActualSchedule[i].schedule[j].start - 7;
                let duration : number = this.tempActualSchedule[i].schedule[j].duration;

                for (let offset : number = 0; offset < duration; offset++) {
                    let targetID : string = (start + offset).toString() + "_" + (day).toString();
                    document.getElementById(targetID).style.backgroundColor = this.colorSchemaArray[i];
                }
            }
        }
    }

    ngAfterViewInit(): void {
        this.buildActualSchedule();
    }

    // ngOnChanges():
}