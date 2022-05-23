import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const CatchPokemon = props => {
  const [pokemonName, setPokemonName] = useState('');

  const devices = useCameraDevices();
  const device = devices.front;

  const grantCameraPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log(cameraPermission, 'cameraPermission');
  };

  useEffect(() => {
    grantCameraPermission();
  }, []);

  const handlePokemonName = text => {
    setPokemonName(text);
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
      <View>
        {device == null ? (
          <View style={styles.noCamera}>
            <Text>No camera found!</Text>
          </View>
        ) : (
          <Camera style={styles.camera} device={device} isActive={true} />
        )}
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
  camera: {
    width: '100%',
    height: 600,
  },
  noCamera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
