import { Region } from "react-native-maps";
import * as Location from "expo-location";

export async function getUserLocation(): Promise<Region | null> {
    const obj = {
      latitude: 0.01,
      longitude: 0.01,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    const {status} = await Location.requestForegroundPermissionsAsync()
    if(status !== "granted") return null
    const {coords} = await Location.getCurrentPositionAsync()

    return { ...obj, latitude: coords.latitude, longitude: coords.longitude };
}