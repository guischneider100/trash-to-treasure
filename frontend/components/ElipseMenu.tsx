import { Pressable, Text, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";

type Props = {
  onLogin: () => void;
};

export default function ElipseMenu({ onLogin }: Props){
    return (
        <View style={globalStyle.itemMenu}>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>How to use this</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>About us</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>Language</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>Delete account</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton} onPress={onLogin}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>Logout</Text>
            </Pressable>
        </View>
    );
}