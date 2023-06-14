import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { ViewContainer } from '../../components/ViewContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COMMENT, SIMILAR_CONTENT, NUMBER_OF_SEASONS, ROUTER } from '../../constants/key';
import {ActionMenu} from '../../components/action-menu'
import { Comment } from '../../components/comment';
import VideoPlayer from '../../components/video-player';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getDetailFilm, reviewsFilm } from '../../api/films';
import { Loading } from '../../components/app-loadding';
import { URL_IMAGE } from '../../api/config';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';

const movie = {
  id: 'movie1',
  title: 'Suits',
  year: 2019,
  numberOfSeasons: 9,
  match: 89,
  age: 12,

  plot: 'When he impresses a big lawyer with his razor-sharp mind, a college droput scores a coveted associate job, even though he has no legal credentials.',
  cast: 'Gabriel Macht, Patrick J. Adams, Rick Hoggman',
  creator: 'Aaron Korsh',

  reviews: [
    {
      _id: "8e5a02e8-37f0-4359-a1df-d8cec4097a33",
      user: {
          _id: "641143b97d44faa63a79c23f",
          imageUser: "https://res.cloudinary.com/nghiemduong2000/image/upload/v1620266729/VMOflix%20Project/VMOflix%20-%20base/flat_1000x1000_075_f.u2_lnllya.webp",
          userName: "hahahahahaha",
          userEmail: "loitest@gmail.com"
      },
      rating: 5,
      comment: "333333333333333"
    },
    {
      _id: "a1620d9e-eecd-400d-9e3e-4bccd0d7a580",
      user: {
          _id: "641143b97d44faa63a79c23f",
          imageUser: "https://res.cloudinary.com/nghiemduong2000/image/upload/v1620266729/VMOflix%20Project/VMOflix%20-%20base/flat_1000x1000_075_f.u2_lnllya.webp",
          userName: "hahahahahaha",
          userEmail: "loitest@gmail.com"
      },
      rating: 4,
      comment: "asdasdasd"
    }
  ],
  
  seasons: {
    id: 'season1',
    name: 'Season 1',
    episodes: {
      items: [
          {
            id: 'episode1',
            title: '1. Pilot Part 1 & 2',
            poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
            duration: '1h 21m',
            plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
            video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        },
        {
            id: 'episode2',
            title: '2. Errors and Omissions',
            poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep1.jpg',
            duration: '43m',
            plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
            video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        },
        {
          id: 'episode3',
          title: '1. New season',
          poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep3.jpg',
          duration: '41m',
          plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
          video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        },
        {
            id: 'episode4',
            title: '2. Are you subscribed?',
            poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
            duration: '49m',
            plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
            video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }
      ]
    }
  },
  similarMovies: [
    {
      id: 'episode1',
      title: '1. Pilot Part 1 & 2',
      poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
      duration: '1h 21m',
      plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
      video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 'episode2',
      title: '2. Errors and Omissions',
      poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep1.jpg',
      duration: '43m',
      plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
      video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 'episode3',
      title: '1. New season',
      poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep3.jpg',
      duration: '41m',
      plot: 'When Harvey\'s promotion requires him to recruit and hire a graduate of Harvard Law, he chooses Mike Ross. But Mike doesn\'t actualy have a law degree',
      video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      id: 'episode4',
      title: '2. Are you subscribed?',
      poster: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/ep0.jpg',
      duration: '49m',
      plot: 'An open-and-shut case becomes anything but when Harvey is accused of an inappropriate dalliance with a married woman.',
      video: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    }
  ],
  related: [
    {
        actor: [
            "test"
        ],
        genre: [
            "Mystery",
            "Fantasy",
            "Phim tình cảm"
        ],
        reviews: [
            {
                _id: "ac66bcf2-48b7-440c-8a0d-2101fea47fdb",
                user: {
                    _id: "64250c0acf8d7c44d7a4ea21",
                    imageUser: "https://lh3.googleusercontent.com/a/AGNmyxa1WiAnw1uB6c2oUrJiMIt9chYb5H1pIIkwsEoT=s96-c",
                    userName: "Đại Lợi Trần",
                    userEmail: "loitd.nde19072@vtc.edu.vn"
                },
                rating: 1,
                comment: "ádasdasd"
            },
            {
                _id: "4b3c46e6-293d-4568-bda1-78a483737fd2",
                user: {
                    _id: "64250c0acf8d7c44d7a4ea21",
                    imageUser: "https://lh3.googleusercontent.com/a/AGNmyxa1WiAnw1uB6c2oUrJiMIt9chYb5H1pIIkwsEoT=s96-c",
                    userName: "Đại Lợi Trần",
                    userEmail: "loitd.nde19072@vtc.edu.vn"
                },
                rating: 5,
                comment: "ádasqweqưe"
            },
            {
                _id: "4120b1e0-ae23-4804-a56c-070c8abad6ab",
                user: {
                    _id: "64250c0acf8d7c44d7a4ea21",
                    imageUser: "https://lh3.googleusercontent.com/a/AGNmyxa1WiAnw1uB6c2oUrJiMIt9chYb5H1pIIkwsEoT=s96-c",
                    userName: "Đại Lợi Trần",
                    userEmail: "loitd.nde19072@vtc.edu.vn"
                },
                rating: 3,
                comment: "ádasdádádasdád"
            }
        ],
        softDelete: false,
        _id: "64115bb138439d07738bbaf3",
        title: "test",
        trailerURL: "https://www.youtube.com/watch?v=L0OSSNWXpgE",
        filmURL: "https://www.youtube.com/watch?v=L0OSSNWXpgE",
        description: "ưeqweqweqưeqưeqưeqưeqwe",
        posterFilm: "uploads/images/maxresdefault-1684117424730.png",
        bannerFilm: "uploads/images/338314990_4232580656966940_3960665246672473681_n-1684117427336.jpeg",
        titleSearch: "test phim",
        slug: "test",
        date: "2023-03-15T05:46:25.528Z",
    },
    {
        actor: [
            "1"
        ],
        genre: [
            "Mystery"
        ],
        reviews: [],
        softDelete: false,
        _id: "645674efd1ef847be8764e02",
        title: "1",
        trailerURL: "1",
        filmURL: "1",
        description: "1 1233123asdasd asdasda d ",
        posterFilm: "uploads/images/338314990_4232580656966940_3960665246672473681_n-1684117381889.jpeg",
        bannerFilm: "uploads/images/340520362_202597909157156_5231492421422187936_n-1684117072989.jpeg",
        titleSearch: "1",
        slug: "1",
        date: "2023-05-06T15:40:31.738Z",
    },
    {
        actor: [
            "434"
        ],
        genre: [
            "Mystery"
        ],
        reviews: [
            {
                _id: "8e5a02e8-37f0-4359-a1df-d8cec4097a33",
                user: {
                    _id: "641143b97d44faa63a79c23f",
                    imageUser: "https://res.cloudinary.com/nghiemduong2000/image/upload/v1620266729/VMOflix%20Project/VMOflix%20-%20base/flat_1000x1000_075_f.u2_lnllya.webp",
                    userName: "hahahahahaha",
                    userEmail: "loitest@gmail.com"
                },
                rating: 5,
                comment: "333333333333333"
            },
            {
                _id: "a1620d9e-eecd-400d-9e3e-4bccd0d7a580",
                user: {
                    _id: "641143b97d44faa63a79c23f",
                    imageUser: "https://res.cloudinary.com/nghiemduong2000/image/upload/v1620266729/VMOflix%20Project/VMOflix%20-%20base/flat_1000x1000_075_f.u2_lnllya.webp",
                    userName: "hahahahahaha",
                    userEmail: "loitest@gmail.com"
                },
                rating: 4,
                comment: "asdasdasd"
            }
        ],
        softDelete: false,
        _id: "6456785bd1ef847be8764e25",
        title: "434",
        trailerURL: "43",
        filmURL: "1",
        description: "323",
        posterFilm: "uploads/images/maxresdefault-1684117055371.png",
        bannerFilm: "uploads/images/maxresdefault-1684117057737.png",
        titleSearch: "434",
        slug: "434",
        date: "2023-05-06T15:55:07.598Z",
    }
]
};


const MovieDatails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const currentMovie = route.params.data;
  // console.log('currentMovie', currentMovie)
  const auth = useSelector(state => state.auth);
  // console.log('auth', auth)

  const [active, setActive] = useState(null);
  const [itemAcitve, setItemActive] = useState({});
  const [menu, setMenu] = useState([]);
  const [loading, setLoadding] = useState(false);
  const [dataDetails, setDataDetails] = useState({});
  const [listRelated, setListRelated] = useState([]);



  
  // const video = movie.seasons.episodes.items[0];

  useEffect(() => {
    setLoadding(true);

    // list menu
    const newMenu = [
      // (movie?.numberOfSeasons > 0 && NUMBER_OF_SEASONS),
      (movie?.similarMovies.length > 0 && SIMILAR_CONTENT),
      COMMENT
    ].filter(item => item?.key);

    try {
      // call api
      setMenu(newMenu);
      setItemActive(newMenu[0]);
      setActive(0)
    } catch (error) {
      console.log('error', error) 
    } finally {
      setLoadding(false);
    }
    
  }, []);

  useEffect(() => {
    // get data details
    const getDataFilm = async (slug) => {
      setLoadding(true);
      try {
        const data = await getDetailFilm(slug);
        console.log('data', data.related);
        setDataDetails(data?.film);
        setListRelated(data?.related);
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoadding(false);
      }
    }

    if (currentMovie?.slug) {
      getDataFilm(currentMovie.slug)
    }
  }, [currentMovie]);

  console.log('dataDetails', dataDetails);
  console.log('related', listRelated);

  const hanleActive = (data) => {
    const idx = menu.findIndex((item) => item.key === data.key);
    setActive(idx);
    setItemActive(menu[idx]);
  };

  const handleSendComment = async (commet) => {
    setLoadding(true)
    try {
      const slug = dataDetails?.slug || '';
      const currentReviews = dataDetails?.reviews || '';
      // console.log('reviews', currentReviews);
      // console.log('slug', slug);
      const id = uuid.v4();
      // console.log('id', id);

      const  newReviews = {
        _id: id,
        user: {
          _id: auth._id,
          imageUser: auth?.imageUser,
          userName: auth?.userName,
          userEmail: auth?.userEmail,
        },
        ...commet,
      };
      // console.log('newReviews', newReviews)

      const data = await reviewsFilm(slug, {reviews: [newReviews, ...currentReviews]});
      // console.log('data', data);
      setDataDetails({
        ...dataDetails,
        reviews: data.reviews
      });

    } catch (error) {
      console.log('error', error)
    } finally {
      setLoadding(false);
    }
  }

  const handleSelectMovie = (data) => {
    // console.log('data', data)
    navigation.navigate(ROUTER.MOVIE_DETAIL, { data });
  }

  return (
    <ViewContainer>
      <VideoPlayer poster={currentMovie.bannerFilm} />

      {/* list film */}
      <ScrollView style={{marginBottom: 24}}>
        <View style={{padding: 12}}>
          <Text style={[styles.title, {color: COLORS.white}]}>{dataDetails?.title || ""}</Text>
          <Text style={{ marginVertical: 10, color: COLORS.white }}>{dataDetails?.description || ""}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.year}>Diễn viên: </Text>
            {
              (dataDetails?.actor || []).map((item, idx) =>
                <Text key={idx} style={styles.year}>{`${item}${dataDetails.actor.length - 1 < idx ? ', ': ''}`}</Text>
              )
            }
          </View>
        </View>

        <View style={{marginTop: 12}}>
          <ActionMenu data={menu} indexActive={active} onPress={hanleActive} />
        </View>

        {
          itemAcitve?.key === SIMILAR_CONTENT.key &&
            (listRelated || []).map(
              (item, idx) => <EpisodeItem
                key={idx}
                episode={item}
                onPress={(item) => handleSelectMovie(item)}
              />
            )
        }

        {
          itemAcitve?.key === COMMENT.key &&
            <Comment data={dataDetails?.reviews || []} sendComment={handleSendComment} />
        }
      </ScrollView>

      {
        loading && <Loading />
      }
    </ViewContainer>
  )
};

const EpisodeItem = (props) => {
  const { episode, onPress } = props;

  return (
    <Pressable style={{ margin: 10 }} onPress={() => onPress(episode)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', marginBottom: 5,}}>
          <Image
            style={{height: 75, aspectRatio: 16/9, resizeMode: 'cover', borderRadius: 3,}}
            source={{ uri: `${URL_IMAGE}${episode?.posterFilm}`}}
          />

          <View style={{flex: 1, padding: 5, justifyContent: 'center',}}>
              <Text style={{color: 'darkgrey'}}>{episode?.title || ''}</Text>
              <Text style={{color: 'darkgrey', fontSize: 10}}>{episode?.description || ''}</Text>
          </View>
      </View>
    </Pressable>
  )
};

export const BtnDetails = (props) => {
  const {onClickBtn, style,disabled , renderView = () => {}} = props;

  return (
    <TouchableOpacity disabled={disabled} onPress={onClickBtn} style={style}>
      {renderView()}
    </TouchableOpacity>
  );
};

export default MovieDatails;
