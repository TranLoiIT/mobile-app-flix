import {Text} from 'react-native';
import {ViewContainer} from '../components/ViewContainer';
import {Loading} from '../components/app-loadding';

export function HomeScreen() {
  return (
    <ViewContainer>
      <Text style={{fontSize: 32, color: 'red'}}>Home Screen</Text>
      {/* <Loading /> */}
    </ViewContainer>
  );
}
