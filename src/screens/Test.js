import { View } from 'react-native';
import { ViewContainer } from '../components/ViewContainer';
import VideoPlayer from '../components/video-player';

const WebViewExample = () => {

  return (
    <View style={{backgroundColor: '#00ec43', height: '100%'}}>
      {/* <Text style={{fontSize: 32, color: 'red'}}>Videos Screen</Text> */}
      {/* <ScrollView> */}
        <VideoPlayer />
      {/* </ScrollView> */}
    </View>
  )
};


export default WebViewExample;
