/* eslint-disable import/no-dynamic-require */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import {
  View, Image, TouchableOpacity, Alert, StyleSheet, AsyncStorage,
} from 'react-native';
import {
  listenOrientationChange as lor,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import * as Facebook from 'expo-facebook';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

const en = {
  brandtext: '../assets/images/slices/splash_screen/DinDinText',
  startbutton: '../assets/images/slices/splash_screen/getStarted.png',
};
const ar = {
  brandtext: '../assets/images/arabic_text.png',
  startbutton: '../assets/images/arabic_getStarted.png',
};

i18n.fallbacks = true;
i18n.translations = { ar, en };
// i18n.locale = Localization.locale;
i18n.locale = 'ar';

class SplashScreen extends React.Component {
  static navigationOptions = {
    headerMode: 'none',
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    lor(this);
  }

  componentWillUnmount() {
    rol();
  }

  storeData = async (data) => {
    try {
      await AsyncStorage.setItem('userToken', data);
      console.log('Successfully stored userToken');
      console.log(data);
    } catch (error) {
      console.log('Error no store data');
    }
  };

  // eslint-disable-next-line class-methods-use-this
  async handleFacebookLogin(navigation) {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync('667289577029658', {
        permissions: ['public_profile'],
      });

      switch (type) {
        case 'success': {
          const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
          const profile = await response.json();
          Alert.alert('Logged in!', `Hi ${profile.name}!`);
          this.storeData(token);
          navigation.navigate('App', { token });
          break;
        }
        case 'cancel': {
          Alert.alert('Sorry!', 'You need a Facebook account to access DinDin');
          break;
        }
        default: {
          Alert.alert('Oops!', 'Login failed!');
        }
      }
    } catch (e) {
      console.log('Something unexpected happened');
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      },
      logo: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bottomButton: {
        position: 'absolute',
        bottom: 0,
      },
      buttonImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 7.8125,
      },
    });

    const brandtext = i18n.t('brandtext');
    const startbutton = i18n.t('startbutton');

    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={require('../assets/images/slices/splash_screen/Logo.png')} />
          {/* <Image source={require('../assets/images/slices/splash_screen/DinDinText.png')} /> */}
          <Image
            source={
              i18n.locale === 'en'
                ? require('../assets/images/slices/splash_screen/DinDinText.png')
                : require('../assets/images/arabic_text.png')
            }
          />
        </View>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => this.handleFacebookLogin(this.props.navigation)}
        >
          <Image
            style={styles.buttonImage}
            // source={require('../assets/images/slices/splash_screen/getStarted.png')}
            source={
              i18n.locale === 'en'
                ? require('../assets/images/slices/splash_screen/getStarted.png')
                : require('../assets/images/arabic_getstarted.png')
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SplashScreen;
