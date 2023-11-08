import {ItemModel} from "./ItemModel.js";

export class UserModel {
    private _registered: boolean;
    private _login: string;
    private _pass: string;
    private _items: ItemModel[];

    constructor(registered: boolean, login: string, pass: string, items: ItemModel[]) {
        this._registered = registered;
        this._login = login;
        this._pass = pass;
        this._items = items;
    }

    get registered(): boolean {
        return this._registered;
    }

    set registered(value: boolean) {
        this._registered = value;
    }

    get login(): string {
        return this._login;
    }

    get pass(): string {
        return this._pass;
    }

    get items(): ItemModel[] {
        return this._items;
    }

    set items(value: ItemModel[]) {
        this._items = value;
    }
}
