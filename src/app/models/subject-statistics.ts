import { Board } from "./board";
import { Professor } from "./professor";
import { Subject } from "./subject";

export class SubjectStatistics {

    id: number;
    hoursPerWeek: number;
    professors: Array<Professor>;
    difficulty: number;

    constructor(id: number, hoursPerWeek: number, professor: Array<Professor>, difficulty: number) {
        this.id = id;
        this.hoursPerWeek = hoursPerWeek;
        this.professors = professor;
        this.difficulty = difficulty;
    }

        
}
