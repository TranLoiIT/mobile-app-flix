import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ViewContainer } from '../../components/ViewContainer';
import { Loading } from '../../components/app-loadding';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { BtnDetails } from '../MovieDatailScreen';
import { ROUTER } from '../../constants/key';
import { getCategory, getListFilms } from '../../api/category';
import { URL_IMAGE } from '../../api/config';
import { getFilms } from '../../api/films';

export function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [listCategory, setListCategory] = useState(false);
  const [banner, setBanner] = useState({});

  const clickMovie = (data) => {
    navigation.navigate(ROUTER.MOVIE_DETAIL, { slug: data });
  }

  useEffect(() => {
    const getDataCategory = async () => {
      setLoading(true);
      try {
        const data = await getCategory();
        const filmsBanner = await getFilms();
        setBanner(filmsBanner[0])
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
              onPress={() => clickMovie(banner?.slug)}
            >
              <View style={styles.banner}>
                {banner?.poster && <Image style={styles.imageBanner} source={{ uri: `${URL_IMAGE}${banner.poster}`}} />}
                <View style={styles.iconPlay}>
                  <Text ellipsizeMode='tail' numberOfLines={1} style={styles.titleBanner}>{banner?.title}</Text>

                  <BtnDetails
                    onClickBtn={() => clickMovie(banner?.slug)}
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

  useEffect(() => {
    const getData = async (payload) => {
      try {
        const data = await getListFilms(payload);
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
                  console.log('item', item)
                  return (
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => onPress(item?.slug)}
                    >
                      <Image style={styles.imageCategory} source={{uri: `${URL_IMAGE}${item?.poster}`}} />
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
