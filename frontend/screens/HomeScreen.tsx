import { Pressable, TextInput, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { Ionicons } from '@expo/vector-icons';
import ItemCard from '../components/ItemListCard';
import { getItems } from '../services/itemService';
import { ExistingItem, Item } from '../types/Item';
import { useEffect, useState } from 'react';

//@ts-ignore
export default function HomeScreen({navigation}) {

  const [items, setItems] = useState<ExistingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems([data]);
      } catch (error) {
        console.error('Error to find Item: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" />

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
        <TextInput style={globalStyle.input} placeholder="Search"/>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ItemCard title={item.title} description={item.description} photo={require('../assets/trash.jpg')} origin='Home'/>
        )}
      />

      <Pressable style={globalStyle.roundButton} onPress={() => navigation.navigate('CreateItemScreen')}>
        <Ionicons name="trash-outline" size={35} color={'white'}/>
      </Pressable>
    </View>
  );
}