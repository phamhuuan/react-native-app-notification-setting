import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, NativeModules} from 'react-native';
import Importance from './app/@types/Importance';
import LockscreenVisibility from './app/@types/LockscreenVisibility';
import NotificationChannelSetting from './app/@types/NotificationChannelSetting';


const {ReactNativeAppNotificationSettings} = NativeModules;

export const openNotificationSetting = () => {
	return ReactNativeAppNotificationSettings.openNotificationSetting();
}

export const openNotificationChannelSetting = (channelId: string) => {
	return ReactNativeAppNotificationSettings.openNotificationChannelSetting(channelId);
}

export const isNotificationEnabled = async () => {
	return await ReactNativeAppNotificationSettings.isNotificationEnabled();
};

export const useNotificationEnabled = () => {
	const [enabled, setEnabled] = useState<boolean>(false);

	useEffect(() => {
		isNotificationEnabled().then(setEnabled);
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

export const createNotificationChannel = (channelId: string, name: string, description: string) => {
	return ReactNativeAppNotificationSettings.createNotificationChannel(channelId, name, description);
}

export const deleteNotificationChannel = (channelId: string) => {
	return ReactNativeAppNotificationSettings.deleteNotificationChannel(channelId);
}

export const getNotificationChannelSetting = async (channelId: string): Promise<NotificationChannelSetting> => {
	return await ReactNativeAppNotificationSettings.getNotificationChannelSetting(channelId);
}

export const getNotificationChannelsSetting = async (): Promise<NotificationChannelSetting[]> => {
	return await ReactNativeAppNotificationSettings.getNotificationChannelsSetting();
}

export const renameNotificationChannel = (channelId: string, name: string, description: string) => {
	return ReactNativeAppNotificationSettings.renameNotificationChannel(channelId, name, description);
}

export const renameNotificationChannels = (info: {channelId: string; name: string; description: string}[]) => {
	return ReactNativeAppNotificationSettings.renameNotificationChannels(info);
}

export default {
	openNotificationSetting,
	openNotificationChannelSetting,
	isNotificationEnabled,
	useNotificationEnabled,
	createNotificationChannel,
	deleteNotificationChannel,
	getNotificationChannelSetting,
	getNotificationChannelsSetting,
	renameNotificationChannel,
	renameNotificationChannels,
	Importance,
	LockscreenVisibility,
	NotificationChannelSetting,
};
