import {
    setFromLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
} from './local-storage-management';

describe('LocalStorageManagement', () => {
    let helper: Helper;

    beforeEach(() => {
        helper = new Helper();
        localStorage.removeItem(helper.localStorageKey);
    });

    it('should set from localstorage', () => {
        const key = helper.localStorageKey;
        const foo = helper.foo;

        setFromLocalStorage(key, foo);

        expect(getFromLocalStorage(key, 'foo')).toEqual('bar');
    });

    it('should update from localstorage', () => {
        const key = helper.localStorageKey;
        const foo = helper.foo;
        const baz = helper.baz;

        setFromLocalStorage(key, foo);
        setFromLocalStorage(key, baz);

        expect(getFromLocalStorage(key, 'baz')).toEqual('qux');
    });

    it('should remove from localstorage', () => {
        const key = helper.localStorageKey;
        const foo = helper.foo;
        const baz = helper.baz;

        setFromLocalStorage(key, foo);
        setFromLocalStorage(key, baz);

        removeFromLocalStorage(key, 'baz');

        expect(getFromLocalStorage(key, 'foo')).toEqual('bar');
        expect(getFromLocalStorage(key, 'baz')).toBeUndefined();
    });
});

class Helper {
    get localStorageKey(): string {
        return 'storage_test';
    }

    get foo(): any {
        return {
            foo: 'bar'
        };
    }

    get baz(): any {
        return {
            baz: 'qux'
        };
    }
}
