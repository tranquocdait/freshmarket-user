import { RoleElement } from "./role.model";

export class UserElement {
    constructor () {
    }
    userId: string;
    userName: string;
    password: string;
    role: RoleElement;
    fullName: string;
    phoneNumber: string;
    email: string;
    avatarURL:string;
}