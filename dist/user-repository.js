import { data } from "./data.js";
/**
 * Search user in store by login and pass.
 * @param login user's login.
 * @param pass user's pass.
 * @return Found user or undefined.
 */
export const getUser = async (login, pass) => {
    return data
        .users
        .find((e) => e.login == login && e.pass == pass);
};
