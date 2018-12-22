import { StorageData } from '@humanitec/core';

export const setFromLocalStorage = (key: string, data: StorageData): void => {
    const entities = {
        ...getLocalStorageData(key),
        ...data
    };

    applyLocalStorageData(key, entities);
};

export const removeFromLocalStorage = (key: string, id: string): void => {
    const { [id]: removed, ...entities } = getLocalStorageData(key);

    applyLocalStorageData(key, entities);
};

export const getFromLocalStorage = (key: string, id: any): string => {
    const entities = getLocalStorageData(key);

    if (entities) {
        return entities[id];
    }
};

export function getLocalStorageData(key: string): any {
    return JSON.parse(localStorage.getItem(key));
}

export function applyLocalStorageData(key: string, entities: any): void {
    localStorage.setItem(key, JSON.stringify(entities));
}
