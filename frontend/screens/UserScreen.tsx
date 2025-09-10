import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onLogin: () => void;
};

// @ts-ignore
export default function UserScreen({ onLogin }: Props) {
  const [isFocused, setFocused] = useState<string|null>(null);

  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topRigthCornerContainer}>
        <Pressable onPress={onLogin}>
          <Text style={globalStyle.simpleButtonText}>Logout</Text>
        </Pressable>
      </View>
      <View style={[globalStyle.container, {justifyContent: 'flex-start', paddingTop: 60}]}>
        <Image source={require('../assets/profile.jpg')} style={globalStyle.profilePhoto}/>
        <Pressable style={[globalStyle.roundButton2, {right: 130, top: 50}]}>
          <Ionicons name="camera-reverse-outline" size={30} color={colors.secondaryBackground}/>
        </Pressable>

        <TextInput style={[globalStyle.input, isFocused === "email" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "email" ? "#000" : "#999"} placeholder="Email" onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}/>
        <TextInput style={[globalStyle.input, isFocused === "password" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "password" ? "#000" : "#999"} placeholder="Password" onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}/>

        <Pressable style={{paddingTop: 20}}>
          <Text style={globalStyle.simpleButtonText}>About Us</Text>
        </Pressable>
        <Pressable style={{paddingTop: 10}} onPress={onLogin}>
          <Text style={[globalStyle.simpleButtonText, {color: colors.warning1, textShadowColor: 'red'}]}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}