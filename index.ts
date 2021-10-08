import {useEffect, useState} from 'react';
import {NativeEventEmitter, NativeModules} from 'react-native';

const {ReactNativeAppNotificationSettings} = NativeModules;

export const openNotificationSetting = () => {
	return ReactNativeAppNotificationSettings.openNotificationSetting();
}

export const isNotificationEnabled = async () => {
	return await ReactNativeAppNotificationSettings.isNotificationEnabled();
};

const deviceInfoEmitter = new NativeEventEmitter(ReactNativeAppNotificationSettings);

export const useNotificationEnabled = () => {
	const [enabled, setEnabled] = useState<boolean>(false);

	useEffect(() => {
		const initialize = async () => {
			const status = await isNotificationEnabled();
			setEnabled(status);
		}

		const onChange = (enabled: boolean) => {
			setEnabled(enabled);
		}

		initialize();

		const subscription = deviceInfoEmitter.addListener(
      'NOTIFICATION_IMPORTANCE_CHANGE',
      onChange,
    );

    return () => subscription.remove();
	} , []);

	return enabled;
};

export default {
	openNotificationSetting,
	isNotificationEnabled,
	useNotificationEnabled,
};
