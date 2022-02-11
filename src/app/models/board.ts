import { Forum } from "./forum";

export class Board {
    id: number;
    name: string;
    list: Array<Forum>;
    
    constructor(id: number, name: string, list: Array<Forum>) {
        this.id = id;
        this.name = name;
        this.list = list;
    }
    
}
