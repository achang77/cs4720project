/* eslint-disable global-require */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  View, Image, Text, AsyncStorage, FlatList, TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { format } from 'date-fns';
// import { withNavigation } from 'react-navigation';
import firebaseConfig from '../constants/firebaseConfig';
import InvitationCard from './InvitationCard';

// invite5: {
//   hostname: 'Alma B Evans',
//   date: 'Thursday 13 June',
//   time: '8:00 PM',
//   status: 'accepted',
//   location: 'Silver Kitchen, New Street',
//   id: 'invite5',
// },

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: 'DinDin',
  // };
  constructor(props) {
    super(props);
    this.state = {
      pending_invitations: null,
      // eslint-disable-next-line react/no-unused-state
      accepted_invitations: {
        invite4: {
          hostname: 'Alma A Evans',
          date: 'Monday 17 June',
          time: '8:00 PM',
          status: 'accepted',
          location: 'Silver Kitchen, New Street',
          id: 'invite4',
        },
        invite6: {
          hostname: 'user',
          date: 'Wednesday 19 June',
          time: '8:00 PM',
          status: 'accepted',
          location: 'Silver Kitchen, New Street',
          id: 'invite6',
        },
      },
    };
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    console.log('******Firebase initialized******');
    const db = firebase.firestore();
    db.collection('test-data')
      .doc('pending_invitations')
      .set({
        invite1: {
          hostname: 'Alma A Evans',
          date: 'Monday 17 June',
          time: '8:00 PM',
          status: 'pending',
          location: 'Silver Kitchen, New Street',
          id: 'invite1',
        },
        invite2: {
          hostname: 'Alma B Evans',
          date: 'Monday 17 June',
          time: '8:00 PM',
          status: 'pending',
          location: 'Silver Kitchen, New Street',
          id: 'invite2',
        },
        invite3: {
          hostname: 'Alma C Evans',
          date: 'Monday 17 June',
          time: '8:00 PM',
          status: 'pending',
          location: 'Silver Kitchen, New Street',
          id: 'invite3',
        },
      });
    this.getData();
  }

  async getData() {
    const db = firebase.firestore();
    db.collection('test-data')
      .doc('pending_invitations')
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          this.setState(previousState => ({
            pending_invitations: doc.data(),
            accepted_invitations: previousState.accepted_invitations,
          }));
          console.log('Document data:', doc.data());
          console.log('Accepted: ', this.state.accepted_invitations);
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
  }

  findNearInvites(j) {
    const accInvites = Object.keys(j).map(_ => j[_]);
    const today = new Date();
    let endday = new Date();
    endday = endday.setDate(endday.getDate() + 3);
    const itemsToRender = [];
    for (let d = today; d < endday; d.setDate(d.getDate() + 1)) {
      const dateString = format(d, 'dddd D MMMM');
      const results = accInvites.filter(obj => obj.date === dateString);
      if (results.length === 0) {
        itemsToRender.push({ key: dateString, info: 'create-event' });
      } else {
        itemsToRender.push({ key: dateString, info: results[0] });
      }
    }
    return itemsToRender;
  }

  // goToDetails(navigation, item) {
  //   console.log(item);
  //   navigation.navigate('Details', { data: item.info });
  // }

  renderItem = ({ item }) => {
    if (item.info.hostname === 'user') {
      return (
        <View
          style={{
            height: hp('15%'),
            width: wp('90'),
            justifyContent: 'center',
            alignItems: 'space-around',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Details', { data: item.info });
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.key}</Text>
            <Text>Your Event</Text>
            <Text>{item.info.time}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View
        style={{
          height: hp('15%'),
          width: wp('90'),
          justifyContent: 'center',
          alignItems: 'space-around',
        }}
      >
        {item.info === 'create-event' ? (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.key}</Text>
            <TouchableOpacity>
              <Image source={require('../assets/images/slices/home_screen/addnewevent.png')} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={{ fontWeight: 'bold' }}>{item.key}</Text>
            <Text>{item.info.hostname}</Text>
            <Text>{item.info.time}</Text>
          </View>
        )
        //
        }
      </View>
    );
  };

  renderCard({ item }) {
    return <InvitationCard data={item} />;
  }

  render() {
    if (this.state.pending_invitations === null) {
      return (
        <View>
          <Text> No data </Text>
        </View>
      );
    }
    const j = this.state.pending_invitations;
    const invites = Object.keys(j).map(_ => j[_]);
    const nearInvites = this.findNearInvites(this.state.accepted_invitations);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: hp('22%') }}>
          <Carousel
            ref={(c) => {
              this.carousel = c;
            }}
            data={invites}
            renderItem={this.renderCard}
            sliderWidth={wp('100%')}
            itemWidth={wp('90%')}
          />
        </View>

        <FlatList
          style={{ height: hp('50%'), width: wp('100%') }}
          data={nearInvites}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default HomeScreen;

// try {
//   const value = await AsyncStorage.getItem('userToken');
//   if (value !== null) {
//     this.setState({ token: value });
//     console.log('Successfully retrieved token: ', value);
//   }
//   console.log('userToken does not exist');
// } catch (error) {
//   console.log('Error no retrieve data');
// }
// firebase.auth().onAuthStateChanged((user) => {
//   if (user != null) {
//     console.log('******Firebase user is authenticated******');
//     this.props.firebaseUser = user;
//   }
// });
// const credential = await firebase.auth.FacebookAuthProvider.credential(this.state.token);
// await firebase.auth().signInWithCredential(credential);

// <View style={styles.podCastContainer}>
//   <Image style={styles.podImages} source={{ uri: item.row[0].image }} />
//   <Text style={styles.podCastTile}>{item.row[0].title}</Text>
// </View>
// <View style={styles.podCastContainer}>
//   <Image style={styles.podImages} source={{ uri: item.row[1].image }} />
//   <Text style={styles.podCastTile}>{item.row[0].title}</Text>
// </View>
