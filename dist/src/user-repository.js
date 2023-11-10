import { UserModel } from "../models/UserModel.js";
import { collection_name, db_name, uri } from "../config.js";
import { MongoClient, ServerApiVersion } from "mongodb";
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Users collection.
const users = client.db(db_name).collection(collection_name);
/**
 * Adds new user to db.
 * @param user new user.
 */
export const addUser = async (user) => {
    await users.insertOne({
        registered: user.registered,
        login: user.login,
        pass: user.pass,
        items: user.items
    });
};
/**
 * Finds user in database and return it.
 * @param login user login.
 * @param pass user pass.
 * @return Found user or null.
 */
export const getUser = async (login, pass) => {
    return await users.findOne({ login, pass });
};
/**
 * Update user tasks.
 * @param user exist user.
 */
export const updateUserItems = async (user) => {
    const newItems = {
        $set: {
            items: user.items
        }
    };
    await users.updateOne({ login: user.login, pass: user.pass }, newItems);
};
/**
 * Create user from session data and return it.
 * @param req HTTP request which contains data in cookie for creating user.
 * @return user from session data.
 */
export const getUserFromSession = async (req) => {
    if (!req.session.registered ||
        !req.session.login ||
        !req.session.pass ||
        !req.session.items)
        throw new Error('session data not found');
    return new UserModel(req.session.registered, req.session.login, req.session.pass, req.session.items);
};
/**
 * Search task in list by unique id.
 * @param id unique task number.
 * @param list task-list.
 * @returns Found task or undefined.
 */
export const findTaskById = async (id, list) => {
    return list
        .find((e) => e.id == id);
};
