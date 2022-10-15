export enum ForumOrder {
    ORDER_BY_DATE,
    ORDER_BY_VOTES
}

export const ForumOrderLabel = new Map<number, string>([
    [ForumOrder.ORDER_BY_DATE, 'Por fecha'],
    [ForumOrder.ORDER_BY_VOTES, 'Por cantidad de votos']
  ]);