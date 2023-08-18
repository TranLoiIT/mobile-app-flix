import React, { useEffect, useState } from 'react';
import {Image, Pressable, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { ViewContainer } from '../../components/ViewContainer';
import styles from './styles';
import { COLORS } from '../../constants/colors';
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

const MovieDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const slug = route.params.slug;
  const auth = useSelector(state => state.auth);
  const [active, setActive] = useState(null);
  const [itemActive, setItemActive] = useState({});
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDetails, setDataDetails] = useState({});
  const [listRelated, setListRelated] = useState([]);
  const [currentFilm, setCurrentFilm] = useState({});

  const handleActive = (data) => {
    const idx = menu.findIndex((item) => item.key === data.key);
    setActive(idx);
    setItemActive(menu[idx]);
  };

  const handleSendComment = async (comment) => {
    setLoading(true)
    try {
      const id = dataDetails?._id || '';
      const newId = uuid.v4();
      const currentReviews = dataDetails?.reviews || '';

      const newReviews = {
        _id: newId,
        user: {
          _id: auth._id,
          imageUser: auth?.imageUser,
          userName: auth?.userName,
          userEmail: auth?.userEmail,
        },
        ...comment,
      };

      const data = await reviewsFilm(id, {reviews: [newReviews, ...currentReviews]});
      setDataDetails({
        ...dataDetails,
        reviews: data.reviews
      });

    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }

  const handleSelectMovie = (data) => {
    navigation.navigate(ROUTER.MOVIE_DETAIL, { data });
  }

  useEffect(() => {
    // get data details
    const getDataFilm = async (id) => {
      setLoading(true);
      try {
        const data = await getDetailFilm(id);

        const newMenu = [
          (data?.film?.episodes.length > 0 && NUMBER_OF_SEASONS),
          SIMILAR_CONTENT,
          COMMENT
        ].filter(item => item?.key);
        setMenu(newMenu);
        setItemActive(newMenu[0]);
        setActive(0)

        setDataDetails(data?.film);
        setListRelated(data?.related);
        setCurrentFilm(data?.film?.episodes[0]);
      } catch (error) {
        console.log('error', error)
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      getDataFilm(slug);
    }
  }, []);


  return (
    <ViewContainer>
      <VideoPlayer poster={dataDetails?.poster} uri={currentFilm.video} />

      {/* list film */}
      <ScrollView style={{marginBottom: 24}}>
        <View style={{padding: 12}}>
          <Text style={[styles.title, {color: COLORS.white}]}>{dataDetails?.title || ""}</Text>
          <Text style={{ marginVertical: 10, color: COLORS.white }}>{dataDetails?.description || ""}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.year}>Diễn viên: </Text>
            {
              (dataDetails?.actor || []).map((item, idx) =>
                <Text key={idx} style={styles.year}>{`${item}${dataDetails.actor.length - 1 > idx ? ', ': ''}`}</Text>
              )
            }
          </View>
        </View>

        <View style={{marginTop: 12}}>
          <ActionMenu data={menu} indexActive={active} onPress={handleActive} />
        </View>

        {
          itemActive?.key === NUMBER_OF_SEASONS.key &&
            <View style>
              {
                (dataDetails?.episodes || []).map((item, idx) => <EpisodeItem
                  key={idx}
                  episode={item}
                  onPress={(item) => handleSelectMovie(item)}
                />)
              }
            </View>
        }

        {
          itemActive?.key === SIMILAR_CONTENT.key &&
            (listRelated || []).map(
              (item, idx) => <EpisodeItem
                key={idx}
                episode={item}
                onPress={(item) => handleSelectMovie(item)}
              />
            )
        }

        {
          itemActive?.key === COMMENT.key &&
            <Comment data={dataDetails?.reviews || []} sendComment={handleSendComment} />
        }
      </ScrollView>

      {
        loading && <Loading />
      }
    </ViewContainer>
  )
};

export const EpisodeItem = (props) => {
  const { episode, onPress } = props;

  return (
    <Pressable style={{ margin: 10 }} onPress={() => onPress(episode)}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', marginBottom: 5,}}>
          <Image
            style={{height: 75, aspectRatio: 16/9, resizeMode: 'cover', borderRadius: 3,}}
            source={{ uri: `${URL_IMAGE}${episode?.poster}`}}
          />

          <View style={{flex: 1, padding: 5, justifyContent: 'center',}}>
              <Text numberOfLines={1} style={{color: 'white', fontSize: 16, fontWeight: '500'}}>{episode?.title || ''}</Text>
              {
                episode?.episode && <Text style={{color: 'darkgrey', fontSize: 14, marginTop: 4}}>
                  {episode?.episode ? `Tập: ${episode?.episode}` : ''}
                </Text>
              }
              <Text numberOfLines={2} style={{color: 'darkgrey', fontSize: 14, marginTop: 4}}>{episode?.description || ''}</Text>
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

export default MovieDetails;
