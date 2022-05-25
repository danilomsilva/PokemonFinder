import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Map = ({location}) => {
  const latitude = location?.latitude ? location.latitude : 37.78825;
  const longitude = location?.longitude ? location.longitude : -122.4324;
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <MapView.Marker
          coordinate={{latitude, longitude}}
          title={'title'}
          description={'description'}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 300,
    margin: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: 300,
  },
});
