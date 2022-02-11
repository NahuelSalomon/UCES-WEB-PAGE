import { CareerStatistics } from "./career-statistics";
import { Subject } from "./subject";

export class Career {
    id: number;
    name: string;
    subjects: Array<Subject>;
    statistics: CareerStatistics;

    constructor(id: number, name: string, subjects: Array<Subject>, statistics: CareerStatistics) {
        this.id  = id;
        this.name = name;
        this.subjects = subjects;
        this.statistics = statistics;
    }


}
