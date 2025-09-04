import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 414, 816 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = (dimension: number) => {
  return wp2dp((dimension / 430) * 100 + '%');
};

export const wpf = (dimension: number) => {
  // return wp2dp((dimension / 375) * 100 + '%');
  return dimension;
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * * 414, 816 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = (dimension: number) => {
  return hp2dp((dimension / 778) * 100 + '%');
};
