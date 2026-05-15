import { Text, TextInput, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export default function UserScreenChangePassword() {
    return (
        <View style={globalStyle.body}>
            <View style={[globalStyle.container, {flexGrow: 0.1}]}>

                <View style={globalStyle.longInput}>
                    <Ionicons size={20} name="key-outline" color={colors.tertiary}></Ionicons>
                    <TextInput placeholder="Current password" style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }}></TextInput>
                </View>

                <View style={globalStyle.longInput}>
                    <Ionicons size={20} name="key-outline" color={colors.tertiary}></Ionicons>
                    <TextInput placeholder="New password" style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }}></TextInput>
                </View>

                <View style={globalStyle.longInput}>
                    <Ionicons size={20} name="key-outline" color={colors.tertiary}></Ionicons>
                    <TextInput placeholder="Re-enter new password" style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }}></TextInput>
                </View>
            </View>
        </View>
    );
}