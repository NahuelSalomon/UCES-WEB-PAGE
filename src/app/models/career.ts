import { CareerStatistics } from "./career-statistics";
import { Subject } from "./subject";

export class Career {
    id: number;
    name: string;
    statistics: CareerStatistics;

    constructor(id: number, name: string, statistics: CareerStatistics) {
        this.id  = id;
        this.name = name;
        this.statistics = statistics;
    }


}
