import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import { AppButton } from '../components/app-button';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authen/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA_USER, ROUTER } from '../constants/key';
import { ViewContainer } from '../components/ViewContainer';
import { TEXT } from '../constants/message';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../api/auth';

export function ProfileScreen() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const hanldeLogout = async () => {
    try {
      const data = await logoutUser();
      if (data) {
        await AsyncStorage.removeItem(DATA_USER);
        dispatch(logoutSuccess({}));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = () => {
    navigation.navigate(ROUTER.REGISTER);
  };

  return (
    <ViewContainer style={{paddingHorizontal: 24}}>
      <View style={{flex: 1, paddingTop: 24, paddingBottom: 24,}}>
        <View style={{alignItems: "center", marginTop: 52}}>
          {
            auth?.imageUser && <Image
              source={{uri: auth.imageUser,}}
              style={styles.avatar}
            />
          }
        </View>
        <View style={{marginTop: 52}}>
          <Text style={styles.infAccount}>
            <Text style={{fontWeight: 700}}>Tên:  </Text>
            {auth.userName}
          </Text>
          <Text style={styles.infAccount}>
            <Text style={{fontWeight: 700}}>Email:  </Text>
            {auth.userEmail}
          </Text>
        </View>
        <View style={{marginTop: 84}}>
          <AppButton label="Logout" onPress={() => hanldeLogout()} />
        </View>
        <Pressable onPress={onPress} style={{marginTop: 42}}>
          <Text style={[styles.register]}>{TEXT.REGISTER}?</Text>
        </Pressable>
      </View>
    </ViewContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 124,
    width: 124,
    borderRadius: 100,
  },
  infAccount: {
    color: "white",
    fontSize: 20,
  },
  register: {
    color: "red",
    fontSize: 16,
    fontWeight: 600,
  },
})
