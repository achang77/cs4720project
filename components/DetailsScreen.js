import React from 'react';
import { View } from 'react-native';

import DetailsCard from './DetailsCard';
import MapScreen from './MapScreen';

class DetailsScreen extends React.Component {
  static navigationOptions;

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data', 'no data');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DetailsCard data={data} />
        <MapScreen dest={{ latitude: 37.795, longitude: -122.2 }} />
      </View>
    );
  }
}

export default DetailsScreen;
