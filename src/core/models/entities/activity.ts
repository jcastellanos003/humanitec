import { Entity } from '../app/entity';

export interface Activity extends Entity {
    name: string;
    startDate: string;
    endDate: string;
    asignee?: string;
}
