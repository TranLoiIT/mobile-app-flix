import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {TextInput} from 'react-native';
import {COLORS} from '../../constants/colors';

export function AppInputText({
  value = '',
  maxLength = 50,
  placeholder = '',
  lable,
  colorLable = 'black',
  onChange,
  bgColorInput = COLORS.backgroundInput,
  colorText = COLORS.white,
  secureTextEntry = false,
}) {
  return (
    <SafeAreaView>
      {lable && <Text style={[styles.lable, {color: colorLable}]}>{lable}</Text>}
      <TextInput
        style={[styles.input, {color: colorText}]}
        onChangeText={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        placeholderTextColor={COLORS.white}
        backgroundColor={bgColorInput}
        secureTextEntry={secureTextEntry}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 8,
    borderWidth: 0,
    color: COLORS.white,
  },
  lable: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
});
