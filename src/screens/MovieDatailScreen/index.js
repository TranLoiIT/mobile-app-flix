import React, { useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import { ViewContainer } from '../../components/ViewContainer';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ActionMenu from '../../components/action-menu';
import { COMMENT, SIMILAR_CONTENTCONTENT, NUMBER_OF_SEASONS, TRAILER } from '../../constants/key';

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
  ]
};


const MovieDatails = () => {
  const [active, setActive] = useState(0);
  
  const video = movie.seasons.episodes.items[0];
  // const menu = [];
  const menu = [
    (movie?.numberOfSeasons > 0 && NUMBER_OF_SEASONS),
    (movie?.similarMovies.length > 0 && SIMILAR_CONTENTCONTENT),
    (movie?.trailer > 0 && TRAILER),
    COMMENT
  ].filter(item => item?.key);
  console.log('menu', menu)
  
  const hanleActive = (data) => {
    console.log(data);
    console.log(menu);
    const idx = menu.findIndex((item) => item.key === data.key);
    setActive(idx)
    console.log(idx, 'idx');
  }


  return (
    <ViewContainer>
      {/* <Text style={{fontSize: 32, color: 'red'}}>Details Screen 123123</Text> */}
      <Image style={styles.image} source={{ uri: video.poster }} />

      
      
      {/* list film */}
      <FlatList
        data={movie.seasons.episodes.items}
        renderItem={({ item: episode }) => (
          <EpisodeItem
            episode={episode}
            onPress={(data) => console.log('EpisodeItem', data)}
          />
        )}
        ListHeaderComponent={() => (
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
            {/* Btn play */}
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

            {/* Btn download */}
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

            {/* Row with icon buttons */}
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

            {
              menu?.length > 0 &&
                <ActionMenu data={menu} indexActive={active} onPress={hanleActive} />
            }

          </View>
        )}
      />

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
            source={{ uri: episode.poster}}
          />

          <View style={{flex: 1, padding: 5, justifyContent: 'center',}}>
              <Text style={{color: 'darkgrey'}}>{episode.title}</Text>
              <Text style={{color: 'darkgrey', fontSize: 10}}>{episode.duration}</Text>
          </View>

          <AntDesign name="download" size={24} color={'white'} />
      </View>

      <Text style={{color: 'darkgrey'}}>{episode.plot}</Text>
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
