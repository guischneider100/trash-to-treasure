import { ExistingItem } from "../types/Item";
import { ItemConditionList } from "../types/ItemCondition";

export const mapItemFromBackend = (item: any): ExistingItem => ({
    id: item.id,
    title: item.title,
    description: item.description,
    photoUrl: item.photoUrl,
    condition: (ItemConditionList[item.condition as keyof typeof ItemConditionList] ?? ItemConditionList.Unknown),
    latitude: item.latitude,
    longitude: item.longitude,
    postedAt: item.postedAt,
    postedByUserId: item.postedByUserId,
    collectedByUserId: item.collectedByUserId,
    isFavorite: item.isFavorite
})