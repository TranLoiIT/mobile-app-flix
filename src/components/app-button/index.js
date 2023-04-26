import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS} from '../../constants/colors';
import {CustomFontText} from '../custom-font-text';
import METRICS from '../../constants/metrics';

export const AppButton = ({
  label = 'Next',
  onPress = () => {},
  style = {},
  disable = false,
  btnStyle = {},
  labelStyle = {},
  loading = false,
  colors = [COLORS.gradient1, COLORS.gradient2, COLORS.gradient2],
  disableColors = [COLORS.disable, COLORS.disable],
}) => {
  return (
    <LinearGradient
      style={[styles.container, style]}
      colors={disable || loading ? disableColors : colors}>
      <Pressable
        onPress={onPress}
        disabled={disable || loading}
        style={{...styles.btn, ...btnStyle}}>
        <CustomFontText style={[styles.btnText, labelStyle]}>
          {label}
        </CustomFontText>
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: METRICS.borderRadius,
    overflow: 'hidden',
  },
  btn: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: METRICS.borderRadius,
  },
  btnText: {
    color: COLORS.labelInput,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 26,
  },
});
