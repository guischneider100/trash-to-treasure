import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../styles/colors';
import { globalStyle } from '../styles/globalStyles';
import { getItemById } from '../services/itemService';

// @ts-ignore
export default function UserItemScreen({}) {

  const [selected, setSelected] = useState("Favorites");
  const options = ["Favorites","Collected Treasure", "Posted Trash"];

  const fetchData = async () => {
    const syncItem = await getItemByUserId()
  }

  return (
    <SafeAreaView style={globalStyle.body} edges={[]}>
      <View style={globalStyle.topInputContainer}>
        {options.map((option) => {
          const isActive = selected === option;
          return (
            <Pressable key={option} style={[globalStyle.filterButton, isActive ? {backgroundColor: colors.warning} : {}]} onPress={() => setSelected(option)}>
              <Text style={[globalStyle.buttonTextSelection, isActive ? {backgroundColor: colors.warning, color: colors.warning1, textShadowColor: colors.secondaryWarning} : {color: colors.warning, textShadowColor: colors.warning1}]}>{option}</Text>
            </Pressable>)
        })}
      </View>

      {/* <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='UserItem'/> */}
    </SafeAreaView>
  );
}