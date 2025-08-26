export interface Item {
    title: string,
    description: string;
    photoUrl: string,
    condition: string,
    latitude: number,
    longitude: number,
    postedByUserId: number,
}

export type NewItem = Item;
export type ExistingItem = Item & {id: number};