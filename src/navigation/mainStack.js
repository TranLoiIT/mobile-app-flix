import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainBottom from './navigateBottom';
import {LoginScreen} from '../screens/Login';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATA_USER} from '../constants/key';
import {useEffect} from 'react';
import {loginApp} from '../redux/authen/authSlice';
import RegisterScreen from '../screens/Register';
import WebViewExample from '../screens/Test';
import Orientation from 'react-native-orientation-locker';
const Stack = createNativeStackNavigator();

function mainStack() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    // Orientation.unlockAllOrientations();
    const getDataUser = async () => {
      const dataUser = await AsyncStorage.getItem(DATA_USER);
      if (dataUser) {
        console.log('has token');
        const data = JSON.parse(dataUser);
        if (auth?.token === '') {
          dispatch(loginApp(data));
        }
      }
    };
    getDataUser();
  }, [auth]);
  
  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {auth?.token === '' ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="homeMainTab"
              component={MainBottom}
              options={{
                header: () => null,
              }}
              styles={styles.bgNaviga}
            />
          </>
        )}
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Test" component={WebViewExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainStack;

const styles = StyleSheet.create({
  bgNaviga: {
    backgroundColor: COLORS.black,
  },
});
