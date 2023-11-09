import {ItemModel} from "./ItemModel.js";
import {IUser} from './IUser.js';
import {login} from "../handlers/auth-handler";
import {pass} from "../config";
import {ObjectId} from "mongodb";

export class UserModel implements IUser {
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

    public get registered(): boolean {
        return this._registered;
    }

    public set registered(value: boolean) {
        this._registered = value;
    }

    public get login(): string {
        return this._login;
    }

    public get pass(): string {
        return this._pass;
    }

    public get items(): ItemModel[] {
        return this._items;
    }

    public set items(value: ItemModel[]) {
        this._items = value;
    }
}
