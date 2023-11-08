import { readFile, writeFile } from "fs/promises";
/**
 * Search user in JSON file by login and pass.
 * @param login user's login.
 * @param pass user's pass.
 * @return Found user or undefined.
 */
export const getUserFromFile = async (login, pass) => {
    const { users } = JSON.parse(await readFile('./data.json', 'utf-8'));
    return users
        .find((e) => e.login == login && e.pass == pass);
};
/**
 * Adds new user to JSON storage.
 * @param user new user.
 */
export const addUserToFile = async (user) => {
    const { users } = JSON.parse(await readFile('./data.json', 'utf-8'));
    users.push(user);
    await writeFile('./data.json', JSON.stringify({ users }));
};
/**
 * Rewrites user in file with all changes.
 * @param user registered user.
 */
export const editItemFromFile = async (user) => {
    let { users } = JSON.parse(await readFile('./data.json', 'utf-8'));
    users = users.filter((e) => e.login != user.login);
    users.push(user);
    await writeFile('./data.json', JSON.stringify({ users }));
};
