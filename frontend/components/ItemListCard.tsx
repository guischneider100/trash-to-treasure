import React from "react";
import { StyleSheet, View, Image, Text, Dimensions, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../styles/colors";

type Props = {
    title: string,
    description?: string,
    photo?: any,
    origin: string,
}

const { width } = Dimensions.get('window');

export default function ItemCard({title, description, photo, origin} : Props){
  const navigation = useNavigation() as any;

  const navPag = origin == "HomeScreen" ? "ItemFromHome" : "ItemFromUser"

  const accessItem = () => {
    navigation.navigate(navPag,{ from: [origin]});
  };

    return(
      <Pressable style={styles.card} onPress={accessItem}>
          {photo && <Image source={photo} style={styles.image}/>}
          <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              {description && <Text style={styles.description}>{description}</Text>}
          </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.90,
    marginRight: 16,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: colors.secondaryBackground,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Fredoka_500Medium',
    color: colors.darkText,
  },
  description: {
    fontSize: 14,
    color: colors.darkText,
    fontFamily: 'Fredoka_400Regular',
  },
});