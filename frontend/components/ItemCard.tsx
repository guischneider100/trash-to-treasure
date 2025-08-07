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

  const accessItem = () => {
    navigation.navigate("ItemScreen",{ from: [origin]});
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
    width: width * 0.6,
    marginRight: 16,
    marginTop: 10,
    marginLeft: 12,
    borderRadius: 16,
    backgroundColor: colors.secondaryBackground,
    overflow: 'hidden',
    elevation: 3,
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
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});