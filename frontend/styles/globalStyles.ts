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
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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

  buttonText: {
    fontFamily: 'Fredoka_500Medium', 
    color: colors.secondaryBackground,     
    textShadowColor: colors.tertiary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  simpleButtonText: {
    fontFamily: 'Fredoka_500Medium', 
    color: colors.primary,
    textShadowColor: colors.tertiary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  filterButton: {
    backgroundColor: colors.secondaryWarning,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
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
    margin: 10,
  },

  smallInput: {
    backgroundColor: colors.secondaryBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.70,
    margin: 10,
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
    borderWidth: 2,
    borderColor: colors.primary,
  },

  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.secondaryBackground,
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
  },

  itemImg: {
    width: '100%',
    height: 300,
  },

  itemCard: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    padding: 16,
    elevation: 3,
  },

  footer: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-around',
    backgroundColor: colors.secondaryBackground,
    borderWidth: 1,
    borderColor: 'white',
    height: 130,
    elevation: 5,
  },
});