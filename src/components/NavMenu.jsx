import React, { useCallback } from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const NavMenu = ({ navigation, setLogged, logged }) => {

  const [isExpanded, setIsExpanded] = useState(false)
  const [userData, setUserData] = useState(null);

  let getToken = async () => {
    try {
      let token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error);
      return null;
    }
  };


  const fetchUserData = async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        setUserData(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getHeaders = async () => {
    try {
      let token = await getToken();
      let headers = { headers: { 'Authorization': `Bearer ${token}` } };
      return headers;
    } catch (error) {
      console.log('Error al obtener las headers:', error);
      return null;
    }
  };

  const handleMenuPress = () => {
    setIsExpanded(!isExpanded)

  };

  const handleMenuPressMangas = () => {
    navigation.navigate('Mangas')
  }

  const handleSignOut = async () => {
    let headers = await getHeaders()
    axios.post(apiUrl + "auth/signout", null, headers)
      .then(res => {
        AsyncStorage.removeItem("token")
          .then(() => console.log('token eliminado'))
          .catch(err => console.log(err))
        AsyncStorage.removeItem("user")
          .then(() => console.log('user eliminado'))
          .catch(err => console.log(err))
        setLogged(false)
        //localStorage.removeItem("user")
      })
      .catch(err => alert(err))

  }

  if (logged) {
    fetchUserData()
  }

  return (
    <>
      <View style={styles.container} >
        <View style={styles.user}>
          <Image style={styles.photoUser} source={{ uri: userData?.photo }} />
          <Text style={styles.textU} >{userData?.email}</Text>
        </View>
        <TouchableOpacity style={[styles.button]} onPress={handleMenuPress}>
          <Feather name="menu" size={24} color="white" style={styles.icon} />
          <Text style={styles.text}>Menu</Text>
        </TouchableOpacity>

        {/* Botones adicionales en la pantalla completa */}
        {isExpanded && (
          <ImageBackground style={styles.fullscreen} source={require('../../assets/image/navMenuBack.jpg')}>
            <TouchableOpacity style={styles.fullscreenButton} onPress={handleMenuPress}>
              <Text style={styles.fullscreenButtonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullscreenButton} onPress={handleMenuPressMangas}>
              <Text style={styles.fullscreenButtonText}>Mangas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fullscreenButton} onPress={handleSignOut}>
              <Text style={styles.fullscreenButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 250, 150, 0.7)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textU: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  fullscreenButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: '70%',
  },
  fullscreenButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  container: {
    width: '90%',

    flexGrow: 0.6,
    justifyContent: 'space-around',
    padding: 20,
  },
  user: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
  },
  photoUser: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  }
});