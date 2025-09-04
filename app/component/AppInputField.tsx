import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import fonts from '../config/fonts';
import colors from '../config/colors';
import {wp} from '../config/dimension';
import icons from '../config/icons';

const AppInputField = ({
  header,
  placeholder,
  value,
  onChangeText,
  rightIcon,
  ...otherProps
}: any) => {
  return (
    <View style={{marginTop: wp(10)}}>
      <Text style={styles.label}>{header}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          onChangeText={onChangeText}
          value={value}
          {...otherProps}
        />
      </View>
      <Divider style={styles.dividerSpacing} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: wp(16),
    fontFamily: fonts.GloryMedium,
    color: colors.secondaryText,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: wp(54),
    borderRadius: wp(4),
    fontFamily: fonts.GloryMedium,
    fontSize: wp(18),
    color: colors.primaryText,
    flex: 1,
    borderWidth:wp(1),
    borderColor:colors.secondaryText,
  },
  iconButton: {
    margin: 0,
  },
  dividerSpacing: {
    marginTop: wp(-2),
  },
});

export default AppInputField;
