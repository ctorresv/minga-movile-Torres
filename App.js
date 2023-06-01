import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/pages/Home.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Mangas } from './src/pages/Mangas.jsx'
import SignUpForm from './src/pages/SignUpForm.jsx';
import { MangaDetails } from './src/pages/MangaDetails.jsx';
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Mangas" component={Mangas} />
          <Stack.Screen name="SignUp" component={SignUpForm} />
          <Stack.Screen name="MangaDetails" component={MangaDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

