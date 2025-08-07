import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// @ts-ignore
export default function MapScreen({}) {
  const [location, setLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();

      if(status != 'granted'){
        setLoading(false);
        return;
      }

      const {
        coords: {latitude, longitude},
      } = await Location.getCurrentPositionAsync();

      setLocation({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      })

      setLoading(false);
    })();
  }, []);

  if(loading || !location){
    return <ActivityIndicator size="large" style={{flex: 1}}/>;
  }

  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#3F434C" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#57AC8D" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{ "color": "#343843" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#343843" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#262834" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#D1CFD2" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#262834" }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{ "color": "#2f3948" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#525969" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#87e0c0" }]
    }
  ];


  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={location} showsUserLocation customMapStyle={darkMapStyle}>
        <Marker coordinate={{latitude: location.latitude + 0.001, longitude: location.longitude + 0.001}}
          title="Pile of Trash" 
          description="A really really big pile of trash with a lot of gooood stuff.">
            <Ionicons name="golf" size={30} color={colors.warning} />
        </Marker>
      </MapView>
    </View>
  );
}