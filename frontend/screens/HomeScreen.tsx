import { Ionicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import { useEffect, useState } from "react"
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native"
import Modal from 'react-native-modal'
import ItemCard from "../components/ItemListCard"
import { getItemsByCordinates } from "../services/itemService"
import { colors } from "../styles/colors"
import { globalStyle } from "../styles/globalStyles"
import { ExistingItem } from "../types/Item"
import LoadingScreen from "./LoadingScreen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getUserLocation } from "../utils/globalFunctions"

//@ts-ignore
export default function HomeScreen({ navigation }) {
  const [allItems, setAllItems] = useState<ExistingItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ExistingItem[]>([])
  const [searchBar, setSearchBar] = useState("")

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const [isFocused, setFocused] = useState(false)

  const [isFiltersOpen, setFiltersOpen] = useState(false)

  const [distance, setDistance] = useState(15)

  const handlePress = async () => {
    const urlReporting =
      "https://forms.cityofsydney.nsw.gov.au/content/forms/af/sdf/report-illegal-dumping.html?_gl=1*6fui8q*_gcl_au*Njc5NzQ1Nzc3LjE3NTcxNDc4MDg.*_ga*MTM4OTMxNDM2Ny4xNzQ5NTE1OTc3*_ga_BM6V05EPQ5*czE3NTgwOTM3ODIkbzEkZzEkdDE3NTgwOTM4MjkkajEzJGwwJGgw";

    (await Linking.canOpenURL(urlReporting))
      ? await Linking.openURL(urlReporting)
      : Alert.alert(`Não foi possível abrir o link: ${urlReporting}`)
  }

  const fetchData = async () => {
    try {
      setDistance(Number(await AsyncStorage.getItem("filterDistance")))

      const userLocation = await getUserLocation()

      const syncItems = await getItemsByCordinates(userLocation?.latitude ?? 0, userLocation?.longitude ?? 0, distance)
      setAllItems(syncItems)
      setFilteredItems(syncItems)
    } catch (error) {
      console.error("Error to find Item: " + error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem("filterDistance", String(distance))
  }, [distance])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
    setSearchBar("")
  }

  const searchItems = async (text: string) => {
    setFilteredItems(allItems.filter((allItems) => allItems.title.includes(text)))
    if (text === "")
      setFilteredItems(allItems)
  }

  if (loading) return <LoadingScreen />

  return (
    <View style={globalStyle.body}>

      <View style={[globalStyle.topInputContainer, { width: '95%' }]}>
        <Ionicons name="options-outline" size={25} color={colors.tertiary} style={{ marginBottom: 10, marginRight: 5, marginLeft: 20 }} onPress={() => { setFiltersOpen(true) }}></Ionicons>

        <Modal
          isVisible={isFiltersOpen}
          onBackdropPress={() => {onRefresh(); setFiltersOpen(false)}}
          style={{ justifyContent: 'flex-end', margin: 0 }}
        >
          <View style={{ height: '30%', backgroundColor: colors.secondaryBackground, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
            <Text style={[globalStyle.title, { fontSize: 25, marginTop: 20, marginLeft: 20 }]}>Filters</Text>
            <Text style={[globalStyle.title, { fontSize: 18, marginLeft: 20 }]}>Maximum distance</Text>

            <Slider style={{ marginLeft: 5, marginRight: 5 }} minimumValue={1} maximumValue={30} value={distance} onValueChange={setDistance} thumbTintColor={colors.secondary} minimumTrackTintColor={colors.tertiary}></Slider>

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={[globalStyle.title, { fontSize: 15, marginLeft: 20 }]}>1 km</Text>
              <Text style={[globalStyle.title, { fontSize: 15, color: colors.secondary }]}>{distance.toPrecision(2)} km</Text>
              <Text style={[globalStyle.title, { fontSize: 15, marginRight: 20 }]}>30 km</Text>
            </View>
          </View>

          <View style={[globalStyle.footer, { height: 100 }]}>
            <Pressable
              style={[globalStyle.mainButton, { width: 260, flexDirection: "row" }]}
              onPress={() => {onRefresh(); setFiltersOpen(false)}}
            >
              <Ionicons name="search" size={20} color={colors.secondaryBackground} />
              <Text style={globalStyle.buttonText}>
                Search
              </Text>
            </Pressable>
          </View>
        </Modal>

        <View
          style={[globalStyle.longInput, isFocused && globalStyle.inputFocused]}
        >
          <Ionicons name="search-outline" size={20} color={colors.tertiary} />
          <TextInput
            value={searchBar}
            placeholder="Search your Treasure"
            placeholderTextColor={isFocused ? colors.darkLightText : "#999"}
            style={{
              fontFamily: "Fredoka_400Regular",
              paddingLeft: 10,
              width: "100%",
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(text) => { setSearchBar(text); searchItems(text) }}
          />
        </View>
      </View>

      {
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => <ItemCard item={item} origin="ItemFromStreet" originType=""/>}
          contentContainerStyle={{ paddingBottom: 150 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

      <Pressable
        style={globalStyle.roundButton}
        onPress={() => navigation.navigate("CreateItemScreen")}
      >
        <Image
          source={require("../assets/add-trash.png")}
          style={{ width: 30, height: 30 }}
        ></Image>
      </Pressable>
      <Pressable
        style={[
          globalStyle.roundButton,
          {
            backgroundColor: colors.warning2,
            borderColor: colors.warning1,
            bottom: 100,
          },
        ]}
        onPress={handlePress}
      >
        <Ionicons
          name="warning-outline"
          size={35}
          color={colors.secondaryBackground}
          style={{ paddingBottom: 5 }}
        />
      </Pressable>
    </View>
  )
}
