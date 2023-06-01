import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios from 'axios';
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

const SignUpForm = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('');
  const setLogged = route.params?.setLogged || (() => { });

  const handleSignUp = () => {
    console.log('Nombre:', name);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Foto:', photo);

    let dataUserRegister = {
      name: name,
      email: email,
      photo: photo,
      password: password,
      notifications: true
    };

    let dataUser = {
      email: email,
      password: password
    };
    console.log('Cargando...')
    axios
      .post(apiUrl + "auth/signup", dataUserRegister)
      .then((res) => {
        console.log('Registro exitoso')
        AsyncStorage.setItem("user", JSON.stringify(res.data.user))
          .then(() => console.log('Datos De usuario guardado'))
          .catch(err => console.log(err))
        axios
          .post(apiUrl + "auth/signin", dataUser)
          .then((res) => {
            console.log('Entramos');
            AsyncStorage.setItem("token", res.data.token)
              .then(() => console.log('Guardado en el storage'))
              .catch(err => console.log(err))
            setLogged(true)
            navigation.navigate('Home')
            //localStorage.setItem("user", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            console.log(err)
          });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/form.webp')}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Photo"
            value={photo}
            onChangeText={setPhoto}
          />
          <View style={styles.backB}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 10,
    width: 270, // Ancho deseado
    height: 0, // Alto deseado
    flex: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
  },
  backB: {
    backgroundColor: 'rgba(0, 170, 50, 0.7)',
    textAlign: 'center',
    height: 50,
    borderRadius: 10,
  }
});

export default SignUpForm;
