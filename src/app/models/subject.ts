import { Board } from "./board";
import { Career } from "./career";
import { Professor } from "./professor";
import { SubjectStatistics } from "./subject-statistics";

export class Subject {

    id: number;
    code: string;
    name: string;
    statistics: SubjectStatistics;
    correlatives: Array<Subject>;
    professors: Array<Professor>;
    board: Board;
    career: Career;

    constructor(id: number, code: string, name: string, statistics: SubjectStatistics, correlatives: Array<Subject>, professors: Array<Professor>, board: Board, career: Career) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.statistics = statistics;
        this.correlatives = correlatives;
        this.professors = professors;
        this.board = board;
        this.career = career;
    }

}
