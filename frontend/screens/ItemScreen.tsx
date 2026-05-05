import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native"
import { globalStyle } from "../styles/globalStyles"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParList } from "../types/navigation"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "../styles/colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { Region } from "react-native-maps"
import MaskedView from "@react-native-masked-view/masked-view"
import { useEffect, useState } from "react"
import { getItemById, collectTreasureById, favoriteItem } from "../services/itemService"

import { formatDistanceToNowStrict } from 'date-fns';
import MapScreen from "./MapScreen"
import { ItemConditionColor, ItemConditionList } from "../types/ItemCondition"

// @ts-ignore
export default function ItemScreen({ navigation }) {
  const [location, setLocation] = useState<Region | null>(null)

  const [isFavorite, setFavorite] = useState(false)

  const route = useRoute<RouteProp<RootStackParList, "ItemScreen">>()
  const from = route.params?.from
  const fromType = route.params?.fromType
  const [item, setItem] = useState(route.params?.item)

  const [timeAgo, setTimeAgo] = useState("")

  const itemCondition = ItemConditionColor[item.condition as keyof typeof ItemConditionColor]
  const conditionColor = itemCondition.color
  const conditionIcon = itemCondition.icon
  const statusColor = item.collectedByUserId ? colors.warning1 : colors.primary

  const confirmCollectTreasure = () => {
    Alert.alert(
      "Retrieve Treasure",
      "Are you sure that you are getting this Treasure?",
      [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => collectTreasure(),
        },
      ],
    )
  }

  const handleFavorite = async () => {
    await favoriteItem(item.id).then(
      () => { setFavorite(x => !x) }
    )
  }

  const collectTreasure = () => {
    collectTreasureById(item.id).then(() =>
      navigation.navigate("AppTabs", { screen: "Home" }),
    )
  }

  const fetchItem = async () => {
    try {
      const syncItem = await getItemById(item.id)
      setTimeAgo(formatDistanceToNowStrict(new Date(syncItem.postedAt)) + " ago")
      setItem(syncItem)
      setFavorite(syncItem.isFavorite)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItem()
  }, [])

  return (
    <SafeAreaView style={globalStyle.body} edges={[]}>
      <Image
        source={{uri: item.photoUrl}}
        style={globalStyle.itemImg}
        resizeMode="cover"
      />
      <Pressable style={[globalStyle.roundButton2, { left: 20 }]}>
        <Ionicons
          name="arrow-back-sharp"
          size={25}
          color={colors.secondaryBackground}
          onPress={() => navigation.goBack()}
        />
      </Pressable>

      <Pressable style={globalStyle.roundButton2} onPress={() => handleFavorite()}>
        <Ionicons
          name={isFavorite ? "heart-sharp" : "heart-outline"}
          size={25}
          color={colors.secondaryBackground}
        />
      </Pressable>
      <Pressable style={[globalStyle.roundButton2, { right: 60 }]}>
        <Ionicons
          name="share-social-outline"
          size={25}
          color={colors.secondaryBackground}
        />
      </Pressable>
      {from == "UserItem" && (
        <Pressable style={[globalStyle.roundButton2, { right: 100 }]}>
          <Ionicons
            name="trash-outline"
            size={25}
            color={colors.secondaryBackground}
          />
        </Pressable>
      )}

      <View style={globalStyle.itemCard}>
        <View style={{ alignItems: "center" }}>
          <Text style={globalStyle.title}>{item.title}</Text>

          <Text style={globalStyle.normalText}>{item.description}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: colors.darkLightText,
              borderWidth: 1.5,
              borderRadius: 15,
              padding: 5,
            }}
          >
            <Ionicons
              name={item.collectedByUserId ? "bag-remove-outline" : "bag-check-outline"}
              size={30}
              color={statusColor}
              style={{ paddingRight: 5 }}
            />
            <Text
              style={{
                color: statusColor,
                fontSize: 13,
                fontFamily: "Fredoka_400Regular",
              }}
            >
              {item.collectedByUserId ? "Taken" : "Available"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: colors.darkLightText,
              borderWidth: 1.5,
              borderRadius: 15,
              padding: 5,
            }}
          >
            <Ionicons
              name={conditionIcon}
              size={30}
              color={conditionColor}
              style={{ paddingRight: 3 }}
            />
            <Text
              style={{
                color: conditionColor,
                fontSize: 13,
                fontFamily: "Fredoka_400Regular",
              }}
            >
              {item.condition}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderColor: colors.darkLightText,
              borderWidth: 1.5,
              borderRadius: 15,
              padding: 5,
            }}
          >
            <Ionicons
              name={"today-outline"}
              size={30}
              color={"black"}
              style={{ paddingRight: 3 }}
            />
            <Text
              style={{
                color: "black",
                fontSize: 13,
                fontFamily: "Fredoka_400Regular",
              }}
            >
              {timeAgo}
            </Text>
          </View>
        </View>

        <Text
          style={{
            paddingBottom: 10,
            fontFamily: "Fredoka_400Regular",
            fontSize: 15,
            color: colors.darkLightText,
          }}
        >
          Location:
        </Text>

        <MaskedView
          style={globalStyle.compactMap}
          maskElement={
            <View
              style={{ backgroundColor: "black", borderRadius: 15, flex: 1 }}
            />
          }
        >
          <MapScreen viewingItem={item}></MapScreen>
        </MaskedView>
      </View>

      {fromType != "Collected Treasure" && <View style={globalStyle.footer}>
        <View style={globalStyle.bottomInputContainer}>
          <Pressable
            style={[globalStyle.mainButton, { width: 260 }]}
            onPress={confirmCollectTreasure}
          >
            <Text style={globalStyle.buttonText}>
              {from == "ItemFromStreet" || fromType == "Favorites" ? "Transform into Treasure" : "Update Treasure"}
            </Text>
          </Pressable>
        </View>
      </View>}
    </SafeAreaView>
  )
}
