import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';
import { useState } from 'react';

type Props = {
  onLogin: () => void;
};

// @ts-ignore
export default function LoginScreen({ navigation, onLogin }: Props) {
  const [isFocused, setFocused] = useState<string|null>(null);

  return (
    <View style={[globalStyle.container, {backgroundColor: colors.background}]}>
      <View style={globalStyle.loginCard}>
        <Image source={require('../assets/logo.png')} style={globalStyle.logo}/>
        <StatusBar style="auto" />

        <View>
          <TextInput style={[globalStyle.smallInput, isFocused === "email" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "email" ? "#000" : "#999"} placeholder="Email" onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}/>
          <TextInput style={[globalStyle.smallInput, isFocused === "password" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "password" ? "#000" : "#999"} placeholder="Password" onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}/>
        </View>

        <Pressable style={[globalStyle.mainButton, {width:300}]} onPress={onLogin}>
          <Text style={globalStyle.buttonText}>Sign Up</Text>
        </Pressable>

        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => navigation.navigate('CreateAccountScreen')}>
            <Text style={[globalStyle.simpleButtonText, {margin: 22}]}>Create an Account</Text>
          </Pressable>
          <Pressable>
            <Text style={[globalStyle.simpleButtonText, {margin: 22}]}>Forgot your password?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}