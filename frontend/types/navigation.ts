import { ExistingItem } from "./Item";

export type RootStackParList = {
  LoginScreen: undefined;
  MainApp: undefined;
  ItemScreen: { from?: string, fromType?: string, item: ExistingItem };
};
