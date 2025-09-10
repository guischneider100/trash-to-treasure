import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { globalStyle } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { Pressable, Animated } from 'react-native';
import { useRef } from 'react';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import UserItemScreen from '../screens/UserItemsScreen';
import UserScreen from '../screens/UserScreen';

//Animation for the buttons
const CustomTabButton = (props: any) => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={[{ flex: 1, transform: [{ scale }] }, props.style]}>
      <Pressable
        onPressIn={() => {
          Animated.spring(scale, {
            toValue: 1.5,
            useNativeDriver: true,
          }).start();
        }}
        onPressOut={() => {
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }}
        {...props}
        android_ripple={null}
        style={({ pressed }) => ({
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        {props.children}
      </Pressable>
    </Animated.View>
  );
};

const Tab = createBottomTabNavigator();

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Map: "map-outline",
  "My Items": "trash-outline",
  Profile: "person-outline",
};

type Props = {
  onLogin: () => void;
};

export default function TabNavigator({ onLogin }: Props) {
    return(
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({focused, color, size}) => {
                const iconName = icons[route.name];
                return <Ionicons name={iconName} size={focused ? size + 5 : size} color={color} />;
            },
            tabBarButton: (props) => <CustomTabButton {...props} />,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.tertiary,
            headerShown: false,
            tabBarStyle: globalStyle.tabBarStyle,
            tabBarLabelStyle: {
              fontFamily: 'Fredoka_400Regular'
            }
        })}>
            <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='Map' component={MapScreen}></Tab.Screen>
            <Tab.Screen name='My Items' component={UserItemScreen}></Tab.Screen>
            <Tab.Screen name='Profile'>
              {() => <UserScreen onLogin={onLogin}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}