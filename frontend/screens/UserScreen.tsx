import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'
import { colors } from '../styles/colors';

type Props = {
  onLogin: () => void;
};

// @ts-ignore
export default function UserScreen({ onLogin }: Props) {
  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.topRigthCornerContainer}>
        <Pressable onPress={onLogin}>
          <Text style={globalStyle.simpleButtonText}>Logout</Text>
        </Pressable>
      </View>
      <View style={[globalStyle.container, {justifyContent: 'flex-start', paddingTop: 60}]}>
        <Image source={require('../assets/profile.jpg')} style={globalStyle.profilePhoto}/>
        <TextInput style={globalStyle.smallInput} placeholderTextColor="#999" placeholder="Email"/>
        <TextInput style={globalStyle.smallInput} placeholderTextColor="#999" placeholder="Senha"/>

        <Pressable style={{paddingTop: 50}}>
          <Text style={globalStyle.simpleButtonText}>About Us</Text>
        </Pressable>
        <Pressable style={{paddingTop: 10}} onPress={onLogin}>
          <Text style={[globalStyle.simpleButtonText, {color: colors.warning1, textShadowColor: 'red'}]}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}