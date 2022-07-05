import { Query } from "./query";
import { User } from "./user";

export class QueryResponse {

    id: number;
    body: string;
    user: User;
    query: Query;

    constructor(id:number , body: string , user:User, query: Query) {
        this.id = id;
        this.body = body;
        this.user = user;
        this.query = query;
    } 

    

}
