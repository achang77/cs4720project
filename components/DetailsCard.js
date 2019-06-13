/* eslint-disable global-require */
import React from 'react';
import {
  View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet,
} from 'react-native';

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        width: '92%',
        height: '35%',
        justifyContent: 'space-around',
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
        flexDirection: 'column',
        alignItems: 'center',
      },
    });

    console.log('>>>>>>>>>>>>>PROPS.DATA:', this.props.data);
    const userText = this.props.data.hostname === 'user' ? 'Your Event' : '';
    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImage}
        source={require('../assets/images/slices/details_screen/DetailsBackground.png')}
      >
        <View style={styles.detailsContainer}>
          <Image source={require('../assets/images/slices/details_screen/profilePicture.png')} />

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: '500' }}>{this.props.data.location}</Text>
            <Text>
              {userText}
              {' '}
            </Text>
            <Text>{this.props.data.date}</Text>
            <Text>
              {' '}
              {this.props.data.time}
            </Text>
          </View>

          <View>
            <Text style={{ fontWeight: '100' }}>
              {'Hosted by '}
              {this.props.data.hostname === 'user' ? 'You' : this.props.data.hostname}
            </Text>
          </View>
        </View>
        {this.props.data.hostname !== 'user' ? (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              {this.props.data.status !== 'rejected' ? (
                <Image source={require('../assets/images/slices/home_screen/Decline.png')} />
              ) : (
                <Text style={{ fontWeight: 'bold', color: 'red' }}> Declined </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.props.data.status !== 'accepted' ? (
                <Image source={require('../assets/images/slices/home_screen/Accept.png')} />
              ) : (
                <Text style={{ fontWeight: 'bold', color: 'green' }}> Accepted </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </ImageBackground>
    );
  }
}

export default DetailsCard;
