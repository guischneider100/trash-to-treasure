export interface Item {
    title: string,
    description: string
    photoUrl: string,
    condition: string,
    latitude: number,
    longitude: number,
    taken: boolean,
    postedAt: string,
    postedByUserId: number,
    collectedByUserId: number,
    isFavorite: boolean,
}

export type NewItem = Partial<Item>
export type ExistingItem = Item & {id: number}
export type UpdatedItem = Partial<Item>