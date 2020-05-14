import { IAlertProperties } from '../interfaces/ialert-properties';

export class AlertProperties implements IAlertProperties {

    id: string;
    status: string;
    category: string;
    severity: string;
    urgency: string;
    event: string;
    senderName: string;
    headline: string;
    description: string;
    response: string;
    messageType: string;
    certainty: string;
    areaDesc: string;
    sent: Date;
    effective: Date;
    onset: Date;
    expires: Date;
    ends: Date;

    constructor() {
        this.id = '';
        this.status = '';
        this.severity = '';
        this.urgency = '';
        this.event = '';
        this.senderName = '';
        this.headline = '';
        this.description = '';
        this.response = '';
        this.messageType = '';
        this.certainty = '';
        this.areaDesc = '';
        this.sent = new Date();
        this.effective = new Date();
        this.onset = new Date();
        this.expires = new Date();
        this.ends = new Date();
    }
}
