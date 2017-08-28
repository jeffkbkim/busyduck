export class WorkPosition {
    workplace: string;
    type: string;
    status: string;
    color: string;
    positionId?: string;
    userId?: string;

    constructor (workplace: string, type: string, status: string, color: string, positionId?: string, userId?: string) {
        this.workplace = workplace;
        this.type = type;
        this.status = status;
        this.color = color;
        this.positionId = positionId;
        this.userId = userId;
    }
}