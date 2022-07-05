import { Forum } from "./forum";
import { Subject } from "./subject";

export class Board {
    id: number;
    name: string;
    forumList: Array<Forum>;
    subject : Subject;
    
    constructor(id: number, name: string, forumList: Array<Forum>, subject : Subject ) {
        this.id = id;
        this.name = name;
        this.forumList = forumList;
        this.subject = subject;
    }
    
}
