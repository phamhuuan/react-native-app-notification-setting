import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, NativeModules} from 'react-native';
import NCS from './app/@types/NotificationChannelSetting';
import I from './app/@types/Importance';
import LV from './app/@types/LockscreenVisibility';

export type NotificationChannelSetting = NCS;
export const Importance = I;
export const LockscreenVisibility = LV;

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

interface ModuleType {
	createNotificationChannel: (channelId: string, name: string, description: string) => void;
	deleteNotificationChannel: (channelId: string) => void;
	getNotificationChannelSetting: (channelId: string) => Promise<NotificationChannelSetting>;
	getNotificationChannelsSetting: () => Promise<NotificationChannelSetting[]>;
	isNotificationEnabled: () => Promise<boolean>;
	openNotificationSetting: () => void;
	openNotificationChannelSetting: (channelId: string) => void;
	renameNotificationChannel: (channelId: string, name: string, description: string) => void;
	renameNotificationChannels: (info: {channelId: string; name: string; description: string}[]) => void;
	useNotificationEnabled: () => boolean;
	Importance: typeof I;
	LockscreenVisibility: typeof LV;
}

const module: ModuleType = {
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
};

export default module;
