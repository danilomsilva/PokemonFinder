import React, {useContext, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {removeItem} from '../store/redux/favourites';

const StaredScreen = () => {
  const dispatch = useDispatch();
  const names = useSelector(state => state.favouritesItems.names);

  return names.length > 0 ? (
    <FlatList
      data={names}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <View>
            <TouchableOpacity
              style={styles.starPosition}
              onPress={() => dispatch(removeItem(item))}>
              <Image
                source={require('../assets/images/star-contained.png')}
                style={styles.star}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  ) : (
    <View style={styles.noItemsView}>
      <Text style={styles.noItems}>Ops! No stared items yet.</Text>
    </View>
  );
};

export default StaredScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ccc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 18,
  },
  noItems: {
    fontSize: 18,
    textAlign: 'center',
  },
  noItemsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  star: {
    height: 25,
    width: 25,
  },
});
