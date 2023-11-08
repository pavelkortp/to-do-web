import fetch from 'node-fetch';

export class ItemModel {
    private _id: number;
    private _text: string;
    private _checked: boolean;

    constructor(id: number, text: string, checked: boolean) {
        this._id = id;
        this._text = text;
        this._checked = checked;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get text(): string {
        return this._text;
    }

    set text(value: string) {
        this._text = value;
    }

    get checked(): boolean {
        return this._checked;
    }

    set checked(value: boolean) {
        this._checked = value;
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