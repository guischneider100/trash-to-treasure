import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../screens/LoadingScreen";
import { colors } from "../styles/colors";
import TabNavigator from "./TabNavigator";
import AuthNavigator from "./AuthNavigator";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

export default function RootNavigator(){
    const { logged } = useAuth();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if(loading) return <LoadingScreen />;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {backgroundColor: colors.secondaryBackground}, headerTitleStyle: {fontFamily: 'Fredoka_500Medium'}}}>
            {logged ? 
                <Stack.Screen name="AppStack" component={AppStack} />
            :
                <Stack.Screen name="Auth" component={AuthNavigator} />
            }
        </Stack.Navigator>
    );
}