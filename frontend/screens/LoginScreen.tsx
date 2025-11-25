import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  RequestForgotPassword: undefined;
  RedefineForgotPassword: undefined;
};

// @ts-ignore
export default function LoginScreen() {
  const [isFocused, setFocused] = useState<string|null>(null);
  const { signIn } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  
  const handleLogin = () => {
    signIn();
  }

  return (
    <View style={[globalStyle.container, {backgroundColor: colors.background}]}>
      <View style={globalStyle.loginCard}>
        <Image source={require('../assets/logo.png')} style={globalStyle.logo}/>
        <StatusBar style="auto" />

        <View style={{alignSelf: 'flex-start', left: 23}}>
            <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "email" && globalStyle.textFocused]}>Email</Text>
        </View>
        <View style={[globalStyle.longInput, isFocused === "email" && globalStyle.inputFocused]}>
            <Ionicons name="mail-outline" size={20} color={colors.tertiary}/>
            <TextInput onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
        </View>

        <View style={{alignSelf: 'flex-start', left: 23}}>
            <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "password" && globalStyle.textFocused]}>Password</Text>
        </View>
        <View style={[globalStyle.longInput, isFocused === "password" && globalStyle.inputFocused]}>
            <Ionicons name="key-outline" size={20} color={colors.tertiary}/>
            <TextInput placeholderTextColor={isFocused === "password" ? colors.darkLightText : "#999"} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
        </View>

        <Pressable style={[globalStyle.mainButton, {width:330}]} onPress={handleLogin}>
          <Text style={globalStyle.buttonText}>Log In</Text>
        </Pressable>

        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={[globalStyle.simpleButtonText, {paddingHorizontal: 50, paddingVertical: 10}]}>Create an Account</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('RequestForgotPassword')}>
            <Text style={[globalStyle.simpleButtonText, {paddingHorizontal: 50, paddingVertical: 10}]}>Forgot your password?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}