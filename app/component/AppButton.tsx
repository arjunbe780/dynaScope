import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {wp, hp} from '../config/dimension';
import colors from '../config/colors';
import fonts from '../config/fonts';

const AppButton = ({
  title,
  onPress,
  rightIcon,
  leftIcon,
  style,
  disable,
  textStyle,
  rightIconColor = colors.borderColor,
  leftIconColor = colors.borderColor,
}: any) => {
  const disableOpacity = {opacity: disable ? 0.5 : 1};
  return (
    <TouchableOpacity disabled={disable} onPress={onPress}>
      <View style={[styles.button, style, disableOpacity]}>
        {leftIcon && (
          <IconButton
            icon={leftIcon}
            iconColor={leftIconColor}
            size={wp(20)}
            style={styles.iconBtn}
          />
        )}
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {rightIcon && (
          <IconButton
            icon={rightIcon}
            iconColor={rightIconColor}
            size={wp(20)}
            style={styles.iconBtn}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: hp(56),
    borderRadius: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryButton,
  },
  text: {
    fontSize: wp(18),
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fonts.GloryBold,
    fontWeight: '600',
    color: colors.primaryBackground,
  },
  iconBtn: {
    margin: 0,
    marginRight: wp(-16),
  },
});

export default AppButton;
