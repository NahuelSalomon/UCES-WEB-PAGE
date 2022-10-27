export enum ForumOrder {
    ORDER_BY_DATE,
    ORDER_BY_VOTES
}

export class ForumOrderDescription
{
    forumOrder : ForumOrder;
    description : string;

    constructor(forumOrder : ForumOrder,description : string)
    {
        this.forumOrder = forumOrder;
        this.description = description;
    } 

    
}

export const ForumOrderLabel = [
    new ForumOrderDescription(ForumOrder.ORDER_BY_DATE,"Ordenar por fecha"),
    new ForumOrderDescription(ForumOrder.ORDER_BY_VOTES,"Ordenar por votos")
];

