import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainBottom from './navigateBottom';
import {LoginScreen} from '../screens/Login';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {ROUTER} from '../constants/key';
import RegisterScreen from '../screens/Register';
import WebViewExample from '../screens/Test';
import MovieDetails from '../screens/MovieDetailScreen';

const Stack = createNativeStackNavigator();

function mainStack() {
  const auth = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {auth?.token === '' ? (
            <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
            <Stack.Screen
              name="homeMainTab"
              component={MainBottom}
              options={{
                header: () => null,
              }}
              styles={styles.bgNaviga}
            />
        )}
        <Stack.Screen name={ROUTER.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={ROUTER.MOVIE_DETAIL} component={MovieDetails} />
        <Stack.Screen name="Test" component={WebViewExample} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default mainStack;

const styles = StyleSheet.create({
  bgNaviga: {
    
    backgroundColor: COLORS.white,
  },
});
