import { Pressable, Text, TextInput, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";
import { useState } from "react";
import { changePassword } from "../services/authService";
import { ActivityIndicator } from "react-native-paper";

//@ts-ignore
export default function UserScreenChangePassword({ navigation }) {

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [isSaving, setSaving] = useState(false)

    const requestChangePassword = async () => {
        setSaving(true)

        await changePassword({ oldPassword, newPassword, confirmPassword }).then((response) => {
            console.log("Teste: " + response)
            navigation.goBack()
        }).catch((error) => {
            console.log(error)
            setSaving(false)
        })
    }

    return (
        <View style={globalStyle.body}>
            <View style={[globalStyle.container]}>

                <View style={{ alignSelf: "flex-start", left: 23 }}>
                    <Text style={{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }}>Current password</Text>
                </View>

                <View style={globalStyle.longInput}>
                    <TextInput style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} onChangeText={setOldPassword} value={oldPassword}></TextInput>
                </View>

                <View style={{ alignSelf: "flex-start", left: 23 }}>
                    <Text style={{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }}>New password (6-60 characters)</Text>
                </View>

                <View style={globalStyle.longInput}>
                    <TextInput style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} onChangeText={setNewPassword} value={newPassword}></TextInput>
                </View>

                <View style={{ alignSelf: "flex-start", left: 23 }}>
                    <Text style={{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }}>Re-enter new password</Text>
                </View>

                <View style={globalStyle.longInput}>
                    <TextInput style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} onChangeText={setConfirmPassword} value={confirmPassword}></TextInput>
                </View>
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                    <Pressable style={[globalStyle.mainButton, { width: 260 }]} onPress={requestChangePassword}>
                        {isSaving ? (<ActivityIndicator size={30} color={colors.secondaryBackground} />)
                            :
                        (<Text style={globalStyle.buttonText}>Save</Text>)}
                    </Pressable>
                </View>
            </View>
        </View>
    );
}