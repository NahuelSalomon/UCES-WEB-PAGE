import { Forum } from "./forum";

export class Board {
    id: number;
    name: string;
    forumList: Array<Forum>;
    
    constructor(id: number, name: string, forumList: Array<Forum>) {
        this.id = id;
        this.name = name;
        this.forumList = forumList;
    }
    
}
