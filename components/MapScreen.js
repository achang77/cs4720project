/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { MapView } from 'expo';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const { Marker } = MapView;
// {
//   latitude: 40,
//   longitude: -122,
//   latitudeDelta: 1,
//   longitudeDelta: 1,
// },
// latitude: location.coords.latitude,
// longitude: location.coords.longitude,
// if (status !== 'granted') {
//   this.setState({
//     locationResult: 'Permission to access location was denied',
//   });
// } else {
//   this.setState({ hasLocationPermissions: true });
// }
class MapScreen extends React.Component {
  state = {
    region: null,
    hasLocationPermissions: false,
    locationResult: null,
    mymarker: null,
    destmarker: null,
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  // latitude: 40,
  // longitude: -122,
  // latitudeDelta: 1,
  // longitudeDelta: 1,
  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      hasLocationPermissions: status === 'granted',
      locationResult: status === 'granted' ? JSON.stringify(location) : 'permission not granted',
      region: {
        latitudeDelta: Math.abs(location.coords.latitude - this.props.dest.latitude) * 1.5,
        longitudeDelta: Math.abs(location.coords.longitude - this.props.dest.longitude) * 1.5,
        latitude: (location.coords.latitude + this.props.dest.latitude) / 2.0,
        longitude: (location.coords.longitude + this.props.dest.longitude) / 2.0,
      },
      mymarker: {
        latlng: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      },
      destmarker: {
        latlng: {
          latitude: this.props.dest.latitude,
          longitude: this.props.dest.longitude,
        },
      },
    });
  }

  handleMapRegionChange = (region) => {
    console.log('map region change called', region);
    this.setState(previousState => ({
      region,
      hasLocationPermissions: previousState.hasLocationPermissions,
      locationResult: previousState.locationResult,
      mymarker: previousState.mymarker,
      destmarker: previousState.destmarker,
    }));
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#ff1',
      },
      paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#308fff',
      },
      map: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        width: widthPercentageToDP('100%'),
        height: heightPercentageToDP('60%'),
      },
    });

    console.log(this.state);
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <Text>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text>Location permissions are not granted.</Text>
        ) : this.state.region === null ? (
          <Text>Map region does not exist.</Text>
        ) : (
          <MapView
            style={styles.map}
            region={this.state.region}
            onRegionChange={this.handleMapRegionChange}
          >
            <Marker coordinate={this.state.mymarker.latlng} />
            <Marker coordinate={this.state.destmarker.latlng} />
          </MapView>
        )}
      </View>
    );
  }
}
export default MapScreen;

//   <Text style={{ fontSize: 10 }}>
//   Location:
//   {this.state.locationResult}
// </Text>

// <Text>
//   Frame:
//   {this.state.mapRegion.latitudeDelta}
//   {this.state.mapRegion.longitudeDelta}
// </Text>

// {this.state.markers.map(marker => (
//   <Marker
//     coordinate={marker.latlng}
//     title={marker.title}
//     description={marker.description}
//   />
// ))}
