import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, Text, ImageBackground, View, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import mangasActions from '../../redux/actions/mangas'

const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const Mangas = ({ navigation }) => {
  const { readOneManga } = mangasActions
  const dispatch = useDispatch()
  const [headers, setHeaders] = useState()
  const [headersLoaded, setHeadersLoaded] = useState(false)
  const [mangas, setMangas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)

  let getToken = async () => {
    console.log('cargando token')
    try {
      let token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.log('Error al obtener el token:', error);
      return null;
    }
  };

  let getHeaders = async () => {
    console.log('cargando Header')
    try {
      let token = await getToken();
      let headers = { headers: { 'Authorization': `Bearer ${token}` } };
      return headers;
    } catch (error) {
      console.log('Error al obtener las headers:', error);
      return null;
    }
  };

  useEffect(() => {
    const loadHeaders = async () => {
      let headers = await getHeaders();
      setHeaders(headers)
      setHeadersLoaded(true)
      console.log(headers)
    }
    loadHeaders()
  }, [])

  const [searchManga, setSearchManga] = useState('')

  useEffect(() => {
    console.log('Effect del axios')
    if (headersLoaded) {
      console.log('Axios en ejecución');
      axios(apiUrl + `mangas/?title=&category_id=&author_id=&limit=&page=${page}`, headers)
        .then(res => {

          //console.log(JSON.stringify(res.data.response, null, 2));
          const newMangas = res.data.response
          setMangas((prevMangas) => [...prevMangas, ...newMangas]);
          if (newMangas.length === 0) {
            setHasMore(false);
          }
          console.log('Axios ejecutado');
        })
        .catch(err => console.log(err))
    }
    setIsLoading(false);
  }, [headersLoaded, page]);

  const handleEndReached = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const mangaDetails = (_id, title, cover_photo, description) => {
    navigation.navigate('MangaDetails', { _id })
    dispatch(readOneManga({
      cover_photo,
      title,
      _id,
      description
    }))
    console.log(_id)
  }

  console.log(mangas.length)

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('../../assets/image/mangas.webp')}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Mangas</Text>
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar"
                value={searchManga}
                onChangeText={setSearchManga}
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <ImageBackground style={styles.scrollContainer} source={require('../../assets/image/paisaje.jpg')}>
        <ScrollView onScrollEndDrag={handleEndReached} >
          <View style={styles.cardsContainer}>
            {mangas.map((card) => (
              <View key={card?._id} style={styles.card}>
                <ImageBackground source={{ uri: card?.cover_photo }} style={styles.backgroundImage}>
                  <View style={styles.overlay}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                    <Text style={styles.cardDescription}>{card.description}</Text>
                    <View style={styles.backB}>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => mangaDetails(card._id, card.title, card?.cover_photo, card.description)}>
                        <Text style={styles.buttonText}>Details</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
  },
  searchInput: {
    flex: 1,
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    width: '75%',
  },
  searchIcon: {
    marginRight: 10,
  },
  scrollContainer: {
    marginTop: 200,
    flex: 1,
  },
  cardsContainer: {
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    height: 500,
    width: '100%',
    overflow: 'hidden',
  },
  cardsRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
  },
  cardDescription: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
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
  backB: {
    backgroundColor: 'rgba(50, 10, 170, 0.7)',
    textAlign: 'center',
    height: 50,
    borderRadius: 10,
  }
})