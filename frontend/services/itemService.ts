import api from "./api";
import { ExistingItem, NewItem, UpdatedItem } from "../types/Item";
import { mapItemFromBackend } from "../utils/itemMapper";

export const getAllItems = async (): Promise<ExistingItem[]> => {
  const response = await api.get<ExistingItem[]>("/item/all");
  return response.data;
};

export const getItemById = async (id: number): Promise<ExistingItem> => {
  const response = await api.get<ExistingItem>(`/item/${id}`);
  return mapItemFromBackend(response.data);
};

export const createItem = async (item: NewItem): Promise<ExistingItem> => {
  const response = await api.post<ExistingItem>("/item", item);
  return response.data;
};

export const collectTreasureById = async (id: number): Promise<ExistingItem> => {
  const response = await api.patch<ExistingItem>(`/item/${id}/collect`);
  return response.data;
};

export const favoriteItem = async (id: number): Promise<ExistingItem> => {
  const response = await api.patch<ExistingItem>(`/item_favorite/${id}`);
  return response.data;
};
