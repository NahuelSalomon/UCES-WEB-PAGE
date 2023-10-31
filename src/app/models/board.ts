import { Forum } from "./forum";
import { Subject } from "./subject";

export class Board {
    id: number;
    name: string;
    subject : Subject;
    
    constructor(id: number, name: string, subject : Subject ) {
        this.id = id;
        this.name = name;
        this.subject = subject;
    }
    
}
