import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PokemonList from '../components/PokemonList';

const Pokedex = props => {
  return (
    <View style={styles.container}>
      <PokemonList />
    </View>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
