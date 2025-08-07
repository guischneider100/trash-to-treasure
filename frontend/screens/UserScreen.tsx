import { Image, Pressable, Text, TextInput, View } from 'react-native';
import { globalStyle } from '../styles/globalStyles'

type Props = {
  onLogin: () => void;
};

// @ts-ignore
export default function UserScreen({ onLogin }: Props) {
  return (
    <View style={globalStyle.body}>
      <View style={globalStyle.container}>
        <Image source={require('../assets/profile.jpg')} style={globalStyle.profilePhoto}/>
        <TextInput style={globalStyle.input} placeholder="Email"/>
        <TextInput style={globalStyle.input} placeholder="Senha"/>

        <Pressable style={globalStyle.mainButton} onPress={onLogin}>
          <Text>Logout</Text>
        </Pressable>
        <Pressable style={globalStyle.textButton}>
          <Text>About Us</Text>
        </Pressable>
        <Pressable onPress={onLogin}>
          <Text style={{color: 'red'}}>Delete Account</Text>
        </Pressable>
      </View>
    </View>
  );
}