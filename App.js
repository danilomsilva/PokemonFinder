import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, StatusBar} from 'react-native';

import Pokedex from './App/screens/Pokedex';
import CatchPokemon from './App/screens/CatchPokemon';
import {NavigationContainer} from '@react-navigation/native';
import Mascot from './App/screens/Mascot';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
            component={Pokedex}
            options={{
              title: 'Pokedex',
              tabBarIcon: () => (
                <Image
                  style={styles.tabIcon}
                  source={require('./App/assets/images/pokedex.png')}
                />
              ),
            }}
          />
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
            component={CatchPokemon}
            options={{
              title: 'Catch a new Pokemon',
              tabBarLabel: 'Catch!',
              tabBarIcon: () => (
                <Image
                  style={styles.tabIcon}
                  source={require('./App/assets/images/catch.png')}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
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
