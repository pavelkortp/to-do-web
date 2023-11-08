import {data} from "./data.js";
import {readFile, writeFile} from "fs/promises";


/**
 * Search user in store by login and pass.
 * @param login user's login.
 * @param pass user's pass.
 * @return Found user or undefined.
 */
export const getUserFromObj = async (login: string, pass: string) => {
    return data
        .users
        .find((e) => e.login == login && e.pass == pass);
}

/**
 * Search user in JSON file by login and pass.
 * @param login user's login.
 * @param pass user's pass.
 * @return Found user or undefined.
 */
export const getUserFromFile = async (login: string, pass: string) => {
    const {users} = JSON.parse(await readFile('./data.json', 'utf-8',));
    return users
        .find((e: { login: string, pass: string }) => e.login == login && e.pass == pass);
}

/**
 * Adds new user to JSON storage.
 * @param user new user.
 */
export const addUserToFile = async (user: { registered: boolean, login: string, pass: string, items: [] }) => {
    const {users} = JSON.parse(await readFile('./data.json', 'utf-8',));
    users.push(user);
    await writeFile('./data.json', JSON.stringify({users}));
}

export const createItemInFile =  async (user: { registered: boolean, login: string, pass: string, items: [] }) => {

}


/**
 *
 * @param user
 */
export const editItemFromFile = async (user: { registered: boolean, login: string, pass: string, items: [] }) => {
    let {users} = JSON.parse(await readFile('./data.json', 'utf-8',));
    users = users.filter((e: { login: string, pass: string }) => e.login != user.login);
    users.push(user);
    await writeFile('./data.json', JSON.stringify({users}));
}
