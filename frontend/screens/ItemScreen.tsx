import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import Toast from 'react-native-toast-message';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParList } from '../types/navigation';
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
      <Pressable style={globalStyle.roundButton2}>
        <Ionicons name="heart-outline" size={30} color={colors.secondaryBackground}/>
      </Pressable>
      
      <View style={globalStyle.itemCard}>
        <View style={{flexDirection: 'row'}}>
          <Text style={globalStyle.title}>Old Chair</Text>
        </View>

        <Text style={{paddingBottom: 20, fontSize: 18, fontFamily: 'Fredoka_400Regular', color:colors.darkText}}>A really really big pile of trash with a lot of gooood stuff</Text>
        
        <View style={{borderColor: 'white', borderWidth: 1.5, borderRadius: 10, padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 15}}>
            <Ionicons name={'bag-check-outline'} size={25} color={colors.primary} style={{paddingRight: 10}}/><Text style={{color:colors.darkText}}>Available</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name={'trash-outline'} size={25} color={colors.warning1} style={{paddingRight: 10}}/><Text style={{color:colors.darkText}}>Trash Pile</Text>
          </View>
        </View>
        
      </View>

      <View style={globalStyle.footer}>
        <View style={globalStyle.bottomInputContainer}>
          {from == 'UserItem' && (<Pressable style={[globalStyle.mainButton, {width: 60, margin: 5, paddingVertical: 5, paddingHorizontal: 5, backgroundColor: colors.lightWarning, borderColor: colors.warning1}]}>
            <Ionicons name="trash-outline" size={35} color={colors.secondaryBackground}/>
          </Pressable>)}
          <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={saveItem}>
            <Text style={globalStyle.buttonText}>{from == 'Home' ? 'Transform into Treasure' : 'Update Treasure'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}