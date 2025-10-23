import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

// @ts-ignore
export default function RedefineForgotPasswordScreen({navigation}){
    const [isFocused, setFocused] = useState<string|null>(null);

    return(
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <Text style={[globalStyle.normalText, {width: "90%"}]}>Okaay, time to redefine the password. Try to remember this time, please! Just kidding, you can redefine this anytime, go now and get some good stuff on the street.</Text>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "password" && globalStyle.textFocused]}>New Password</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "password" && globalStyle.inputFocused]}>
                    <Ionicons name="key-outline" size={20} color={colors.tertiary}/>
                    <TextInput placeholderTextColor={isFocused === "password" ? colors.darkLightText : "#999"} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "cPassword" && globalStyle.textFocused]}>Confirm New Password</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "cPassword" && globalStyle.inputFocused]}>
                    <Ionicons name="key-outline" size={20} color={colors.tertiary}/>
                    <TextInput placeholderTextColor={isFocused === "cPassword" ? colors.darkLightText : "#999"} onFocus={() => setFocused("cPassword")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={() => navigation.navigate("Login")}>
                    <Text style={globalStyle.buttonText}>Redefine Password</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}