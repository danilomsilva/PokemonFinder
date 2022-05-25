import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Button,
} from 'react-native';

import CustomCamera from '../components/Camera';
import Map from '../components/Map';

import RNLocation from 'react-native-location';

const CatchPokemon = ({onAddPokemon}) => {
  const [pokemonName, setPokemonName] = useState('');
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);

  const permissionHandle = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
      },
    });
    permission = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'coarse',
        rationale: {
          title: 'Title 1',
          message: 'Message 1',
          buttonPositive: 'Ok 1',
          buttonNegative: 'Cancel 1',
        },
      },
    });

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
          rationale: {
            title: 'Title 2',
            message: 'Message 2',
            buttonPositive: 'OK 2',
            buttonNegative: 'Cancel 2',
          },
        },
      });
      setLocation(await RNLocation.getLatestLocation({timeout: 100}));
    } else {
      setLocation(await RNLocation.getLatestLocation({timeout: 100}));
    }
  };

  const handlePokemonName = text => {
    setPokemonName(text);
  };

  const handleSavePokemon = () => {
    if (!pokemonName || !location) {
      return null;
    }

    const pokemon = {
      name: pokemonName,
      location: {latitude: location.latitude, longitude: location.longitude},
      image: image,
    };
    onAddPokemon(pokemon);
  };

  const handlePlacePhoto = url => {
    console.log(url, 'url');
    setImage(url);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.hint}>
          <Image
            style={styles.hintImage}
            source={require('../assets/images/hint.png')}
          />
          <Text style={styles.hintText}>
            Enter the Pokemon name, picture and location to add it to your
            Pokedex.
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Pokemon name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={handlePokemonName}
          value={pokemonName}
        />
      </View>
      <CustomCamera
        onPlacePhoto={handlePlacePhoto}
        onGetLocation={permissionHandle}
      />
      <Map location={location} />
      <View style={styles.saveContainer}>
        <Pressable style={styles.saveButton} onPress={handleSavePokemon}>
          <Text style={styles.saveText}>Save it to Pokedex</Text>
          <Image
            style={styles.saveIcon}
            source={require('../assets/images/pokedex.png')}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default CatchPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintImage: {
    width: 40,
    height: 40,
  },
  hintText: {
    marginLeft: 10,
    marginRight: 10,
    width: '85%',
    color: '#000',
  },
  textInput: {
    width: '100%',
    height: 60,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 18,
    color: '#000',
  },
  form: {
    padding: 20,
  },
  label: {
    color: '#000',
  },
  geolocation: {
    marginTop: 20,
    marginHorizontal: 50,
    marginBottom: 20,
  },
  saveContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButton: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d5d5d5',
    borderWidth: 2,
  },
  saveText: {
    color: '#000',
    fontSize: 20,
  },
  saveIcon: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});
