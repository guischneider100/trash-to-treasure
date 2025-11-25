import { Pressable, Text, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useAuth } from "../context/AuthContext";

export default function ElipseMenu(){

    const {signOut} = useAuth();

    const handleLogin = () => {
        signOut();
    }

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
            <Pressable style={globalStyle.itemMenuButton} onPress={handleLogin}>
                <Text style={[globalStyle.simpleButtonText, {fontSize: 15}]}>Logout</Text>
            </Pressable>
        </View>
    );
}