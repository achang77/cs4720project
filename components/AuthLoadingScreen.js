import React from 'react';
import {
  ActivityIndicator, AsyncStorage, StatusBar, View,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.checkLoggedIn();
  }

  // Fetch the token from storage then navigate to our appropriate place
  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  checkLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoadingScreen;
