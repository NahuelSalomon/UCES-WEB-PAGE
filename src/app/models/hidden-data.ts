import { User } from "./user";

export class HiddenData {
    user: User;
    token: string; 

    constructor(user:User, token:string)
    {
        this.user = user;
        this.token = token;
    }

}
