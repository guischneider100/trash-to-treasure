import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from '../screens/ItemScreen';
import CreateItemScreen from '../screens/CreateItemScreen';
import TabNavigator from './TabNavigator';
import { colors } from '../styles/colors';
import UserScreenChangePassword from '../screens/UserScreenChangePassword';

export default function AppStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {backgroundColor: colors.secondaryBackground},headerTitleStyle: {fontFamily: 'Fredoka_500Medium'}}}>
            <Stack.Screen name="AppTabs" component={TabNavigator} />

            <Stack.Screen name="ItemFromStreet" component={ItemScreen} />
            <Stack.Screen name="ItemFromUser" component={ItemScreen} />
            <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} options={{title: 'Posting your Trash', headerShown: true}}/>
            <Stack.Screen name="ChangePassword" component={UserScreenChangePassword} options={{title: "Changing your password", headerShown: true}}/>
        </Stack.Navigator>
    );
}