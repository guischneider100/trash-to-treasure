import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';
import LoginScreen from './screens/LoginScreen';
import { useState } from 'react';
import ItemScreen from './screens/ItemScreen';
import Toast from 'react-native-toast-message';
import { Fredoka_400Regular, Fredoka_500Medium, useFonts } from '@expo-google-fonts/fredoka';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CreateItemScreen from './screens/CreateItemScreen';
import { colors } from './styles/colors';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Check if user is logged or not

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {backgroundColor: colors.secondaryBackground}, headerTitleStyle: {fontFamily: 'Fredoka_500Medium'}}}>
          {!isLoggedIn ? (
            <Stack.Screen name='Login'>
              {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
            </Stack.Screen>
          ):(
            <Stack.Screen name="MainApp">
              {() => <TabNavigator onLogin={() => setIsLoggedIn(false)} />}
            </Stack.Screen>
          )}

          <Stack.Screen name="ItemScreen" component={ItemScreen} />
          <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} options={{title: 'Posting your Trash',headerShown: true}}/>
        </Stack.Navigator>
        
        <Toast/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
