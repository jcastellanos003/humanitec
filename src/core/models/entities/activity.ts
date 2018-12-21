import { Entity } from '../app/entity';

export interface Activity extends Entity {
    programId: number;
    name: string;
    expected_start_date: string;
    expected_end_date: string;
    workflowlevel1: string;
    asignee?: string;
}
