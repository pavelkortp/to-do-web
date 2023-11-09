var _a;
import fetch from 'node-fetch';
export class ItemModel {
    constructor(id, text, checked) {
        this.id = id;
        this.text = text;
        this.checked = checked;
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
