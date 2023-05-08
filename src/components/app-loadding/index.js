import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {CustomFontText} from '../custom-font-text';
import {COLORS, blackColor} from '../../constants/colors';

export const Loading = ({}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <ActivityIndicator animating={true} size="large" color="white" />
        <CustomFontText style={{fontSize: 15, color: 'white', marginTop: 10}}>
          {'loading...'}
        </CustomFontText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: blackColor(0.3),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999999,
  },
  content: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: COLORS.bg_loading,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
