import {Pressable, Text} from 'react-native';
import {ViewContainer} from '../components/ViewContainer';
import {Loading} from '../components/app-loadding';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ViewContainer>
      <Text style={{fontSize: 32, color: 'red'}}>Home Screen</Text>
      {/* <Loading /> */}
      <Pressable onPress={() => (navigation.navigate('Test'))}>
        <Text style={{fontSize: 32, color: 'red'}}>aaaaaaaaaaaa</Text>
      </Pressable>
    </ViewContainer>
  );
}
