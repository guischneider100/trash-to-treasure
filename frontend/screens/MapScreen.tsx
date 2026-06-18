import { Linking, Pressable, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { DARK_MAP_STYLE, globalStyle } from "../styles/globalStyles";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import { ExistingItem } from "../types/Item";
import { getAllItems } from "../services/itemService";
import { getUserLocation } from "../utils/globalFunctions";

// @ts-ignore
export default function MapScreen({
  viewingItem,
}: {
  viewingItem: ExistingItem;
}) {
  const [items, setItems] = useState<ExistingItem[]>([]);

  const [location, setLocation] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  const navigation = useNavigation() as any;

  const fetchData = async () => {
    try {
      const syncItems = await getAllItems();
      setItems(syncItems);
    } catch (error) {
      console.log("error");
    }
  };

  const itemsMap = useMemo(() => {
    const map = new Map<number, ExistingItem>();
    items.forEach((item) => map.set(item.id, item));
    return map;
  }, [items]);

  const itemSelected =
    selectedMarker != null ? itemsMap.get(selectedMarker) : undefined;

  useEffect(() => {
    (async () => {
      var loc = null;

      if (viewingItem) {
        setSelectedMarker(viewingItem.id)
        loc = {
          latitude: viewingItem.latitude,
          longitude: viewingItem.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }
      } else {
        loc = await getUserLocation()
      }

      await fetchData();
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  const mapRef = useRef<MapView>(null);

  const goToMyLocation = async () => {
    try {
      mapRef.current?.animateToRegion({
        latitude: location?.latitude!,
        longitude: location?.longitude!,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (err) {
      console.error("Error to get location: " + err);
    }
  };

  const openOnGoogleMaps = (latitude: number, longitude: number) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`,
    );
  };

  if (loading || !location) {
    return <LoadingScreen />;
  }

  const accessItem = (item?: ExistingItem) => {
    if (!item) return;
    navigation.navigate("ItemFromStreet", { from: "ItemFromStreet", item });
  };

  return (
    <View style={{ flex: 1 }}>
      {!viewingItem && <><Pressable
        style={[
          globalStyle.roundButton,
          {
            bottom: 105,
            width: 35,
            height: 35,
            position: "absolute",
            zIndex: 100,
            elevation: 15,
          },
        ]}
        onPress={goToMyLocation}
      >
        <Ionicons
          name="locate-outline"
          size={25}
          color={colors.secondaryBackground}
        />
      </Pressable></>}

      <MapView
        style={{ flex: 1 }}
        initialRegion={location}
        showsUserLocation={(!viewingItem)}
        showsMyLocationButton={false}
        customMapStyle={DARK_MAP_STYLE}
        scrollEnabled={!selectedMarker}
        onPress={() => { if (!viewingItem) setSelectedMarker(null) }}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
      >
        {(viewingItem ? [viewingItem] : items).map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={() => setSelectedMarker(marker.id)}
            anchor={{ x: 0.5, y: 1 }}
          >
            <Image
              source={require("../assets/map-icon.png")}
              style={{ width: 40, height: 35, resizeMode: "contain" }}
            />
          </Marker>
        ))}
      </MapView>

      {selectedMarker && (
        <Pressable
          style={globalStyle.mapCard}
          onPress={() => accessItem(itemSelected)}
        >
          <Image
            source={{uri: itemSelected?.photoUrl}}
            style={globalStyle.imageMapCard}
          />
          <View style={{ padding: 5 }}>
            <Text style={globalStyle.titleMapCard}>{itemSelected?.title}</Text>
            <Text style={globalStyle.descriptionMapCard}>
              {itemSelected?.description}
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              style={[globalStyle.mainButton, { width: "70%", height: 30 }]}
              onPress={() => {
                const objLocalization = {
                  latitude: itemSelected?.latitude,
                  longitude: itemSelected?.longitude,
                };

                if (objLocalization.latitude && objLocalization.longitude)
                  openOnGoogleMaps(
                    objLocalization.latitude,
                    objLocalization.longitude,
                  );
              }}
            >
              <Text
                style={[
                  globalStyle.buttonText,
                  { fontSize: 12, paddingHorizontal: 20, paddingVertical: 5 },
                ]}
              >
                Show the way
              </Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
  );
}
