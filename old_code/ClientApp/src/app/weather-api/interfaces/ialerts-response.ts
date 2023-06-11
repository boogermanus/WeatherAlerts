import { IAlert } from './ialert';

export interface IAlertsResponse {
    type: string;
    features: IAlert[];
}
