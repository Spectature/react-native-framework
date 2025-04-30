/**
 * @format
 */


import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.log('dev',__DEV__)
if (__DEV__) {
    require("./ReactotronConfig");
}

AppRegistry.registerComponent(appName, () => App);
