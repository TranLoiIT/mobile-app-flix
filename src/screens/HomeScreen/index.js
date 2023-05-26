import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ViewContainer } from '../../components/ViewContainer';
import { Loading } from '../../components/app-loadding';
import { FlatList, Image, Text, View, Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ListDataCategory } from '../../assets/data/categories';
import Entypo from 'react-native-vector-icons/Entypo';
import { BtnDetails } from '../MovieDatailScreen';
import { ROUTER } from '../../constants/key';
const movies = {
  id: 'sadsdasd',
  poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/movie1.jpg',
  title: 'Popular on Netflix',
}

export function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const listCategory = ListDataCategory || [];
  console.log('listCategory', listCategory);
  console.log('DataTestCategories[0].movies', ListDataCategory[0])
  // const categories = ca
  // console.log(categories, 'categories');

  const clickMovie = (data) => {
    console.log('data-choseMovie', data)
    navigation.navigate(ROUTER.MOVIE_DETAIL);
  }

  return (
    <ViewContainer>
      <View style={styles.container}>
        <FlatList
          data={ListDataCategory}
          renderItem={({item}) => {
            return (
              <RenderPoster
                listPoster={item.movies}
                title={item.title}
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
  const { listPoster = [], title = '', onPress = () => {} } = props
  return (
    <View style={{marginTop: 24}}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={listPoster}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
            >
              <Image style={styles.imageCategory} source={{uri: item.poster}} />
            </TouchableOpacity>
          )
        }}
        horizontal
      />
    </View>
  )
}
