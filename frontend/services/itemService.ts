import api from "./api";
import { ExistingItem, NewItem } from '../types/Item';

//search itens
export const getItems = async (): Promise<ExistingItem> => {
    const response = await api.get<ExistingItem>("/item/6");
    return response.data;
}

//create itens
export const createItem = async (item: NewItem): Promise<ExistingItem> => {
    const response = await api.post<ExistingItem>("/item", item);
    return response.data;
}