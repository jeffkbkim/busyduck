export class WorkPosition {
    workplace: string;
    type: string;
    status: string;
    color: string;
    positionId?: string;
    employees?: string[];

    constructor (workplace: string, type: string, status: string, color: string, positionId?: string, employees?: string[]) {
        this.workplace = workplace;
        this.type = type;
        this.status = status;
        this.color = color;
        this.positionId = positionId;
        this.employees = employees;
    }
}