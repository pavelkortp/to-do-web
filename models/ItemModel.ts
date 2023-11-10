import fetch from 'node-fetch';

/**
 * TO-DO list task model. Each task has
 * a unique identifier, "text" - content, and "checked" - status.
 */
export class ItemModel {
    /**
     * Unique id for task.
     */
    public id: number;

    /**
     * Task text.
     */
    public text: string;

    /**
     * Shows whether the task is completed or not.
     */
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