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

# Open notification setting
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.openNotificationSetting();

// or

import {openNotificationSetting} from 'react-native-app-notification-settings';

openNotificationSetting();
```

# Open notification channel settings
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.openNotificationChannelSetting();

// or

import {openNotificationChannelSetting} from 'react-native-app-notification-settings';

openNotificationChannelSetting();
```

# Get notification enabled status
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

const status = await ReactNativeAppNotificationSettings.isNotificationEnabled();

// or

import {isNotificationEnabled} from 'react-native-app-notification-settings';

const status = await isNotificationEnabled();
```

# Hook
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

const status = ReactNativeAppNotificationSettings.useNotificationEnabled();

// or

import {useNotificationEnabled} from 'react-native-app-notification-settings';

const status = useNotificationEnabled();
```

# Create notification channel
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.createNotificationChannel(channelId, name, description);

// or

import {createNotificationChannel} from 'react-native-app-notification-settings';

createNotificationChannel(channelId, name, description);
```

# Delete notification channel
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.deleteNotificationChannel(channelId);

// or

import {deleteNotificationChannel} from 'react-native-app-notification-settings';

deleteNotificationChannel(channelId);
```

# Get notification channel
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

const {
	channelId,
	name,
	description,
	importance,
	lightColor,
	lockscreenVisibility,
	sound
} = await ReactNativeAppNotificationSettings.getNotificationChannelSetting(channelId);

// or

import {getNotificationChannelSetting} from 'react-native-app-notification-settings';

const {
	channelId,
	name,
	description,
	importance,
	lightColor,
	lockscreenVisibility,
	sound
} = await getNotificationChannelSetting(channelId);
```

# Get all notification channels
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

const channels = await ReactNativeAppNotificationSettings.getNotificationChannelsSetting(channelId);

// or

import {getNotificationChannelsSetting} from 'react-native-app-notification-settings';

const channels = await getNotificationChannelsSetting(channelId);
```

# Rename notification channel
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

ReactNativeAppNotificationSettings.renameNotificationChannel(channelId, name, description);

// or

import {renameNotificationChannel} from 'react-native-app-notification-settings';

renameNotificationChannel(channelId, name, description);
```

# Rename multiple notification channels
```javascript
import ReactNativeAppNotificationSettings from 'react-native-app-notification-settings';

const channels = [
	{
		channelId: 'channelId1',
		name: 'name1',
		description: 'description1'
	},
	{
		channelId: 'channelId2',
		name: 'name2',
		description: 'description2'
	},
	// ...
];

ReactNativeAppNotificationSettings.renameNotificationChannels(channels);

// or

import {renameNotificationChannels} from 'react-native-app-notification-settings';

const channels = [
	{
		channelId: 'channelId1',
		name: 'name1',
		description: 'description1'
	},
	{
		channelId: 'channelId2',
		name: 'name2',
		description: 'description2'
	},
	// ...
];

renameNotificationChannels(channels);
```