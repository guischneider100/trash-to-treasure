import { Alert, Pressable, Text, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useAuth } from "../context/AuthContext";
import { deleteAccount } from "../services/userService";

export default function ElipseMenu() {

    const { signOut } = useAuth();

    const handleLogin = () => {
        signOut();
    }

    const handleDeleteAccount = async() => {
        await deleteAccount().then(() =>{
            signOut();
        }).catch((error) =>
            console.log(error)
        )
    }

    const confirmDeleteAccount = async () => {
        Alert.alert(
            "Delete Account",
            "It makes my hearth sad knowing that you're going to delete this account, but i understand that sometimes we just need to move on. I'm proud that you took part on this, thanks for helping the others.",
            [
                {
                    text: "Cancel"
                },
                {
                    text: "DELETE",
                    onPress: handleDeleteAccount
                }
            ]
        )
    }

    return (
        <View style={globalStyle.itemMenu}>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, { fontSize: 15, color: "#999999" }]}>How to use this</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, { fontSize: 15, color: "#999999" }]}>About us</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton}>
                <Text style={[globalStyle.simpleButtonText, { fontSize: 15, color: "#999999" }]}>Language</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton} onPress={confirmDeleteAccount}>
                <Text style={[globalStyle.simpleButtonText, { fontSize: 15 }]}>Delete account</Text>
            </Pressable>
            <Pressable style={globalStyle.itemMenuButton} onPress={handleLogin}>
                <Text style={[globalStyle.simpleButtonText, { fontSize: 15 }]}>Logout</Text>
            </Pressable>
        </View>
    );
}