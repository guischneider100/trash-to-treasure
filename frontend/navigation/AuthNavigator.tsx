import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import RedefineForgotPasswordScreen from "../screens/RedefineForgotPasswordScreen";
import RequestForgotPasswordScreen from "../screens/RequestForgotPasswordScreen";
import { colors } from "../styles/colors";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {backgroundColor: colors.secondaryBackground}, headerTitleStyle: {fontFamily: 'Fredoka_500Medium'}}}>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{title: 'Create Account', headerShown: true}}/>
            <Stack.Screen name="RequestForgotPassword" component={RequestForgotPasswordScreen} options={{title: 'Forgot my password', headerShown: true}}/>
            <Stack.Screen name="RedefineForgotPassword" component={RedefineForgotPasswordScreen} options={{title: 'Reset my password', headerShown: true}}/>
        </Stack.Navigator>
    )
}