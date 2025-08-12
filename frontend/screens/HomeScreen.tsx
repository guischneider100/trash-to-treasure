import { Pressable, TextInput, View, Text } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import ItemCard from '../components/ItemListCard';

// @ts-ignore
export default function HomeScreen({}) {
  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
        <TextInput style={globalStyle.input} placeholder="Search"/>
      </View>
      <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='Home'/>
    </View>
  );
}