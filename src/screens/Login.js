import {useState, React, useEffect} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, grayColor} from '../constants/colors';
import {AppInputText} from '../components/app-inut-text';
import {AppButton} from '../components/app-button';
import {useDispatch, useSelector} from 'react-redux';
import { loginApp, loginError } from '../redux/authen/authSlice';
import {loginUser } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { DATA_USER, ROUTER } from '../constants/key';
import { useNavigation } from '@react-navigation/native';
import { Loading } from '../components/app-loadding';
import { BACKGROUND_LOGIN, showAlert } from '../utils/common';
import { TEXT } from '../constants/message';
import { isEmail, isValidatePW } from '../utils/validate';
import { ImageBackground } from 'react-native';

export function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loadding, setLoadding] = useState(false);
  const [account, setAccount] = useState({
    userEmail: 'loitest@gmail.com',
    userPassword: 'Aa12345',
  });

  const getDataUser = async () => {
    try {
      setLoadding(true);
      const dataUser = await AsyncStorage.getItem(DATA_USER);
      if (dataUser) {
        const data = JSON.parse(dataUser);
        if (data?.token !== '') {
          dispatch(loginApp(data));
          // navigation.navigate(ROUTER.MAINTAB);
        }
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoadding(false);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const hanldeLogin = async () => {
    if (account.userEmail === "" || account.userPassword === "") {
      showAlert(TEXT.ERROR.MSG_001);
    } else if (!isEmail(account.userEmail)) {
      showAlert(TEXT.ERROR.MSG_003);
    } else if (!isValidatePW(account.userPassword)) {
      showAlert(TEXT.ERROR.MSG_004);
    } else {
      try {
        setLoadding(true);
        const data = await loginUser(account);
        if (data) {
          await AsyncStorage.setItem(DATA_USER, JSON.stringify(data));
          dispatch(loginApp(data));
          navigation.navigate(ROUTER.MAINTAB);
        }
      } catch (error) {
        // dispatch(loginError({}));
        console.log(error)
      }finally {
        setLoadding(false);
      }
    }
  };

  // const loginGG = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //     // this.setState({ userInfo });
  //   } catch (error) {
  //     console.log(error?.code);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  return (
    <View style={styles.containner}>
      <ImageBackground source={{uri: BACKGROUND_LOGIN}} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.formLogin}>
          <Text style={styles.title}>Đăng nhập</Text>
          <View style={{marginBottom: 24}}>
            <AppInputText
              value={account.userEmail}
              lable="Email"
              colorLable={'white'}
              onChange={value => setAccount({...account, userEmail: value})}
              bgColorInput={grayColor(1)}
              colorText={COLORS.white}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <AppInputText
              value={account.userPassword}
              lable="Password"
              colorLable={'white'}
              onChange={value => setAccount({...account, userPassword: value})}
              bgColorInput={grayColor(1)}
              colorText={COLORS.white}
              maxLength={24}
              secureTextEntry={true}
            />
          </View>
          <View style={{marginTop: 12}}>
            <Pressable
              onPress={() => {navigation.navigate(ROUTER.REGISTER)}}
              style={{marginBottom: 24, color: 'red'}}
            >
              <Text style={[styles.register]}>{TEXT.REGISTER}?</Text>
            </Pressable>

            <AppButton label="Login" onPress={() => hanldeLogin()} />

            {/* <GoogleSigninButton
              style={[styles.BtnLoginGG]}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={loginGG}
              disabled={false}
            /> */}
          </View>
        </View>
        { loadding && <Loading /> }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  containner: {
    // backgroundColor: COLORS.backgroundThemeDark,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '700',
  },
  formLogin: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 28,
    paddingRight: 28,
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 12,
    backgroundColor: COLORS.black,
  },
  BtnLoginGG: {
    width: "100%",
    height: 48,
    marginTop: 12,
  },
  register: {
    color: "red",
    fontSize: 16,
    fontWeight: 600,
  },
});
