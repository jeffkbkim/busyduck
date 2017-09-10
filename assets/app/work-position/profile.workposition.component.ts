import {Component, Input} from "@angular/core";
import {WorkPosition} from "./work-position.model"

@Component({
    selector: 'my-profile-workPosition',
    templateUrl: './profile.workposition.component.html'
})

export class ProfileWorkPositionComponent {
    @Input() workPosition : WorkPosition;
}