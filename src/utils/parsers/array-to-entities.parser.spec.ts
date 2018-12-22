import { parseArrayToEntities } from './array-to-entities.parser';

describe('ParseArrayToEntities', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
    });

    it('should parse array to entities', () => {
        const array = helper.arrayData;
        const entities = helper.entitiesData;

        expect(parseArrayToEntities(array, {})).toEqual(entities);
    });
});

class Helper {
    get arrayData(): Array<any> {
        return [
            {
                name: 'foo',
                lastname: 'bar',
                id: 1
            },
            {
                name: 'baz',
                lastname: 'qux',
                id: 2
            }
        ];
    }

    get entitiesData(): any {
        return {
            1: {
                id: 1,
                name: 'foo',
                lastname: 'bar'
            },
            2: {
                id: 2,
                name: 'baz',
                lastname: 'qux'
            }
        };
    }
}
