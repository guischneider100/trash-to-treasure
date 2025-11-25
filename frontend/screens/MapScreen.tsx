import { ActivityIndicator, Linking, Pressable, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { Text } from 'react-native';
import { DARK_MAP_STYLE, globalStyle } from '../styles/globalStyles';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';

const MARKERS = [
  {
    id: 1,
    title: 'Pile of Trash',
    description: 'A really really big pile of trash with a lot of gooood stuff.',
    latitudeOffset: 0.002,
    longitudeOffset: 0.002,
  },
  {
    id: 2,
    title: 'Pile of Treasure',
    description: 'Nothing to see here.',
    latitudeOffset: 0.004,
    longitudeOffset: 0.004,
  },
];

// @ts-ignore
export default function MapScreen() {
  const [location, setLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const navigation = useNavigation() as any;

  async function getUserLocation(): Promise<Region | null> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return null;
    const { coords } = await Location.getCurrentPositionAsync();
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  };

  useEffect(() => {
    (async () => {
      const loc = await getUserLocation();
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  const mapRef = useRef<MapView>(null);

  const goToMyLocation = async () => {
    try{
      mapRef.current?.animateToRegion({
        latitude: location?.latitude!,
        longitude: location?.longitude!,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })
    }catch (err){
      console.error("Error to get location: " + err);
    }
  }

  const openOnGoogleMaps = (latitude: number, longitude: number) => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`);
  }

  if (loading || !location) {
    return <LoadingScreen/>;
  }

  const accessItem = () => {
    navigation.navigate("ItemScreen",{ from: "Home"});
  };

  return (
    <View style={{ flex: 1 }}>

      <Pressable style={[globalStyle.roundButton, {bottom: 105, width: 35, height: 35, position: "absolute", zIndex: 100, elevation: 15}]} onPress={goToMyLocation}>
        <Ionicons name="locate-outline" size={25} color={colors.secondaryBackground}/>
      </Pressable>

      <MapView
        style={{ flex: 1 }}
        initialRegion={location}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={DARK_MAP_STYLE}
        scrollEnabled={!selectedMarker}
        onPress={() => setSelectedMarker(null)}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
      >

        {MARKERS.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: location.latitude + marker.latitudeOffset,
              longitude: location.longitude + marker.longitudeOffset,
            }}
            onPress={() => setSelectedMarker(marker.id)}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Image source={require('../assets/map-icon.png')} style={{width: 40, height: 35, resizeMode: 'contain'}}/>
          </Marker>
        ))}
        </MapView>

        {selectedMarker && (
          <Pressable style={globalStyle.mapCard} onPress={accessItem}>
            <Image source={require('../assets/trash.jpg')} style={globalStyle.imageMapCard}/>
            <View style={{padding: 5}}>
              <Text style={globalStyle.titleMapCard}>
                {MARKERS.find(m => m.id === selectedMarker)?.title}
              </Text>
              <Text style={globalStyle.descriptionMapCard}>
                {MARKERS.find(m => m.id === selectedMarker)?.description}
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Pressable style={[globalStyle.mainButton, {width: '70%', height: 30}]} onPress={() => openOnGoogleMaps(MARKERS.find(m => m.id === selectedMarker)?.latitudeOffset! + location.latitude, MARKERS.find(m => m.id === selectedMarker)?.longitudeOffset! + location.longitude)}>
                <Text style={[globalStyle.buttonText, {fontSize: 12, paddingHorizontal: 20, paddingVertical: 5}]}>Show the way</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
    </View>
  );
}
