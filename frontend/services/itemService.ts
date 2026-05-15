import api from "./api";
import { ExistingItem, NewItem } from "../types/Item";
import { mapItemFromBackend } from "../utils/itemMapper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllItems = async (): Promise<ExistingItem[]> => {
  return (await api.get<ExistingItem[]>("/item/all")).data.map(mapItemFromBackend);
};

export const getItemsByCordinates = async (latitude: number, longitude: number, area: number): Promise<ExistingItem[]> => {
  return (await api.get<ExistingItem[]>(`/item?lat=${latitude}&lon=${longitude}&area=${area}`)).data.map(mapItemFromBackend);
}

export const getItemById = async (id: number): Promise<ExistingItem> => {
  return mapItemFromBackend((await api.get<ExistingItem>(`/item/${id}`)).data);
};

export const getFavoritedItemsByUser = async (): Promise<ExistingItem[]> => {
  return (await api.get<ExistingItem[]>(`/item_favorite/user`)).data.map(mapItemFromBackend);
}

export const getPostedItemsByUser = async (): Promise<ExistingItem[]> => {
  return (await api.get<ExistingItem[]>(`/item/posted`)).data.map(mapItemFromBackend);
}

export const getCollectedItemsByUser = async (): Promise<ExistingItem[]> => {
  return (await api.get<ExistingItem[]>(`/item/collected`)).data.map(mapItemFromBackend);
}

export const createItem = async (item: FormData): Promise<ExistingItem> => {
  return (await api.post<ExistingItem>("/item", item, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })).data;
};

export const collectTreasureById = async (id: number): Promise<ExistingItem> => {
  return (await api.patch<ExistingItem>(`/item/${id}/collect`)).data;
};

export const favoriteItem = async (id: number): Promise<ExistingItem> => {
  return (await api.patch<ExistingItem>(`/item_favorite/${id}`)).data;
};
