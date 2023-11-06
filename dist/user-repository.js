import { data } from "./data.js";
export function getUser(login, pass) {
    return data
        .users
        .find((e) => e.login == login && e.pass == pass);
}
