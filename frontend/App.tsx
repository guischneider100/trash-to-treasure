import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/AuthContext';

import { Fredoka_400Regular, Fredoka_500Medium, useFonts } from '@expo-google-fonts/fredoka';

import RootNavigator from './navigation/RootNavigator';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <PaperProvider>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator/>
            </NavigationContainer>
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
