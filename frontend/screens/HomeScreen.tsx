import { Pressable, TextInput, View, Text, ActivityIndicator, FlatList, Linking, Alert } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { Ionicons } from '@expo/vector-icons';
import ItemCard from '../components/ItemListCard';
import { getItems } from '../services/itemService';
import { ExistingItem } from '../types/Item';
import { useEffect, useState } from 'react';
import { colors } from '../styles/colors';
import { Image } from 'react-native';
import LoadingScreen from './LoadingScreen';

type HomeParamtsList = {
  HomeMain: undefined,
  ItemHome: { origin: "Home" },
  CreateItem: undefined,
}

//@ts-ignore
export default function HomeScreen({navigation}) {

  const [items, setItems] = useState<ExistingItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isFocused, setFocused] = useState(false);


  const handlePress = async () => {
    const urlReporting = "https://forms.cityofsydney.nsw.gov.au/content/forms/af/sdf/report-illegal-dumping.html?_gl=1*6fui8q*_gcl_au*Njc5NzQ1Nzc3LjE3NTcxNDc4MDg.*_ga*MTM4OTMxNDM2Ny4xNzQ5NTE1OTc3*_ga_BM6V05EPQ5*czE3NTgwOTM3ODIkbzEkZzEkdDE3NTgwOTM4MjkkajEzJGwwJGgw";

    (await Linking.canOpenURL(urlReporting)) ? await Linking.openURL(urlReporting) : Alert.alert(`Não foi possível abrir o link: ${urlReporting}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems([data]);
      } catch (error) {
        //console.error('Error to find Item: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingScreen/>

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
        <View style={[globalStyle.longInput, isFocused && globalStyle.inputFocused]}>
          <Ionicons name="search-outline" size={20} color={colors.tertiary}/>
          <TextInput placeholder='Search your Treasure' placeholderTextColor={isFocused ? colors.darkLightText : "#999"} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}/>
        </View>
      </View>

      {/*<FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <ItemCard title={item.title} description={item.description} photo={require('../assets/trash.jpg')} origin='Home'/>
        )}
      />*/}

      <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='HomeScreen'/>

      <Pressable style={globalStyle.roundButton} onPress={() => navigation.navigate('CreateItemScreen')}>
        <Image source={require('../assets/add-trash.png')} style={{width: 30, height: 30}}></Image>
      </Pressable>
      <Pressable style={[globalStyle.roundButton, {backgroundColor: colors.warning2, borderColor: colors.warning1, bottom: 100}]} onPress={handlePress}>
        <Ionicons name="warning-outline" size={35} color={colors.secondaryBackground} style={{paddingBottom: 5}}/>
      </Pressable>
    </View>
  );
}