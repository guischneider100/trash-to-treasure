import { Pressable, Text, TextInput, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useState } from "react";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";

// @ts-ignore
export default function RequestForgotPasswordScreen({navigation}){
    const [isFocused, setFocused] = useState<string|null>(null);

    return(
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <Text style={[globalStyle.normalText, {width: "90%"}]}>Don't worry friend, we get your back! Just insert the same email address that you use for this account and we do the rest.</Text>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "email" && globalStyle.textFocused]}>Email</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "email" && globalStyle.inputFocused]}>
                    <Ionicons name="mail-outline" size={20} color={colors.tertiary}/>
                    <TextInput onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={() => navigation.navigate('RedefineForgotPasswordScreen')}>
                    <Text style={globalStyle.buttonText}>Send Request</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}