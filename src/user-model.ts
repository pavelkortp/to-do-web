export class UserModel {
    private _login: string;
    private _pass: string;
    private _items: Item[];

    constructor(login: string, pass: string, tasks: Item[]) {
        this._login = login;
        this._pass = pass;
        this._items = tasks;
    }

    get login(): string {
        return this._login;
    }

    get pass(): string {
        return this._pass;
    }

    get items(): Item[] {
        return this._items;
    }
}

export class Item {
    id: number;
    text: string;
    checked: boolean;


    constructor(id: number, text: string, checked: boolean) {
        this.id = id;
        this.text = text;
        this.checked = checked;
    }
}