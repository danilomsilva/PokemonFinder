import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './App/store/redux/store';

import Pokedex from './App/screens/Pokedex';
import CatchPokemon from './App/screens/CatchPokemon';
import {NavigationContainer} from '@react-navigation/native';
import Mascot from './App/screens/Mascot';

const Tab = createBottomTabNavigator();

const pokemons = [
  {
    id: 1,
    name: 'Bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    location: {
      latitude: -23.56488,
      longitude: -46.63818,
    },
  },
  {
    id: 2,
    name: 'Ivysaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    location: {
      latitude: -23.56488,
      longitude: -46.63818,
    },
  },
  {
    id: 3,
    name: 'Venusaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    location: {
      latitude: -23.56488,
      longitude: -46.63818,
    },
  },
  {
    id: 4,
    name: 'Charmander',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    location: {
      latitude: -23.56488,
      longitude: -46.63818,
    },
  },
  {
    id: 5,
    name: 'Charmeleon',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
    location: {
      latitude: -23.56488,
      longitude: -46.63818,
    },
  },
];

const handleAddPokemon = pokemon => {
  pokemons.push({
    id: pokemons.length + 1,
    name: pokemon.name,
    image: pokemon.image,
    location: {
      latitude: pokemon.location.latitude,
      longitude: pokemon.location.longitude,
    },
  });
};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="CatchPokemon" // temporary
            screenOptions={{
              tabBarActiveBackgroundColor: '#f5f5f5',
              tabBarHideOnKeyboard: true,
              tabBarLabelStyle: {
                color: '#000',
              },
              headerStyle: {
                backgroundColor: '#f5f5f5',
              },
              headerTitleAlign: 'center',
            }}>
            <Tab.Screen
              name="Pokedex"
              options={{
                title: 'Pokedex',
                tabBarIcon: () => (
                  <Image
                    style={styles.tabIcon}
                    source={require('./App/assets/images/pokedex.png')}
                  />
                ),
              }}>
              {() => <Pokedex pokemons={pokemons} />}
            </Tab.Screen>
            <Tab.Screen
              name="Mascot"
              component={Mascot}
              options={{
                title: 'Mascot',
                tabBarIcon: () => (
                  <Image
                    style={styles.tabIcon}
                    source={require('./App/assets/images/mascot.png')}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="CatchPokemon"
              options={{
                title: 'Catch a new Pokemon',
                tabBarLabel: 'Catch!',
                tabBarIcon: () => (
                  <Image
                    style={styles.tabIcon}
                    source={require('./App/assets/images/catch.png')}
                  />
                ),
              }}>
              {() => <CatchPokemon onAddPokemon={handleAddPokemon} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
