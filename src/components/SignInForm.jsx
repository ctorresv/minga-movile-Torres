import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const SignInForm = ({ setLogged,}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const sendForm = () => {
    const emailValue = email;
    const passwordValue = password;


    let data = {
      email: emailValue,
      password: passwordValue
    };
    console.log('Cargando...')
    //setLogged(true)
    axios.post(apiUrl + 'auth/signin', data)
      .then((res) => {
        console.log('Entramos');
        AsyncStorage.setItem("token", res.data.token)
          .then(() => console.log('Guardado en el storage'))
          .catch(err => console.log(err))
        AsyncStorage.setItem("user", JSON.stringify(res.data.user))
        .then(() => console.log('Datos De usuario guardado'))
        .catch(err => console.log(err))
        //console.log(JSON.stringify(res, null, 2));
        setLogged(true)
      })
      .catch(err => {
        console.log(err);
        console.log('No entramos');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="white" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ffffffea"
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="white" style={styles.icon} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ffffffea"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={sendForm}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff1e',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: 270, // Ancho deseado
    height: 40, // Alto deseado
  },
  icon: {
    marginLeft: 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'System',
    color: '#ffffffea',
  },
  buttonContainer: {
    backgroundColor: 'rgba(13, 13, 125, 0.7)',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
