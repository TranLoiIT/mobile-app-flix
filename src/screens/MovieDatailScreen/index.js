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
import { COMMENT, SIMILAR_CONTENT, NUMBER_OF_SEASONS, TRAILER } from '../../constants/key';
import { Loading } from '../../components/app-loadding';

import {ActionMenu} from '../../components/action-menu'
import { RatingStar } from '../../components/rating-star';
import { AppInputText } from '../../components/app-inut-text';
import { Comment } from '../../components/comment';

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
  const [active, setActive] = useState(null);
  const [itemAcitve, setItemActive] = useState({});
  const [menu, setMenu] = useState([]);
  const [loading, setLoadding] = useState(false);
  
  const video = movie.seasons.episodes.items[0];

  useEffect(() => {
    setLoadding(true);

    // list menu
    const newMenu = [
      (movie?.numberOfSeasons > 0 && NUMBER_OF_SEASONS),
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

  const hanleActive = (data) => {
    const idx = menu.findIndex((item) => item.key === data.key);
    setActive(idx);
    setItemActive(menu[idx]);
  };

  return (
    <ViewContainer>
      {/* <Text style={{fontSize: 32, color: 'red'}}>Details Screen 123123</Text> */}
      <Image style={styles.image} source={{ uri: video.poster }} />

      {/* list film */}
      <ScrollView style={{marginBottom: 24}}>
        <View style={{padding: 12}}>
          <Text style={[styles.title, {color: COLORS.white}]}>{movie.title}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.match}>{movie?.match ? `khớp ${movie.match}%`: ''}</Text>
            <Text style={styles.year}>{movie.year}</Text>

            <View style={styles.ageContainer}>
              <Text style={styles.age}>{`${movie.age}+`}</Text>
            </View>
            <Text style={styles.year}>{movie?.numberOfSeasons ? `${movie.numberOfSeasons} tập` : movie.numberOfSeasons}</Text>
            <Icon name="hd" size={24} color="white" />

          </View>
          <BtnDetails
            onClickBtn={() => console.log('Btn play')}
            style={styles.playButton}
            renderView={() => (
              <Text style={styles.playButtonText}>
                <Entypo name='controller-play' size={16} color="black" style={{paddingRight: 5}} />
                {' '}
                Phát
              </Text>
            )}
          />

          <BtnDetails
            onClickBtn={() => console.log('Btn download')}
            style={styles.downloadButton}
            renderView={() => (
              <Text style={styles.downloadButtonText}>
                <AntDesign name='download' size={16} color="white" style={{paddingRight: 5}} />
                {' '}
                Tải xuống
              </Text>
            )}
          />

          <Text style={{ marginVertical: 10, color: COLORS.white }}>{movie.plot}</Text>
          <Text style={styles.year}>Diễn viên: {movie.cast}</Text>
          <Text style={styles.year}>Đạo diễn: {movie.creator}</Text>

          <View style={{flexDirection: 'row', marginTop: 20,}}>
              <View style={{alignItems: 'center', marginHorizontal: 20}}>
                <AntDesign name="plus" size={24} color={'white'} />
                <Text style={{color: 'darkgrey', marginTop: 5}}>Danh sách</Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 20}}>
                <Feather name="thumbs-up" size={24} color="white" />
                <Text style={{color: 'darkgrey', marginTop: 5}}>Xếp hạng</Text>
              </View>

              <View style={{alignItems: 'center', marginHorizontal: 20}}>
                <FontAwesome name="send-o" size={24} color="white" />
                <Text style={{color: 'darkgrey', marginTop: 5 }}>Chia sẻ</Text>
              </View>
          </View>
        </View>

        <View style={{marginTop: 12}}>
          <ActionMenu data={menu} indexActive={active} onPress={hanleActive} />
        </View>

        {
          (!loading && itemAcitve?.key === NUMBER_OF_SEASONS.key) &&
            (movie.seasons?.episodes?.items || []).map(
              (item, idx) => <EpisodeItem
                key={idx}
                episode={item}
                onPress={(item) => console.log('EpisodeItem', item)}
              />
            )
        }

        {
          itemAcitve?.key === SIMILAR_CONTENT.key && <Text style={{color: 'red'}}>{SIMILAR_CONTENT.name}</Text>
        }

        {
          itemAcitve?.key === COMMENT.key && <Comment data={movie?.reviews || []} />
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
  console.log('episode : ', episode);

  return (
    <Pressable style={{ margin: 10 }} onPress={() => onPress(episode)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', marginBottom: 5,}}>
          <Image
            style={{height: 75, aspectRatio: 16/9, resizeMode: 'cover', borderRadius: 3,}}
            source={{ uri: episode?.poster || ''}}
          />

          <View style={{flex: 1, padding: 5, justifyContent: 'center',}}>
              <Text style={{color: 'darkgrey'}}>{episode?.title || ''}</Text>
              <Text style={{color: 'darkgrey', fontSize: 10}}>{episode?.duration || ''}</Text>
          </View>

          <AntDesign name="download" size={24} color={'white'} />
      </View>

      <Text style={{color: 'darkgrey'}}>{episode?.plot || ''}</Text>
    </Pressable>
  )
};

export const BtnDetails = (props) => {
  const {onClickBtn, style, renderView} = props;

  return (
    <Pressable
      onPress={onClickBtn}
      style={style}
    >
      {renderView && renderView}
    </Pressable>
  );
};

export default MovieDatails;
