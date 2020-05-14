export interface IAlertProperties {
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
}
