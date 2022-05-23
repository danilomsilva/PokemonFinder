import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Mascot = props => {
  return (
    <View style={styles.container}>
      <Text>Mascot</Text>
    </View>
  );
};

export default Mascot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
