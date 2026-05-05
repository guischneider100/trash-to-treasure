import { colors } from "../styles/colors";

export enum ItemConditionList {
    NEW = "New",
    USED = "Used",
    DAMAGED = "Damaged",
    TRASH_PILE = "Trash Pile",
    Unknown = "Unknown"
}

export const ItemConditionColor = {
    [ItemConditionList.NEW]: {
        color: colors.primary,
        icon: "trophy-outline"
    },
    [ItemConditionList.USED]: {
        color: colors.tertiary,
        icon: "sync-sharp"
    },
    [ItemConditionList.DAMAGED]: {
        color: colors.warning,
        icon: "bandage-outline"
    },
    [ItemConditionList.TRASH_PILE]: {
        color: colors.warning1,
        icon: "trash-outline"
    },
}