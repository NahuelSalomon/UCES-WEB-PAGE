import { PollResponseType } from "./poll-response-type"
import { PollTemplate } from "./poll-template"

export class PollQuestion {

    id: number
    question: string
    theme: string
    pollResponseType: PollResponseType
    pollTemplate: PollTemplate
}
