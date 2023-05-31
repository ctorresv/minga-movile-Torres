import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Image } from 'react-native';
import { SearchHome } from '../components/SearchHome';
import { SignInForm } from '../components/SignInForm';
import { NavMenu } from '../components/NavMenu';

export const Home = ({ navigation }) => {

  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState('');
  const [photo, setPhoto] = useState('')

  const updateLogged = (value) => {
    setLogged(value);
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={require('../../assets/image/coverAnime.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Image
              source={require('../../assets/image/Logo.png')}
              style={styles.logo}
            />
            {!logged ? (
              <>
                <Text style={styles.h1}>Your favourite manga reader 😏</Text>
                <Text style={styles.text}>is an exceptional app for all manga lovers. With a wide range of titles available, from classics to the latest releases, this app is perfect for those who want to read manga anytime, anywhere.</Text>
                <SearchHome navigation={navigation} setLogged={updateLogged} />
                <SignInForm setLogged={setLogged} />
              </>
            ) : (
              <NavMenu  navigation={navigation} setLogged={setLogged} logged={logged}/>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scrollViewContent: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  h1: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  logo: {
    width: '90%',
    padding: 3,
    height: 170,
    marginBottom: 30,
    paddingBottom: 5,
  }
});
