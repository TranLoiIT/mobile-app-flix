import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../../constants/colors';

const NunitoSansFont = {
  normal: 'Regular',
  bold: 'Bold',
  100: 'Light',
  200: 'Light',
  300: 'Light',
  400: 'Regular',
  500: 'Regular',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'ExtraBold',
};

const disableStyles = {
  fontStyle: 'normal',
  fontWeight: 'normal',
};

export const CustomFontText = ({
  children = '',
  numberOfLines = 10,
  style = {},
  ellipsizeMode = 'tail',
}) => {
  const {fontWeight = '400', fontStyle} = StyleSheet.flatten(style || {});

  const fontFamily = `NunitoSans-${NunitoSansFont[fontWeight]}${
    fontStyle === 'italic' ? 'Italic' : ''
  }`;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[styles.default, {fontFamily}, style]}
      ellipsizeMode={ellipsizeMode}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 22,
    lineHeight: 30,
    color: COLORS.labelInput,
  },
});
