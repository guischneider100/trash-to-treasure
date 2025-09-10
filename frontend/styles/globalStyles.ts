import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    fontSize: 35,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: 'Fredoka_500Medium',
    color: colors.darkText,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginCard: {
    width: width * 0.85,
    flex: 0.52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    elevation: 4,
  },

  mainButton: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roundButton: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 2,
    position: 'absolute',
    bottom: 100,
    right: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 35,
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },

  roundButton2: {
    backgroundColor: colors.tertiary,
    borderColor: colors.secondary,
    borderWidth: 2,
    position: 'absolute',
    top: 40,
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

  photoButton: {
    backgroundColor: 'trasparent',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    width: width * 0.90,
    height: 300,
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
    fontSize: 13,
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
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.90,
    height: 45,
    margin: 10,
    fontFamily: 'Fredoka_400Regular',
    opacity: 0.7,
  },

  inputFocused: {
    borderColor: colors.primary,
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
    paddingRight: 20,
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
    height: 450,
  },

  itemCard: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -40,
    padding: 16,
    elevation: 3,
    borderTopWidth: 1.5,
    borderEndWidth: 1.5,
    borderStartWidth: 1.5,
    borderColor: 'white',
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
    bottom: height * 0.55,
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
});