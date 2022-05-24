import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import {
  Camera as CameraComponent,
  useCameraDevices,
  TakePhotoOptions,
  TakeSnapshotOptions,
} from 'react-native-vision-camera';

const CatchPokemon = props => {
  const [pokemonName, setPokemonName] = useState('');
  const [camView, setCamView] = useState('front');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  console.log(image);

  const devices = useCameraDevices();
  const device = camView === 'back' ? devices.back : devices.front;
  const cameraRef = useRef(CameraComponent);

  const takePhotoOptions = {
    photoCodec: 'jpeg',
    qualityPrioritization: 'speed',
    quality: 70,
    skipMetadata: true,
  };

  const getCameraPermission = async () => {
    await CameraComponent.getCameraPermissionStatus();
    await CameraComponent.requestCameraPermission();
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  const handlePokemonName = text => {
    setPokemonName(text);
  };

  const takePhoto = async () => {
    setLoading(true);
    try {
      if (cameraRef.current == null) {
        console.log('erro taking photo');
      }
      console.log('Photo taking ....');
      const photo = await cameraRef.current.takePhoto(takePhotoOptions);
      console.log(photo);
      setImage(photo.path);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
        ) : image ? (
          <View style={styles.cameraFrame}>
            <Image
              source={{
                uri: `file://${image}`,
              }}
              style={styles.image}
            />
            <View style={styles.buttonPosition}>
              <Pressable onPress={() => setImage(null)}>
                <Image source={require('../assets/images/catch.png')} />
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.cameraFrame}>
              <CameraComponent
                style={styles.camera}
                device={device}
                ref={cameraRef}
                photo={true}
                isActive={true}
              />
            </View>
            <View style={styles.buttonPosition}>
              <Pressable onPress={() => takePhoto()}>
                <Image source={require('../assets/images/catch.png')} />
              </Pressable>
              <Pressable
                style={styles.switchBtnPosition}
                // disabled={!isActive}
                onPress={() => {
                  camView === 'back' ? setCamView('front') : setCamView('back');
                }}>
                <Image
                  style={styles.switchBtn}
                  source={require('../assets/images/turnCamera.png')}
                />
              </Pressable>
            </View>
          </>
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
  cameraFrame: {
    width: '90%',
    height: 400,
    marginHorizontal: 20,
    overflow: 'hidden',
    borderRadius: 20,
  },
  camera: {
    width: '100%',
    height: 400,
  },
  noCamera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 60,
    width: 60,
  },
  image: {
    width: '100%',
    height: 500,
  },
  switchBtnPosition: {
    position: 'absolute',
    bottom: 20,
    right: 45,
  },
  switchBtn: {
    width: 40,
    height: 40,
  },
});
