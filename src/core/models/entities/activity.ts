import { Entity } from '../app/entity';

export interface Activity extends Entity {
    programId: number;
    name: string;
    startDate: string;
    endDate: string;
    asignee?: string;
}
