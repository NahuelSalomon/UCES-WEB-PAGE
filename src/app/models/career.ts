export class Career {
    id: number;
    name: string;
    description: string;
    duration: number;

    constructor(id: number, name: string, description: string, duration: number) {
        this.id  = id;
        this.name = name;
        this.description = description;
        this.duration = duration;    
    }
}
