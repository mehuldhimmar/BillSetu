/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Initialize Firebase — must be imported before AppRegistry
import '@react-native-firebase/app';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';

// Enable Crashlytics crash reporting
crashlytics().setCrashlyticsCollectionEnabled(true);

// Log app open event
analytics().logAppOpen();

AppRegistry.registerComponent(appName, () => App);
