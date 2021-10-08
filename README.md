# react-native-app-notification-settings

## Getting started

`$ npm install react-native-app-notification-settings --save`

### Mostly automatic installation

`$ react-native link react-native-app-notification-settings`

## Usage

# Import
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';
```

# Open notification settings
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.openNotificationSettings();
```

# Get notification enabled status
```javascript
const status = ReactNativeAppNotificationSettings.isNotificationEnabled();
```

# Hook
```javascript
const status = useNotificationEnabled();
```