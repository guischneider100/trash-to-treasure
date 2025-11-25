import { Pressable, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import ItemCard from '../components/ItemListCard';
import { colors } from '../styles/colors';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// @ts-ignore
export default function UserItemScreen({}) {

  const [selected, setSelected] = useState("Collected Treasure");
  const options = ["Collected Treasure", "Posted Trash", "Favorites"];

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

      <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='UserItem'/>
    </SafeAreaView>
  );
}