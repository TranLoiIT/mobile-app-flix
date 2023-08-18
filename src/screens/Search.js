import {FlatList, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import { ViewContainer } from '../components/ViewContainer';
import { AppInputText } from '../components/app-inut-text';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../constants/colors';
import { useEffect, useState } from 'react';
import { EpisodeItem } from './MovieDetailScreen';
import { Loading } from '../components/app-loadding';

export function SearchMovieScreen() {
  const [valueSearch, setValueSearch] = useState('');
  const [listMovie, setListMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDataSearch = async () => {
    console.log('11111', 11111)
    try {
      setLoading(true);
      // const res = await 
      // if (res) {
      //   setListMovie(res);
      // }
      Keyboard.dismiss();
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <ViewContainer>
      <Text style={{fontSize: 24, color: 'red'}}>Tìm kiếm phim</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', padding: 12}}>
        <View style={{width: '80%'}}>
          <AppInputText
            value={valueSearch}
            maxLength={255}
            placeholder='Tìm kiếm phim'
            onChange={(e) => setValueSearch(e)}
            onSubmitEditing={getDataSearch}
          />
        </View>
        <Pressable
          style={[styles.btnSearch, { opacity: (valueSearch.length <= 0) ? 0.5 : 1 }]}
          disabled={valueSearch.length <= 0}
          onPress={() => getDataSearch()}
        >
          <Icon name="search" size={26} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* list item movie search */}
      {
        listMovie.length > 0 ? (listMovie || []).map(
          (item, idx) => <EpisodeItem
            key={idx}
            episode={item}
            onPress={(item) => handleSelectMovie(item)}
          />
        ) : (
          <Text style={{fontSize: 16, color: COLORS.white, marginTop: 24, textAlign: 'center'}}>
            Không có kết quả tìm kiếm!
          </Text>
        )
      }
      {
        loading && <Loading />
      }
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  btnSearch: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0,
    backgroundColor: COLORS.red,
    paddingBottom: 16,
    paddingTop: 16,
    marginLeft: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product: {
    width: '30%',
    height: 240,
  },
});

