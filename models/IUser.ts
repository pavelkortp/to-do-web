import {ItemModel} from "./ItemModel";

export interface IUser {
    registered: boolean,
    login: string;
    pass: string;
    items: ItemModel[];
}