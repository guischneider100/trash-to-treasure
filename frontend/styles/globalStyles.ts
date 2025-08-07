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
    backgroundColor: colors.background,
  },

  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  container: {
    flex: 1,
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
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textButton: {
    marginTop: 10,
    marginBottom: 10,
  },

  input: {
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 10,
    width: 300,
    margin: 10,
  },
  
  topInputContainer: {
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  bottomInputContainer: {
    bottom: 60,
    position: 'absolute',
  },

  logo: {
    width: 250,
    height: 220,
  },

  profilePhoto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.secondary,
  },

  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.secondaryBackground,
    height: 100,
  },

  itemImg: {
    width: '100%',
    height: 300,
  }
});