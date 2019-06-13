/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-use-before-define */
/* eslint-disable global-require */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as firebase from 'firebase';
import { Platform } from 'react-native';
import firebaseConfig from './constants/firebaseConfig';
import HomeScreen from './components/HomeScreen';
import SplashScreen from './components/SplashScreen';
import DetailsScreen from './components/DetailsScreen';
import AuthLoadingScreen from './components/AuthLoadingScreen';

// expo-web is inspired or based on react-native-web
// which introduces a 'web' as platform value
if (Platform.OS !== 'web') {
  window = undefined;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const AppStack = createStackNavigator({
      Home: HomeScreen,
      Details: DetailsScreen,
    });
    const AuthStack = createStackNavigator({ Splash: SplashScreen });
    const AppContainer = createAppContainer(
      createSwitchNavigator(
        {
          AuthLoading: AuthLoadingScreen,
          App: AppStack,
          Auth: AuthStack,
        },
        {
          initialRouteName: 'AuthLoading',
        },
      ),
    );
    return <AppContainer />;
  }
}

// this.RootStack = createStackNavigator(
//   {
//     Home: {
//       screen: HomeScreen,
//     },
//     Splash: {
//       screen: SplashScreen,
//     },
//     Details: {
//       screen: DetailsScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//   },
// );

// const AppContainer = createAppContainer(this.RootStack);
