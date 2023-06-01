import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, Text, ImageBackground, View, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Constants from 'expo-constants';
const apiUrl = Constants.manifest.extra.apiUrl || 'http://localhost:8000/';

export const MangaDetails = ({ navigation, route }) => {
  const { cover_photo, title, description } = useSelector(store => store.inputManga)
  const [id, setId] = useState('')
  const [mangas, setMangas] = useState([])
  const [page, setPage] = useState(1)
  const [chapter, setChapters] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [mangaLoading, setMangaLoading] = useState(true)


  useEffect(() => {
    setId(route.params?._id);
  }, []);

  useEffect(
    () => {
      if (id) {
        axios(apiUrl + `chapters/get?manga_id=${id}&title=&page=${page}`)
          .then(res => {
            const chapters = res.data.response
            setChapters((prevChapter) => [...prevChapter, ...chapters]);
            if (chapters.length === 0) {
              setHasMore(false);
            }
            console.log('Axios chapters Ejcutado')
          })
          .catch(err => console.log(err))

      }
      setIsLoading(false);
    },
    [id, page]
  )

  const handleEndReached = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };


  return (

    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: cover_photo }}
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.searchContainer}>
              <AntDesign name="search1" size={20} color="gray" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar"
              /* value={searchManga} */
              /* onChangeText={setSearchManga} */
              />
            </View>
          </View>
        </ImageBackground>
      </View>

      <ImageBackground style={styles.scrollContainer} source={require('../../assets/image/paisaje.jpg')}>
        <ScrollView onScrollEndDrag={handleEndReached} >
          <View style={styles.cardsContainer}>
            {chapter.map((card) => (
              <View key={card?._id} style={styles.card}>
                <ImageBackground source={{ uri: card?.cover_photo }} style={styles.backgroundImage}>
                  <View style={styles.overlay}>
                    <Text style={styles.cardTitle}>{card.title}</Text>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>

    </View>
  )
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
    height: 200,
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
    fontFamily: '',
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