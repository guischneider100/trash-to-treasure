import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { DARK_MAP_STYLE, globalStyle } from '../styles/globalStyles'
import Toast from 'react-native-toast-message';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Region } from 'react-native-maps';
import MaskedView from '@react-native-masked-view/masked-view';
import { useState } from 'react';

// @ts-ignore
export default function ItemScreen({navigation}) {
  const [location, setLocation] = useState<Region | null>(null);
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
    <SafeAreaView style={globalStyle.body} edges={[]}>
      <Image source={require('../assets/trash.jpg')} style={globalStyle.itemImg}/>
      <Pressable style={[globalStyle.roundButton2, {left: 40}]}>
        <Ionicons name="arrow-back-sharp" size={25} color={colors.secondaryBackground} onPress={() => navigation.goBack()}/>
      </Pressable>

      <Pressable style={globalStyle.roundButton2}>
        <Ionicons name="heart-outline" size={25} color={colors.secondaryBackground}/>
      </Pressable>
      <Pressable style={[globalStyle.roundButton2, {right: 60}]}>
        <Ionicons name="share-social-outline" size={25} color={colors.secondaryBackground}/>
      </Pressable>
      {from == 'UserItem' && (<Pressable style={[globalStyle.roundButton2, {right: 100}]}>
        <Ionicons name="trash-outline" size={25} color={colors.secondaryBackground}/>
      </Pressable>)}
      
      <View style={globalStyle.itemCard}>
        <View style={{alignItems: 'center'}}>
          <Text style={globalStyle.title}>A big trash pile</Text>

          <Text style={globalStyle.normalText}>A really really big pile of trash with a lot of gooood stuff</Text>
        </View>
        
        <View style={{flexDirection: 'row', justifyContent: "space-between", paddingBottom: 20}}>

          <View style={{flexDirection: 'row', alignItems: 'center', borderColor: colors.darkLightText, borderWidth: 1.5, borderRadius: 15, padding: 5}}>
            <Ionicons name={'bag-check-outline'} size={30} color={colors.tertiary} style={{paddingRight: 5}}/><Text style={{color:colors.tertiary, fontSize: 13, fontFamily: 'Fredoka_400Regular'}}>Available</Text>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', borderColor: colors.darkLightText, borderWidth: 1.5, borderRadius: 15, padding: 5}}>
            <Ionicons name={'trash-outline'} size={30} color={colors.warning1} style={{paddingRight: 3}}/><Text style={{color:colors.warning1, fontSize: 13, fontFamily: 'Fredoka_400Regular'}}>Trash Pile</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center', borderColor: colors.darkLightText, borderWidth: 1.5, borderRadius: 15, padding: 5}}>
            <Ionicons name={'today-outline'} size={30} color={"black"} style={{paddingRight: 3}}/>
            <Text style={{color: "black", fontSize: 13, fontFamily: 'Fredoka_400Regular'}}>1 week ago</Text>
          </View>
        </View>

        <Text style={{paddingBottom: 10,  fontFamily: 'Fredoka_400Regular', fontSize: 15, color:colors.darkLightText}}>Location:</Text>

        <MaskedView style={globalStyle.compactMap} maskElement={<View style={{backgroundColor: "black", borderRadius: 15, flex: 1}}/>}>
          <MapView style={StyleSheet.absoluteFillObject} customMapStyle={DARK_MAP_STYLE} initialRegion={{
            latitude: -33.8688,
            longitude: 151.2093,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,}}>
          </MapView>
        </MaskedView>

      </View>

      <View style={globalStyle.footer}>
        <View style={globalStyle.bottomInputContainer}>
          <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={saveItem}>
            <Text style={globalStyle.buttonText}>{from == "HomeScreen" ? "Transform into Treasure" : "Update Treasure"}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}