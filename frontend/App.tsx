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
import CreateAccountScreen from './screens/CreateAccountScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import RequestForgotPasswordScreen from './screens/RequestForgotPasswordScreen';
import RedefineForgotPasswordScreen from './screens/RedefineForgotPasswordScreen';
import UserItemScreen from './screens/UserItemsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //Check if user is logged or not

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: {backgroundColor: colors.secondaryBackground}, headerTitleStyle: {fontFamily: 'Fredoka_500Medium'}}}>
              {!isLoggedIn ? ( 
              <>
                <Stack.Screen name='Login' children={(props) => (<LoginScreen {...props} onLogin={() => setIsLoggedIn(true)} />)}/>
                <Stack.Screen name='CreateAccountScreen' children={(props) => (<CreateAccountScreen {...props} onLogin={() => setIsLoggedIn(true)} />)} options={{title: 'Create Account', headerShown: true}}/>
                <Stack.Screen name="RedefineForgotPasswordScreen" component={RedefineForgotPasswordScreen} options={{title: 'Reset my password', headerShown: true}}/>
                <Stack.Screen name="RequestForgotPasswordScreen" component={RequestForgotPasswordScreen} options={{title: 'Forgot my password', headerShown: true}}/>
              </>
              ):(
                <>
                  <Stack.Screen name="MainApp">
                    {() => <TabNavigator onLogin={() => setIsLoggedIn(false)} />}
                  </Stack.Screen>
                  <Stack.Screen name="ItemScreen" component={ItemScreen}/>
                  <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} options={{title: 'Posting your Trash', headerShown: true}}/>
                  <Stack.Screen name="UserItemScreen" component={UserItemScreen}/>
                </>
              )}


            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
