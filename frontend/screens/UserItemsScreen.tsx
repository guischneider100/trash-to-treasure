import { Pressable, Text, TextInput, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import ItemCard from '../components/ItemCard';

// @ts-ignore
export default function UserItemScreen({}) {
  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
        <Pressable style={[globalStyle.mainButton, {marginRight: 20}]}>
          <Text>Collected Treasure</Text>
        </Pressable>
        <Pressable style={globalStyle.mainButton}>
          <Text>Posted Trash</Text>
        </Pressable>
      </View>
      <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='UserItem'/>
    </View>
  );
}