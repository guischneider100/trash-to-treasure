import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#3F434C' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#57AC8D' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#343843' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#343843' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#262834' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#D1CFD2' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#262834' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#525969' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#87e0c0' }] },
];

export const CALENDAR_STYLE =
  {
    calendarBackground: colors.secondaryBackground,
    monthTextColor: colors.darkText,
    arrowColor: colors.tertiary,
    textMonthFontFamily: 'Fredoka_400Regular',
    textMonthFontSize: 18,
    textDayFontFamily: 'Fredoka_400Regular',
    textDayHeaderFontFamily: 'Fredoka_400Regular',
    todayTextColor: colors.warning,
  };

export const SIZES = {
  height,
  width,
};

export const globalStyle = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },

  title: {
    fontSize: 40,
    paddingTop: 10,
    paddingBottom: 20,
    fontFamily: 'Fredoka_500Medium',
    color: colors.darkText,
  },

  normalText: {
    paddingBottom: 40, 
    fontSize: 16, 
    fontFamily: 'Fredoka_400Regular', 
    color:colors.darkLightText, 
    textAlign: 'center',
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginCard: {
    width: width * 0.85,
    flex: 0.57,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    elevation: 10,
  },

  mainButton: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  roundButton: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 1.5,
    position: 'absolute',
    bottom: 150,
    right: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 35,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  roundButton2: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 1.5,
    position: 'absolute',
    top: 40,
    right: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 35,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  photoButton: {
    backgroundColor: 'trasparent',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 15,
    width: width * 0.65,
    height: 330,
    borderStyle: 'dashed',
    borderWidth: 2,
    opacity: 0.6,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoDisplay: {
    marginTop: 20,
    width: width * 0.65,
    height: 330,
    borderRadius: 15,
  },

  buttonText: {
    fontFamily: 'Fredoka_500Medium', 
    color: colors.secondaryBackground,     
    textShadowColor: colors.tertiary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  buttonTextSelection: {
    fontFamily: 'Fredoka_500Medium', 
    color: colors.warning1, 
    textShadowColor: colors.secondaryWarning,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 10,
  },

  simpleButtonText: {
    fontFamily: 'Fredoka_500Medium', 
    color: colors.primary,
    textShadowColor: colors.tertiary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: 12,
  },

  filterButton: {
    backgroundColor: colors.secondaryWarning,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.tertiary,
    color: colors.darkLightText,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.90,
    height: 45,
    margin: 10,
    fontFamily: 'Fredoka_400Regular',
    opacity: 0.7,
  },

  longInput: {
    width: '90%', 
    borderColor: colors.tertiary, 
    borderWidth: 1,
    color: colors.darkLightText,
    alignItems: 'center', 
    flexDirection: 'row', 
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15, 
    height: 45,
  },

  inputFocused: {
    borderColor: colors.primary,
    color: colors.darkText,
    opacity: 1,
  },

  textFocused: {
    color: colors.primary,
    opacity: 1,
  },

  picker: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.tertiary,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.90,
    height: 47,
    margin: 10,
    marginLeft: 21.5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    opacity: 0.7,
  },

  pickerItem: {
    fontFamily: 'Fredoka_400Regular',
  },

  pickerDropBox: {
    borderColor: colors.primary, 
    width: width * 0.90,
    marginTop: 10,
    marginLeft: 21.5,
  },

  smallInput: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.tertiary,
    color: colors.darkLightText,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.70,
    height: 45,
    margin: 10,
    fontFamily: 'Fredoka_400Regular'
  },
  
  topInputContainer: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  topRigthCornerContainer: {
    paddingTop: 50,
    alignContent: 'flex-end', 
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  bottomInputContainer: {
    bottom: 50,
    position: 'absolute',
    flexDirection: 'row',
  },

  logo: {
    width: 250,
    height: 240,
    marginBottom: 5,
  },

  logo2: {
    width: 150,
    height: 140,
  },

  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },

  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.secondaryBackground,
    height: 100,
    borderTopWidth: 1,
    borderColor: colors.secondary,
  },

  itemImg: {
    width: '100%',
    height: 350,
  },

  itemCard: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: -40,
    padding: 16,
    elevation: 5,
    borderTopWidth: 1.5,
    borderEndWidth: 1.5,
    borderStartWidth: 1.5,
    borderColor: colors.secondary,
  },

  itemMenu: {
    backgroundColor: colors.secondaryBackground,
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 8,
    borderColor: colors.secondary,
    width: 150,
    left: 20,
    top: 80,
    position: "absolute",
    zIndex: 10,
  },

  itemMenuButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  footer: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-around',
    backgroundColor: colors.secondaryBackground,
    borderTopWidth: 1,
    borderColor: colors.secondary,
    height: 130,
    elevation: 5,
  },

  mapCard: {
    position: 'absolute',
    bottom: height * 0.53,
    right: 120,
    left: 120,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: colors.secondaryBackground,
    overflow: 'hidden',
    elevation: 5,
  },
  
  imageMapCard: {
    width: '100%',
    height: 130,
  },

  titleMapCard: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Fredoka_500Medium',
    color: colors.darkText,
  },

  descriptionMapCard: {
    fontSize: 10,
    color: colors.darkText,
    fontFamily: 'Fredoka_400Regular',
  },

  compactMap: {
    width: "100%",
    height: 150,
  },
});