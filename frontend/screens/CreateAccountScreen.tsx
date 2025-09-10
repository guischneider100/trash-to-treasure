import { Pressable, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { TextInput } from "react-native";
import { useState } from "react";
import { Text } from "react-native";

//@ts-ignore
export default function CreateAccountScreen({}) {

    const [isFocused, setFocused] = useState<string|null>(null);

    const [imageUri, setImageUri] = useState<string|null>(null);

    return (
        <View style={globalStyle.body}>
            <View style={globalStyle.container}>
                <TextInput style={[globalStyle.input, isFocused === "email" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "email" ? "#000" : "#999"} placeholder="Email"  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}/>
                
                <TextInput style={[globalStyle.input, isFocused === "password" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "password" ? "#000" : "#999"} placeholder="Password"  onFocus={() => setFocused("password")} onBlur={() => setFocused(null)}/>

                <TextInput style={[globalStyle.input, isFocused === "cPassword" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "cPassword" ? "#000" : "#999"} placeholder="Confirm Password"  onFocus={() => setFocused("cPassword")} onBlur={() => setFocused(null)}/>

                <TextInput style={[globalStyle.input, isFocused === "mobile" && globalStyle.inputFocused]} placeholderTextColor={isFocused === "mobile" ? "#000" : "#999"} placeholder="Mobile"  onFocus={() => setFocused("mobile")} onBlur={() => setFocused(null)}/>
            </View>

            <View style={globalStyle.footer}>
                <View style={globalStyle.bottomInputContainer}>
                <Pressable style={[globalStyle.mainButton, {width: 260}]}>
                    <Text style={globalStyle.buttonText}>Create Account</Text>
                </Pressable>
                </View>
            </View>
        </View>
    );
}