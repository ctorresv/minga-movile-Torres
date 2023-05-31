import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const SearchHome = ({setLogged, navigation}) => {

  const handdleSignUpForm = () => {
    navigation.navigate('SignUp', {setLogged})
  }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handdleSignUpForm}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff2a',
    borderRadius: 5,
    marginTop: 4,
    padding: 2,
    flexDirection: 'row',
    height: 'auto',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    height: 50, 
  },
  buttonContainer: {

    borderRadius: 5,
    paddingVertical: 12,
    marginBottom: 10,
    width: 270, // Ancho deseado
    height: 50, // Alto deseado
    flex: 1,
    alignItems: 'center'
  },
});

