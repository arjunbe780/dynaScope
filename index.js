/**
 * @format
 */

import { AppRegistry,TextInput,Text } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { enableFreeze } from 'react-native-screens';

enableFreeze(true);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent(appName, () => App);
