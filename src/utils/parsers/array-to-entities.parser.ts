import { Entity, EntityShape } from '@humanitec/core';

export const parseArrayToEntities = <T extends Entity>(
    list: Array<T>,
    initialValue: EntityShape<T>
): EntityShape<T> => {
    return list.reduce(
        (entities: { [id: number]: T }, entity: T) => {
            return {
                ...entities,
                [entity.id]: entity
            };
        },
        {
            ...initialValue
        }
    );
};
