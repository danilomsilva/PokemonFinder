import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PokemonList from '../components/PokemonList';

const Pokedex = ({pokemons}) => {
  return (
    <View style={styles.container}>
      <PokemonList pokemons={pokemons} />
    </View>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
