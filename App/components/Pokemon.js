import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Pokemon = ({place, onSelect}) => {
  const {title, imageURI, address, location} = place;
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Image source={{uri: imageURI}} style={styles.image} />
      <Text>{title}</Text>
      <Text>{address}</Text>
      <Text>{location}</Text>
    </TouchableOpacity>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
