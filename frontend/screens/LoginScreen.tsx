import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View, Image } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';

type Props = {
  onLogin: () => void;
};

// @ts-ignore
export default function LoginScreen({ onLogin }: Props) {
  return (
    <View style={[globalStyle.container, {backgroundColor: colors.background}]}>
      <View style={globalStyle.loginCard}>
        <Image source={require('../assets/logo.png')} style={globalStyle.logo}/>
        <StatusBar style="auto" />

        <View>
          <TextInput style={globalStyle.smallInput} placeholderTextColor="#999" placeholder="Email"/>
          <TextInput style={globalStyle.smallInput} placeholderTextColor="#999" placeholder="Password"/>
        </View>

        <Pressable style={[globalStyle.mainButton, {width:300}]} onPress={onLogin}>
          <Text style={globalStyle.buttonText}>Sign Up</Text>
        </Pressable>

        <Pressable><Text style={globalStyle.simpleButtonText}>Forgot your password?</Text></Pressable>
      </View>
    </View>
  );
}