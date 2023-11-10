/**
 * To-do list user implementation.
 */
export class UserModel {
    constructor(registered, login, pass, items) {
        this._registered = registered;
        this._login = login;
        this._pass = pass;
        this._items = items;
    }
    get registered() {
        return this._registered;
    }
    set registered(value) {
        this._registered = value;
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    get login() {
        return this._login;
    }
    get pass() {
        return this._pass;
    }
}
