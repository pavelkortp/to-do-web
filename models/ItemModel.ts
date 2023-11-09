import fetch from 'node-fetch';

export class ItemModel {
    public id: number;
    public text: string;
    public checked: boolean;

    constructor(id: number, text: string, checked: boolean) {
        this.id = id;
        this.text = text;
        this.checked = checked;
    }


    /**
     * Returns random id for item.
     */
    public static getRandomId = async (): Promise<number> => {
        const res = await fetch('https://random-data-api.com/api/v2/users');
        // @ts-ignore
        return (await res.json()).id;
    }
}