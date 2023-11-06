import {data} from "./data.js";

export function getUser(login: string, pass: string):
    { login: string, pass: string, tasks: Array<{ id: number, text: string, checked: boolean }> } | undefined {
    return data
        .users
        .find((e) => e.login == login && e.pass == pass);
}

