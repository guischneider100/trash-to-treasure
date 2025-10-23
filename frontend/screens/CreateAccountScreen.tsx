import { Pressable, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { TextInput } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

type Props = {
  onLogin: () => void;
};

//@ts-ignore
export default function CreateAccountScreen({ onLogin }: Props) {

    const [isFocused, setFocused] = useState<string|null>(null);

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>

                <Text style={[globalStyle.normalText, {width: "90%"}]}>Heyooo!! We're so glad that you decided to become more sustainable, or just wanted to get more stuff for your house, either way, we love you for that!</Text>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "email" && globalStyle.textFocused]}>Email</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "email" && globalStyle.inputFocused]}>
                    <Ionicons name="mail-outline" size={20} color={colors.tertiary}/>
                    <TextInput onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "mobile" && globalStyle.textFocused]}>Mobile</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "mobile" && globalStyle.inputFocused]}>
                    <Ionicons name="phone-portrait-outline" size={20} color={colors.tertiary}/>
                    <TextInput placeholderTextColor={isFocused === "mobile" ? colors.darkLightText : "#999"}  onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "password" && globalStyle.textFocused]}>Password</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "password" && globalStyle.inputFocused]}>
                    <Ionicons name="key-outline" size={20} color={colors.tertiary}/>
                    <TextInput placeholderTextColor={isFocused === "password" ? colors.darkLightText : "#999"} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>

                <View style={{alignSelf: 'flex-start', left: 23}}>
                    <Text style={[{fontFamily: 'Fredoka_500Medium', color: colors.tertiary}, isFocused === "cPassword" && globalStyle.textFocused]}>Confirm Password</Text>
                </View>
                <View style={[globalStyle.longInput, isFocused === "cPassword" && globalStyle.inputFocused]}>
                    <Ionicons name="key-outline" size={20} color={colors.tertiary}/>
                    <TextInput placeholderTextColor={isFocused === "cPassword" ? colors.darkLightText : "#999"} onFocus={() => setFocused("cPassword")} onBlur={() => setFocused(null)} style={{fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%"}}/>
                </View>
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]} onPress={onLogin}>
                    <Text style={globalStyle.buttonText}>Create Account</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}