import { User } from "./user";

export class ResponseQuery {

    id: number;
    body: string;
    user: User;

    constructor(id:number , body: string , user:User) {
        this.id = id;
        this.body = body;
        this.user = user;
    } 

    

}
