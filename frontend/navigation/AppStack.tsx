import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemScreen from '../screens/ItemScreen';
import CreateItemScreen from '../screens/CreateItemScreen';
import TabNavigator from './TabNavigator';

export default function AppStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AppTabs" component={TabNavigator} />

            <Stack.Screen name="ItemFromHome" component={ItemScreen} />
            <Stack.Screen name="ItemFromUser" component={ItemScreen} />
            <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} options={{title: 'Posting your Trash', headerShown: true}}/>
        </Stack.Navigator>
    );
}