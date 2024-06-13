import { IAlertProperties } from './ialert-properties';

export interface IAlert {
    id: string;
    type: string;
    properties: IAlertProperties;
}