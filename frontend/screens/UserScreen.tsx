import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, TextInput, View } from 'react-native';
import ElipseMenu from '../components/ElipseMenu';
import { useAuth } from '../context/AuthContext';
import { colors } from '../styles/colors';
import { globalStyle } from '../styles/globalStyles';
import { ExistingUser } from '../types/User';

// @ts-ignore
export default function UserScreen({ navigation }) {
  const [userS, setUser] = useState<ExistingUser | null>()

  const [isFocused, setFocused] = useState<string | null>(null);

  const [menuVisible, setVisible] = useState(false);

  const { user } = useAuth()

  const callChangePassword = () => {
    navigation.navigate("ChangePassword")
  }

  useEffect(() => {
    setUser(user)
  }, [])

  return (
    <View style={globalStyle.body}>

      <View style={globalStyle.topInputContainer}>
        <Pressable style={[globalStyle.roundButton2, { width: 28, height: 28, left: 20 }]} onPress={() => setVisible(true)}>
          <Ionicons name="ellipsis-vertical-sharp" size={22} color={colors.secondaryBackground} />
        </Pressable>
      </View>

      {menuVisible && <ElipseMenu />}

      <Pressable onPress={() => setVisible(false)}>
        <View style={[globalStyle.container, { justifyContent: 'flex-start', paddingTop: 20 }]}>

          <Image source={require('../assets/logo.png')} style={globalStyle.logo2} />

          <Pressable onPress={callChangePassword}>
            <View style={{ width: '100%', borderBottomColor: colors.tertiary, borderBottomWidth: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 20 }}>
              <Ionicons name="key-outline" size={20} color={colors.tertiary} />
              <TextInput placeholder='Change your password' placeholderTextColor="#999" style={{ width: '100%', height: 55, fontFamily: 'Fredoka_400Regular', paddingLeft: 10 }} editable={false} />
            </View>
          </Pressable>

          <View style={{ width: '100%', borderBottomColor: colors.tertiary, borderBottomWidth: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 10 }}>
            <Ionicons name="mail-outline" size={20} color={colors.tertiary} />
            <TextInput value={userS?.email} placeholder='Email' placeholderTextColor="#999" style={{ width: '90%', height: 55, fontFamily: 'Fredoka_400Regular', paddingLeft: 10 }} editable={false} />
          </View>

          <View style={{ width: '100%', borderBottomColor: colors.tertiary, borderBottomWidth: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 10 }}>
            <Ionicons name="phone-portrait-outline" size={20} color={colors.tertiary} />
            <TextInput value={userS?.mobile} placeholder='Mobile' placeholderTextColor="#999" style={{ width: '90%', height: 55, fontFamily: 'Fredoka_400Regular', paddingLeft: 10 }} editable={false} />
          </View>

          {/* <View style={{ paddingTop: 30, alignItems: 'center' }}>
            <Text style={{ paddingBottom: 10, fontFamily: 'Fredoka_400Regular', color: colors.darkLightText }}>Collection days for Neutral Bay: </Text>

            <Calendar key={Date.now()} style={{ borderRadius: 15, width: 350, height: 365, borderWidth: 1, borderColor: colors.tertiary, backgroundColor: colors.secondaryBackground, elevation: 3 }} theme={CALENDAR_STYLE}
              markedDates={{
                "2025-10-03": {
                  selected: true,
                  selectedColor: colors.secondary,
                  selectedTextColor: colors.darkText,
                }, "2025-10-07": {
                  selected: true,
                  selectedColor: colors.calendarYellow,
                  selectedTextColor: colors.darkText,
                }, "2025-10-09": {
                  selected: true,
                  selectedColor: colors.calendarRed,
                  selectedTextColor: colors.darkText,
                }
              }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15 }}>
            <View style={{ height: 20, width: 20, borderRadius: 50, backgroundColor: colors.calendarYellow }} />
            <Text style={{ fontFamily: 'Fredoka_400Regular', color: colors.calendarYellow }}> Recycling </Text>
            <View style={{ height: 20, width: 20, borderRadius: 50, backgroundColor: colors.secondary }} />
            <Text style={{ fontFamily: 'Fredoka_400Regular', color: colors.secondary }}> Garden organics </Text>
            <View style={{ height: 20, width: 20, borderRadius: 50, backgroundColor: colors.calendarRed }} />
            <Text style={{ fontFamily: 'Fredoka_400Regular', color: colors.calendarRed }}> Rubbish </Text>
          </View>*/}
        </View>
      </Pressable>
    </View>
  );
}