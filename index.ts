import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, NativeModules} from 'react-native';

const {ReactNativeAppNotificationSettings} = NativeModules;

export const openNotificationSetting = () => {
	return ReactNativeAppNotificationSettings.openNotificationSetting();
}

export const isNotificationEnabled = async () => {
	return await ReactNativeAppNotificationSettings.isNotificationEnabled();
};

export const useNotificationEnabled = () => {
	const [enabled, setEnabled] = useState<boolean>(false);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
			if (nextAppState === 'active') {
				isNotificationEnabled().then(setEnabled);
			}
		});
		return () => {
			subscription.remove();
		};
	} , []);

	return enabled;
};

export default {
	openNotificationSetting,
	isNotificationEnabled,
	useNotificationEnabled,
};
