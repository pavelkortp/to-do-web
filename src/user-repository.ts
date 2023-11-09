import {UserModel} from "../models/UserModel.js";
import {client} from "./index.js";
import {collection, db_name} from "../config.js";
import {IUser} from "../models/IUser.js";


const users = client.db(db_name).collection<IUser>(collection);

/**
 * Adds new user to db.
 * @param user new user.
 */
export const addUser = async (user: UserModel) => {
    await users.insertOne({
        registered: user.registered,
        login: user.login,
        pass: user.pass,
        items: user.items
    });
}

/**
 * Finds user in database and return it.
 * @param login user login.
 * @param pass user pass.
 * @return Found user or null.
 */
export const getUser = async (login: string, pass: string) => {
    return await users.findOne({login, pass});
}

/**
 * Update user tasks.
 * @param user exist user.
 */
export const updateUserItems = async (user: IUser) => {
    const newItems = {
        $set: {
            items: user.items
        }
    };
    await users.updateOne({login: user.login, pass: user.pass}, newItems);
}


