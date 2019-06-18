/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React from 'react';
import {
  View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet,
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from '../constants/firebaseConfig';

class InvitationCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { data1: this.props.data };
  }

  acceptInviteUpdate() {
    console.log('the state', this.state.data1);
    const data = this.state.data1;
    data.status = 'accepted';
    this.setState(() => ({
      data1: data,
    }));

    const db = firebase.firestore();
    const dbRef = db.collection('test-data').doc('invitations');
    const name = data.id;
    const dataobj = { name: data };
    dbRef.set(dataobj, { merge: true });
    console.log('this sent to firestore: ', dataobj);
  }

  rejectInviteUpdate() {
    console.log('the state', this.state.data1);
    const data = this.state.data1;
    data.status = 'rejected';
    this.setState(() => ({
      data1: data,
    }));

    const db = firebase.firestore();
    const dbRef = db.collection('test-data').doc('invitations');
    const name = data.id;
    const dataobj = { name: data };
    dbRef.set(dataobj, { merge: true });
    console.log('this sent to firestore: ', dataobj);
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        width: widthPercentageToDP('86%'),
        height: heightPercentageToDP('20%'),
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      backgroundImage: {
        width: 'auto',
        height: 'auto',
        resizeMode: 'cover',
      },
      buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
    });
    const inviteData = this.state.data1;
    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImage}
        source={require('../assets/images/slices/home_screen/cardBackground.png')}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Details', { data: inviteData });
          }}
        >
          <View style={styles.detailsContainer}>
            <Image source={require('../assets/images/slices/home_screen/profileImageTest.png')} />
            <View>
              <Text style={{ fontWeight: 'bold' }}>{this.state.data1.hostname}</Text>
              <Text>
                {this.state.data1.date}
                {' - '}
                {this.state.data1.time}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => this.rejectInviteUpdate()}>
            {this.state.data1.status !== 'rejected' ? (
              <Image source={require('../assets/images/slices/home_screen/Decline.png')} />
            ) : (
              <Text style={{ fontWeight: 'bold', color: 'red' }}> Declined </Text>
            )}
            {/* <Image source={require('../assets/images/slices/home_screen/Decline.png')} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.acceptInviteUpdate()}>
            {this.state.data1.status !== 'accepted' ? (
              <Image source={require('../assets/images/slices/home_screen/Accept.png')} />
            ) : (
              <Text style={{ fontWeight: 'bold', color: 'green' }}> Accepted </Text>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

export default withNavigation(InvitationCard);

// container: {
//   // width: '86%',
//   // height: '20%',
//   // // width: 315,
//   // // height: 133,
//   // backgroundColor: '#0FFF',
//   flex: 1,
//   borderColor: 'red',
// position: 'absolute',
// top: 0,
// left: 0,
// flex: 1,
// height: 105,
// },
