var _a;
import fetch from 'node-fetch';
export class ItemModel {
    constructor(id, text, checked) {
        this._id = id;
        this._text = text;
        this._checked = checked;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = value;
    }
}
_a = ItemModel;
/**
 * Returns random id for item.
 */
ItemModel.getRandomId = async () => {
    const res = await fetch('https://random-data-api.com/api/v2/users');
    // @ts-ignore
    return (await res.json()).id;
};
