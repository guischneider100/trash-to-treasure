import {
  Pressable,
  TextInput,
  View,
  FlatList,
  Linking,
  Alert,
} from "react-native"
import { globalStyle } from "../styles/globalStyles"
import { Ionicons } from "@expo/vector-icons"
import ItemCard from "../components/ItemListCard"
import { getAllItems } from "../services/itemService"
import { ExistingItem } from "../types/Item"
import { useEffect, useState } from "react"
import { colors } from "../styles/colors"
import { Image } from "react-native"
import LoadingScreen from "./LoadingScreen"
import { mapItemFromBackend } from "../utils/itemMapper"

//@ts-ignore
export default function HomeScreen({ navigation }) {
  const [allItems, setAllItems] = useState<ExistingItem[]>([])
  const [filteredItems, setFilteredItems] = useState<ExistingItem[]>([])
  const [searchBar, setSearchBar] = useState("")

  const [loading, setLoading] = useState(true)

  const [refreshing, setRefreshing] = useState(false)

  const [isFocused, setFocused] = useState(false)

  const handlePress = async () => {
    const urlReporting =
      "https://forms.cityofsydney.nsw.gov.au/content/forms/af/sdf/report-illegal-dumping.html?_gl=1*6fui8q*_gcl_au*Njc5NzQ1Nzc3LjE3NTcxNDc4MDg.*_ga*MTM4OTMxNDM2Ny4xNzQ5NTE1OTc3*_ga_BM6V05EPQ5*czE3NTgwOTM3ODIkbzEkZzEkdDE3NTgwOTM4MjkkajEzJGwwJGgw";

    (await Linking.canOpenURL(urlReporting))
      ? await Linking.openURL(urlReporting)
      : Alert.alert(`Não foi possível abrir o link: ${urlReporting}`)
  }

  const fetchData = async () => {
    try {
      const data = await getAllItems()
      const mappedData = data.map(mapItemFromBackend)
      setAllItems(mappedData)
      setFilteredItems(mappedData)
    } catch (error) {
      console.error("Error to find Item: " + error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchData()
    setRefreshing(false)
    setSearchBar("")
  }

  const searchItems = (text: string) => {
    setFilteredItems(allItems.filter((allItems) => allItems.title.includes(text)))
    if (text === "")
      setFilteredItems(allItems)
  }

  if (loading) return <LoadingScreen />

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topInputContainer}>
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
            onChangeText={(text) => {setSearchBar(text); searchItems(text)}}
          />
        </View>
      </View>

      {
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => <ItemCard item={item} origin="Home" />}
          contentContainerStyle={{ paddingBottom: 150 }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

      {/* <ItemCard title='Pile of Trash' description='A really really big pile of trash with a lot of gooood stuff.' photo={require('../assets/trash.jpg')} origin='HomeScreen'/> */}

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
