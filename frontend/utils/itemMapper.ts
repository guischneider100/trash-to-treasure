import { ExistingItem } from "../types/Item";
import { ItemType } from "../types/ItemType";

export const mapItemFromBackend = (item: any): ExistingItem => ({
    id: item.id,
    title: item.title,
    description: item.description,
    photoUrl: item.photoUrl,
    condition: (ItemType[item.condition as keyof typeof ItemType] ?? ItemType.Unknown),
    latitude: item.latitude,
    longitude: item.longitude,
    taken: item.taken,
    postedAt: item.postedAt,
    postedByUserId: item.postedByUserId,
    collectedByUserId: item.collectedByUserId,
    isFavorite: item.isFavorite
})