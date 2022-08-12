import { Board } from "./board";
import { Career } from "./career";
import { SubjectStatistics } from "./subject-statistics";

export class Subject {

    id: number;
    code: string;
    name: string;
    statistics: SubjectStatistics;
    correlatives: Array<Subject>;
    board: Board;
    career: Career;

    constructor(id: number, code: string, name: string, statistics: SubjectStatistics, correlatives: Array<Subject>, board: Board, career: Career) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.statistics = statistics;
        this.correlatives = correlatives;
        this.board = board;
        this.career = this.career;
    }

}
