import { ActivityIndicator, Pressable, View } from 'react-native';
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Callout, Marker, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Text } from 'react-native';
import { globalStyle } from '../styles/globalStyles';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#3F434C' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#57AC8D' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#343843' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#343843' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#262834' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#D1CFD2' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#262834' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#525969' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#87e0c0' }] },
];

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
}

// @ts-ignore
export default function MapScreen() {
  const [location, setLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const loc = await getUserLocation();
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const navigation = useNavigation() as any;

  const accessItem = () => {
    navigation.navigate("ItemScreen",{ from: "Home"});
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={location}
        showsUserLocation
        customMapStyle={DARK_MAP_STYLE}
        scrollEnabled={!selectedMarker}
        onPress={() => setSelectedMarker(null)}
      >
        {MARKERS.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: location.latitude + marker.latitudeOffset,
              longitude: location.longitude + marker.longitudeOffset,
            }}
            onPress={() => setSelectedMarker(marker.id)}
          >
            <Ionicons name="flag" size={30} color={colors.warning} />
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
          </Pressable>
        )}
    </View>
  );
}
