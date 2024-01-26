import { doIfWindowExists, tryWithErrorLog } from "@/utils/shared.util";

class BrowserStorage {
    private readonly storage: Storage;

    constructor(storage: Storage) {
        this.storage = storage;
    }

    get(key: string) {
        return tryWithErrorLog(() => {
            const value = this.storage.getItem(key);
            return value ? JSON.parse(value) : null;
        });
    }

    set(key: string, value: unknown) {
        tryWithErrorLog(() => {
            this.storage.setItem(key, JSON.stringify(value));
        });
    }

    modify<V = any>(key: string, modifier: (value: V) => V) {
        tryWithErrorLog(() => {
            const initialValue = this.get(key);
            const modifiedValue = modifier(initialValue);
            this.set(key, modifiedValue);
        });
    }

    remove(key: string) {
        tryWithErrorLog(() => {
            this.storage.removeItem(key);
        });
    }

    clear() {
        const a = tryWithErrorLog(() => {
            this.storage.clear();
        });
        console.log(a);
    }
}

let rawLocalStorage = null;

doIfWindowExists(() => {
    rawLocalStorage = new BrowserStorage(localStorage);
    Object.freeze(rawLocalStorage);
});

export const myLocalStorage: BrowserStorage | null = rawLocalStorage;

let rawSessionStorage = null;

doIfWindowExists(() => {
    rawSessionStorage = new BrowserStorage(sessionStorage);
    Object.freeze(rawSessionStorage);
});

export const mySessionStorage: BrowserStorage | null = rawSessionStorage;
