import { SubjectStatistics } from "./subject-statistics";

export class Professor {

    id: number;
    name: string;
    ratings: number;
    statistics: Array<SubjectStatistics>;

    constructor(id:number, name: string, ratings: number, statistics: Array<SubjectStatistics>) {
        this.id = id;
        this.name = name;
        this.ratings = ratings;
        this.statistics = statistics;
    }

}
