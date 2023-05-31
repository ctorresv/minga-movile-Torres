import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/Home.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Mangas } from './src/pages/Mangas.jsx'
import SignUpForm from './src/pages/SignUpForm.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mangas" component={Mangas} />
        <Stack.Screen name="SignUp" component={SignUpForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

