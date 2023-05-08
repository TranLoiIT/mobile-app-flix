import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import { ViewContainer } from '../components/ViewContainer';

export const VideoPlayer = () => {
  return (
    <ViewContainer>
      <Text style={{fontSize: 32, color: 'red'}}>Videos Screen</Text>
      <WebView
        source={{
          uri: 'https://www.youtube.com/embed/7uoShbuwYvs',
        }}
        style={{
          width: '100%',
          minHeight: 10,
          maxHeight: 240,
          backgroundColor: 'black'
        }}
      />
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
});

export default VideoPlayer;
