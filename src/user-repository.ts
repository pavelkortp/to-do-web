import {UserModel} from '../models/UserModel.js';
import {collection_name, db_name, uri} from '../config.js';
import {IUser} from '../models/IUser.js';
import {Collection, MongoClient, ServerApiVersion, WithId} from 'mongodb';
import {ItemModel} from '../models/ItemModel';
import {Request} from 'express';


export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


// Users collection.
const users: Collection<IUser> = client.db(db_name).collection<IUser>(collection_name);

/**
 * Adds new user to db.
 * @param user new user.
 */
export const addUser = async (user: UserModel): Promise<void> => {
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
export const getUser = async (login: string, pass: string): Promise<WithId<IUser> | null> => {
    return await users.findOne({login, pass});
}

export const checkLogin = async (login: string): Promise<WithId<IUser> | null> => {
    return await users.findOne({login});
}

/**
 * Update user tasks.
 * @param user exist user.
 */
export const updateUserItems = async (user: IUser): Promise<void> => {
    const newItems = {
        $set: {
            items: user.items
        }
    };
    await users.updateOne({login: user.login, pass: user.pass}, newItems);
}

/**
 * Create user from session data and return it.
 * @param req HTTP request which contains data in cookie for creating user.
 * @return user from session data.
 */
export const getUserFromSession = async (req: Request): Promise<UserModel> => {
    if (req.session.registered == undefined ||
        !req.session.login ||
        !req.session.pass ||
        !req.session.items) throw new Error('session data not found');
    return new UserModel(
        req.session.registered,
        req.session.login,
        req.session.pass,
        req.session.items
    )
}

/**
 * Search task in list by unique id.
 * @param id unique task number.
 * @param list task-list.
 * @returns Found task or undefined.
 */
export const findTaskById = async (id: number, list: ItemModel[]): Promise<ItemModel | undefined> => {
    return list
        .find((e: ItemModel) => e.id == id);
}


