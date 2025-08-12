import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import ItemCard from '../components/ItemListCard';
import { colors } from '../styles/colors';

// @ts-ignore
export default function UserItemScreen({}) {
  return (
    <SafeAreaView style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
        <Pressable style={[globalStyle.filterButton, {marginRight: 10}]}>
          <Text style={[globalStyle.buttonText, {color: colors.warning, textShadowColor: colors.warning1}]}>Collected Treasure</Text>
        </Pressable>
        <Pressable style={[globalStyle.filterButton, {backgroundColor: colors.warning, marginRight: 10}]}>
          <Text style={[globalStyle.buttonText, {color: colors.warning1, textShadowColor: colors.warning}]}>Posted Trash</Text>
        </Pressable>
        <Pressable style={globalStyle.filterButton}>
          <Text style={[globalStyle.buttonText, {color: colors.warning, textShadowColor: colors.warning1}]}>Favorites</Text>
        </Pressable>
      </View>

      <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='UserItem'/>
    </SafeAreaView>
  );
}