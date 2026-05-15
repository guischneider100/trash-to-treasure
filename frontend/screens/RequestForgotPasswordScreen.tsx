import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { globalStyle } from "../styles/globalStyles";
import { useState } from "react";
import { colors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { redefinePasswordAPI, requestForgotPasswordCode, verifyForgotPasswordCode } from "../services/authService";

// @ts-ignore
export default function RequestForgotPasswordScreen({ navigation }) {
    const [isFocused, setFocused] = useState<string | null>(null);

    const [steps, setSteps] = useState<"send" | "confirm" | "redefine">("send")

    const [requesting, setRequesting] = useState(false)

    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const requestCode = async () => {
        setRequesting(true)

        await requestForgotPasswordCode({ email: email }).then(() => {
            setSteps("confirm");
        }).catch((error) =>
            console.log(error)
        )

        setRequesting(false)
    }

    const confirmCode = async () => {
        setRequesting(true)

        await verifyForgotPasswordCode({ email: email, code: code }).then(() => {
            setSteps("redefine");
        }).catch((error) => {
            console.log(error);
        })

        setRequesting(false)
    }

    const redefinePassword = async () => {
        setRequesting(true)

        await redefinePasswordAPI({email: email, code: code, newPassword: newPassword}).then(() => {
            navigation.navigate("Login");
        }).catch((error) => {
            console.log(error)
        })

        setRequesting(false)
    }

    if (steps === "send") {
        return (
            <View style={globalStyle.body}>
                <View style={globalStyle.container}>
                    <Text style={[globalStyle.normalText, { width: "90%" }]}>Don't worry friend, we get your back! Just insert the same email address that you use for this account and we do the rest.</Text>

                    <View style={{ alignSelf: 'flex-start', left: 23 }}>
                        <Text style={[{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }, isFocused === "email" && globalStyle.textFocused]}>Email</Text>
                    </View>
                    <View style={[globalStyle.longInput, isFocused === "email" && globalStyle.inputFocused]}>
                        <Ionicons name="mail-outline" size={20} color={colors.tertiary} />
                        <TextInput onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} value={email} onChangeText={setEmail} />
                    </View>
                </View>

                <View style={globalStyle.footer}>
                    <View style={globalStyle.bottomInputContainer}>
                        <Pressable style={[globalStyle.mainButton, { width: 260 }]} onPress={requestCode}>
                            {requesting ?
                                <ActivityIndicator size={30} color={colors.secondaryBackground} />
                                :
                                <Text style={globalStyle.buttonText}>Send Request</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }

    if (steps === "confirm") {
        return (
            <View style={globalStyle.body}>
                <View style={globalStyle.container}>
                    <Text style={[globalStyle.normalText, { width: "90%" }]}>I forgot it, you have to confirm the code that you just got in your email, then we're ready to change your password.</Text>

                    <View style={{ alignSelf: 'flex-start', left: 23 }}>
                        <Text style={[{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }, isFocused === "code" && globalStyle.textFocused]}>Code</Text>
                    </View>
                    <View style={[globalStyle.longInput, isFocused === "code" && globalStyle.inputFocused]}>
                        <Ionicons name="mail-outline" size={20} color={colors.tertiary} />
                        <TextInput onFocus={() => setFocused("code")} onBlur={() => setFocused(null)} style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} value={code} onChangeText={setCode} />
                    </View>
                </View>

                <View style={globalStyle.footer}>
                    <View style={globalStyle.bottomInputContainer}>
                        <Pressable style={[globalStyle.mainButton, { width: 260 }]} onPress={confirmCode}>
                            {requesting ?
                                <ActivityIndicator size={30} color={colors.secondaryBackground} />
                                :
                                <Text style={globalStyle.buttonText}>Confirm Code</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }

    if (steps === "redefine") {
        return (
            <View style={globalStyle.body}>
                <View style={globalStyle.container}>
                    <Text style={[globalStyle.normalText, { width: "90%" }]}>Okaay, time to redefine the password. Try to remember this time, please! Just kidding, you can redefine this anytime, go now and get some good stuff on the street.</Text>

                    <View style={{ alignSelf: 'flex-start', left: 23 }}>
                        <Text style={[{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }, isFocused === "password" && globalStyle.textFocused]}>New Password</Text>
                    </View>
                    <View style={[globalStyle.longInput, isFocused === "password" && globalStyle.inputFocused]}>
                        <Ionicons name="key-outline" size={20} color={colors.tertiary} />
                        <TextInput placeholderTextColor={isFocused === "password" ? colors.darkLightText : "#999"} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} />
                    </View>

                    <View style={{ alignSelf: 'flex-start', left: 23 }}>
                        <Text style={[{ fontFamily: 'Fredoka_500Medium', color: colors.tertiary }, isFocused === "cPassword" && globalStyle.textFocused]}>Confirm New Password</Text>
                    </View>
                    <View style={[globalStyle.longInput, isFocused === "cPassword" && globalStyle.inputFocused]}>
                        <Ionicons name="key-outline" size={20} color={colors.tertiary} />
                        <TextInput placeholderTextColor={isFocused === "cPassword" ? colors.darkLightText : "#999"} onFocus={() => setFocused("cPassword")} onBlur={() => setFocused(null)} style={{ fontFamily: 'Fredoka_400Regular', paddingLeft: 10, width: "100%" }} value={newPassword} onChangeText={setNewPassword}/>
                    </View>
                </View>

                <View style={globalStyle.footer}>
                    <View style={globalStyle.bottomInputContainer}>
                        <Pressable style={[globalStyle.mainButton, { width: 260 }]} onPress={redefinePassword}>
                            {requesting ?
                            <ActivityIndicator size={30} color={colors.secondaryBackground}/>
                            :
                            <Text style={globalStyle.buttonText}>Redefine Password</Text>}
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }
}