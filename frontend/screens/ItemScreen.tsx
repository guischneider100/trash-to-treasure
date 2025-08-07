import { Image, Pressable, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import Toast from 'react-native-toast-message';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParList } from '../types/navigation';

// @ts-ignore
export default function ItemScreen({}) {

  const route = useRoute<RouteProp<RootStackParList, 'ItemScreen'>>();
  const from = route.params?.from;

  const saveItem = () => {
    Toast.show({
      type: 'success',
      text1: 'Treasure Adquired!',
      visibilityTime: 3000,
    })
  }

  return (
    <View style={globalStyle.body}>
      {from == 'UserItem' && (<Pressable style={globalStyle.topInputContainer} >
        <Text style={{color:'red'}}>Delete</Text>
      </Pressable>)}
      
      <Image source={require('../assets/trash.jpg')} style={globalStyle.itemImg}/>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text style={globalStyle.title}>Old Chair</Text>
        <Text style={{paddingBottom: 20}}>A really really big pile of trash with a lot of gooood stuff</Text>
        <Text>Status: ⚠️</Text>
        <Text>Location: 🗺️</Text>
        <Text>Taken: ✅</Text>
      </View>
      
      <View style={globalStyle.container}>
        <View style={globalStyle.bottomInputContainer}>
          <Pressable style={globalStyle.mainButton} onPress={saveItem}>
            <Text>{from == 'Home' ? 'Transform into Treasure' : 'Update Treasure'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}