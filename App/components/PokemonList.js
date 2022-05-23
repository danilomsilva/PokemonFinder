import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import Pokemon from './Pokemon';

const PokemonList = ({pokemons}) => {
  if (!pokemons || pokemons.length === 0) {
    return (
      <View style={styles.noData}>
        <Text style={styles.noDataText}>Ops, your Pokedex is empty!</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={pokemons}
      keyExtractor={item => item.id}
      renderItem={({item}) => <Pokemon place={item} />}
    />
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
