import { Subject } from "./subject";
import { SubjectStatistics } from "./subject-statistics";

export class Professor {

    id: number;
    name: string;
    ratings: number;
    subjects: Array<Subject>;

    constructor(id:number, name: string, ratings: number, subjects: Array<Subject>) {
        this.id = id;
        this.name = name;
        this.ratings = ratings;
        this.subjects = this.subjects;
    }

}
