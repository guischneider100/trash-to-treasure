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
    flex: 0.55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondaryBackground,
    elevation: 4,
  },

  mainButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roundButton: {
    backgroundColor: colors.secondary,
    position: 'absolute',
    bottom: 100,
    right: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 35,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoDisplay: {
    marginTop: 20,
    width: width * 0.90,
    height: 500,
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
    fontSize: 15,
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
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.90,
    height: 45,
    margin: 10,
    fontFamily: 'Fredoka_400Regular',
  },

  picker: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.90,
    height: 45,
    margin: 10,
    justifyContent: "center",
  },

  pickerItem: {
    fontFamily: 'Fredoka_400Regular',
    color: 'gray',
  },

  smallInput: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.70,
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
    height: 220,
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
});