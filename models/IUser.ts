import {ItemModel} from "./ItemModel.js";

/**
 * To-do list user. Each user can create account <br>
 * with login and password "pass". Also, user has <br>
 * personal task-list "items".
 */
export interface IUser {

    /**
     * Indicates the status of the user: registered or not. <br>
     * Registered users are stored in the database, unregistered <br>
     * users are stored only in the session.
     */
    registered: boolean,

    /**
     * Personal login.
     */
    login: string;

    /**
     * Secret password.
     */
    pass: string;

    /**
     * List of tasks.
     */
    items: ItemModel[];
}