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
          <TextInput style={[globalStyle.input, {fontFamily: 'Fredoka_400Regular'}]} placeholderTextColor="#999" placeholder="Email"/>
          <TextInput style={[globalStyle.input, {fontFamily: 'Fredoka_400Regular'}]} placeholderTextColor="#999" placeholder="Senha"/>
        </View>

        <Pressable style={[globalStyle.mainButton, {width:300}]} onPress={onLogin}>
          <Text style={{fontFamily: 'Fredoka_500Medium'}}>SIGN UP</Text>
        </Pressable>

        <Pressable><Text style={{fontFamily: 'Fredoka_400Regular'}}>Forgot your password?</Text></Pressable>
      </View>
    </View>
  );
}