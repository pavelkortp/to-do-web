import {ItemModel} from "./ItemModel.js";
import {IUser} from './IUser.js';

/**
 * To-do list user implementation.
 */
export class UserModel implements IUser {
    private _registered: boolean;
    private readonly _login: string;
    private readonly _pass: string;
    private _items: ItemModel[];

    constructor(registered: boolean, login: string, pass: string, items: ItemModel[]) {
        this._registered = registered;
        this._login = login;
        this._pass = pass;
        this._items = items;
    }

    public get registered(): boolean {
        return this._registered;
    }

    public set registered(value: boolean) {
        this._registered = value;
    }

    public get items(): ItemModel[] {
        return this._items;
    }

    public set items(value: ItemModel[]) {
        this._items = value;
    }

    public get login(): string {
        return this._login;
    }

    public get pass(): string {
        return this._pass;
    }


}
