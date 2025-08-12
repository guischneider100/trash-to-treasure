import { Image, Pressable, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import Toast from 'react-native-toast-message';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParList } from '../types/navigation';
import { TextNormal } from '../components/TextNormal';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

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
    <SafeAreaView style={globalStyle.body}>
      <Image source={require('../assets/trash.jpg')} style={globalStyle.itemImg}/>
      
      <View style={globalStyle.itemCard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyle.title}>Old Chair</Text>
        </View>

        <TextNormal style={{paddingBottom: 20, fontSize: 15}}>A really really big pile of trash with a lot of gooood stuff</TextNormal>
        <View style={{borderColor: 'white', borderWidth: 1.5, borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: 'center'}}>
          <Ionicons name={'bag-check-outline'} size={40} style={{paddingRight: 50}} />
          <Ionicons name={'trash-outline'} size={40} />
        </View>
      </View>

      <View style={globalStyle.footer}>
        <View style={globalStyle.bottomInputContainer}>
          {from == 'UserItem' && (<Pressable style={[globalStyle.mainButton, {width: 70, margin: 5, paddingVertical: 5, paddingHorizontal: 5, backgroundColor: colors.warning1}]}>
            <Ionicons name="trash-outline" size={30} color={'white'}/>
          </Pressable>)}
          <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={saveItem}>
            <Text style={globalStyle.buttonText}>{from == 'Home' ? 'Transform into Treasure' : 'Update Treasure'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}