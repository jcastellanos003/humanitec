export interface Entity {
    id: number;
}

export interface EntityShape<T extends Entity> {
    [id: number]: T;
}
