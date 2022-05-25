import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {
  Camera as CameraComponent,
  useCameraDevices,
} from 'react-native-vision-camera';

const CustomCamera = ({onGetLocation, onPlacePhoto}) => {
  const [camView, setCamView] = useState('front');

  const [image, setImage] = useState(null);

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

  const takePhoto = async () => {
    try {
      if (cameraRef.current == null) {
        console.log('Error taking photo');
      }
      const photo = await cameraRef.current.takePhoto(takePhotoOptions);
      setImage(photo.path);
      onPlacePhoto(photo.path);
      onGetLocation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};

export default CustomCamera;

const styles = StyleSheet.create({
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
