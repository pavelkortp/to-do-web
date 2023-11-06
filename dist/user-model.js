export class UserModel {
    constructor(login, pass, tasks) {
        this._login = login;
        this._pass = pass;
        this._items = tasks;
    }
    get login() {
        return this._login;
    }
    get pass() {
        return this._pass;
    }
    get items() {
        return this._items;
    }
}
export class Item {
    constructor(id, text, checked) {
        this.id = id;
        this.text = text;
        this.checked = checked;
    }
}
