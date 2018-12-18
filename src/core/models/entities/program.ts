import { Entity } from '../app/entity';

export interface Program extends Entity {
    name: string;
    budget: number;
    createDate: string;
    status: string;
}
