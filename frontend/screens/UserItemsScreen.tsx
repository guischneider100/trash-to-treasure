import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { globalStyle } from '../styles/globalStyles';
import { getCollectedItemsByUser, getFavoritedItemsByUser, getPostedItemsByUser } from '../services/itemService';
import { ExistingItem } from '../types/Item';
import ItemCard from '../components/ItemListCard';
import { useFocusEffect } from '@react-navigation/native';

// @ts-ignore
export default function UserItemScreen() {

  const [allItems, setAllItems] = useState<ExistingItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState<TypesItem>("Favorites");

  const typesItem = ["Favorites", "Posted Trash", "Collected Treasure"] as const;
  type TypesItem = typeof typesItem[number];

  const fetchData = async () => {
    try {
      const actions = {
        "Favorites": getFavoritedItemsByUser,
        "Posted Trash": getPostedItemsByUser,
        "Collected Treasure": getCollectedItemsByUser
      }

      setAllItems(await actions[selected]?.())
    } catch (error) {
      console.log("Error to find Item: " + error)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
  }

  useEffect(() => {
    onRefresh()
  }, [selected])

  useFocusEffect(
    useCallback(() => {
      onRefresh()
    }, []))

  return (
    <SafeAreaView style={globalStyle.body} edges={[]}>
      <View style={globalStyle.topInputContainer}>
        {typesItem.map((typeItem) => {
          const isActive = selected === typeItem;
          return (
            <Pressable key={typeItem} style={[globalStyle.filterButton, isActive ? { backgroundColor: colors.warning } : {}]} onPress={() => setSelected(typeItem)}>
              <Text style={[globalStyle.buttonTextSelection, isActive ? { backgroundColor: colors.warning, color: colors.warning1, textShadowColor: colors.secondaryWarning } : { color: colors.warning, textShadowColor: colors.warning1 }]}>{typeItem}</Text>
            </Pressable>)
        })}
      </View>

      {
        <FlatList
          data={allItems}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => <ItemCard item={item} origin='ItemFromUser' originType={selected}></ItemCard>}
          contentContainerStyle={{ paddingBottom: 150 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

    </SafeAreaView>
  );
}