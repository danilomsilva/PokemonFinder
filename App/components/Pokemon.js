import React from 'react';
import {Pressable, View, Text, StyleSheet, Image} from 'react-native';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {starItem, removeItem} from '../store/redux/favourites';

import Map from './Map';

const Pokemon = ({pokemon}) => {
  const {name, image, location} = pokemon;

  const favouriteNames = useSelector(state => state.favouritesItems.names);
  const dispatch = useDispatch();

  const isStared = favouriteNames.includes(name);

  const handleStarPokemon = () => {
    if (isStared) {
      dispatch(removeItem(name));
    } else {
      dispatch(starItem(name));
    }
  };

  return (
    <View style={styles.container}>
      <List.Accordion
        style={styles.list}
        title={
          <View style={styles.pokemon}>
            <Image
              style={styles.image}
              source={
                image.startsWith('/') ? {uri: `file://${image}`} : {uri: image}
              }
            />
            <Text style={styles.name}>{name}</Text>
          </View>
        }>
        <View style={styles.details}>
          <View style={styles.detailsHeader}>
            <Text style={styles.detailsTitle}>Location:</Text>
            <Pressable
              style={styles.detailsStarButton}
              onPress={handleStarPokemon}>
              <Image
                source={
                  isStared
                    ? require('../assets/images/star-contained.png')
                    : require('../assets/images/star-outlined.png')
                }
                style={styles.detailsIcon}
              />
            </Pressable>
          </View>
          <Map location={location} />
        </View>
      </List.Accordion>
    </View>
  );
};

export default Pokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pokemon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 90,
  },
  name: {
    fontSize: 16,
  },
  details: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    transform: [{translate: [20, 20]}],
  },
  detailsHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsIcon: {
    width: 40,
    height: 40,
  },
  detailsStarButton: {
    width: 20,
    height: 20,
    marginRight: 40,
  },
});
