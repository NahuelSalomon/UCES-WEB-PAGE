import { Board } from "./board";
import { SubjectStatistics } from "./subject-statistics";

export class Subject {

    id: number;
    name: string;
    statistics: SubjectStatistics;
    correlatives: Array<Subject>;
    board: Board;

    constructor(id: number, name: string, statistics: SubjectStatistics, correlatives: Array<Subject>, board: Board) {
        this.id = id;
        this.name = name;
        this.statistics = statistics;
        this.correlatives = correlatives;
        this.board = board;
    }

}
