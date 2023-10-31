import { Board } from "./board";
import { Career } from "./career";

export class Subject {

    id: number;
    name: string;
    career: Career;

    constructor(id: number, name: string, board: Board, career: Career) {
        this.id = id;
        this.name = name;
        this.career = career;
    }

}
