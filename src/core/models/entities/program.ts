import { Entity } from '../app/entity';

export interface Program extends Entity {
    name: string;
    budget: number;
    create_date: string;
    status: string;
    url: string;
}
