import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ViewContainer } from '../../components/ViewContainer';
import { Loading } from '../../components/app-loadding';
import { FlatList, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ListDataCategory } from '../../assets/data/categories';
import Entypo from 'react-native-vector-icons/Entypo';
import { BtnDetails } from '../MovieDatailScreen';
import { ROUTER } from '../../constants/key';
import { getCategory, getListFilms } from '../../api/category';
import { URL_IMAGE } from '../../api/config';

const movies = {
  id: 'sadsdasd',
  poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/movie1.jpg',
  title: 'Popular on Netflix',
}

export function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState(false);

  // const listCategory = ListDataCategory || [];
  // console.log('listCategory', listCategory);
  // console.log('DataTestCategories[0].movies', ListDataCategory[0] || [])
  // const categories = ca
  // console.log(categories, 'categories');

  const clickMovie = (data) => {
    navigation.navigate(ROUTER.MOVIE_DETAIL, { data });
  }

  useEffect(() => {
    const getDataCategory = async () => {
      setLoading(true);
      try {
        const data = await getCategory();
        // console.log('data', data);
        setListCategory(data)
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false);
      }
    }

    getDataCategory();
  }, []);

  return (
    <ViewContainer>
      <View style={styles.container}>
        <FlatList
          data={listCategory}
          renderItem={({item}) => {
            return (
              <RenderPoster
                item={item}
                onPress={clickMovie}
              />
          )}}
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={() => clickMovie(movies)}
            >
              <View style={styles.banner}>
                {movies && <Image style={styles.imageBanner} source={{ uri: movies.poster}} />}
                <View style={styles.iconPlay}>
                  <Text style={styles.titleBanner}>{movies.title}</Text>

                  <BtnDetails
                    onClickBtn={() => console.log('Btn play')}
                    style={styles.playButton}
                    renderView={() => (
                      <Text style={styles.playButtonText}>
                        <Entypo name='controller-play' size={28} color="black" style={{paddingRight: 5}} />
                        {' '}
                        Phát
                      </Text>
                    )}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      </View>
      
      {loading && <Loading />}
    </ViewContainer>
  );
}

const RenderPoster = (props) => {
  const { item = {}, onPress = () => {} } = props;

  const [listFilm, setListFilm] = useState([]);
  // console.log('item', item)

  useEffect(() => {
    const getData = async (payload) => {
      try {
        const data = await getListFilms(payload);
        // console.log('getData-films', data);
        setListFilm(data);
      } catch (error) {
        console.log('error', error)
      }
    }

    if (item?.genre) {
      getData(item?.genre);
    }
  }, []);

  return (
    <View style={{marginTop: 24}}>
      <Text style={styles.title}>{item.genre}</Text>
      <View style={{marginBottom: 24}}>
        {
          listFilm.length > 0
            ? <FlatList
                data={listFilm}
                renderItem={({item}) => {
                  // console.log('item', item)
                  return (
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => onPress(item)}
                    >
                      <Image style={styles.imageCategory} source={{uri: `${URL_IMAGE}${item?.posterFilm}`}} />
                    </TouchableOpacity>
                  )
                }}
                horizontal
              />
            : <Text style={styles.textEmty}>{'<   Trống !!!   >'}</Text>
        }
      </View>
    </View>
  )
}
