/*
 * platform/application wide metrics for proper styling
 */
import { Dimensions, Platform } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
const { width, height } = Dimensions.get('window');

const METRICS = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: Platform.OS === 'ios' ? 54 : 66,
  statusBar: getStatusBarHeight(),
  bottomSpace: getBottomSpace(),
  borderRadius: 12,
  padding: 15,
  heightInput: 55,
  view_paddingHorizontal: 24,
  view_paddingTop: 24,
  view_paddingBottom: 48
};

export default METRICS;
