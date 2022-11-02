
export class PollTemplate {

    id: number
    templateName: string
    title: string
    pollDescription: string

    constructor(id: number, templateName: string, title: string, pollDescription: string){
        this.id = id
        this.templateName = templateName
        this.title = title
        this.pollDescription = pollDescription
    }

}
