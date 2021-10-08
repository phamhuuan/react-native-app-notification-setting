import NotificationChannelSetting from './app/@types/NotificationChannelSetting';

export declare const openNotificationSetting: () => void;
export declare const openNotificationChannelSetting: (channelId: string) => void;
export declare const isNotificationEnabled: () => Promise<boolean>;
export declare const useNotificationEnabled: () => boolean;
export declare const createNotificationChannel: (channelId: string, name: string, description: string) => void;
export declare const deleteNotificationChannel: (channcelId: string) => void;
export declare const getNotificationChannelSetting: (channelId: string) => Promise<NotificationChannelSetting>;
export declare const getNotificationChannelsSetting: () => Promise<NotificationChannelSetting[]>;
export declare const renameNotificationChannel: (channelId: string, name: string, description: string) => void;
export declare const renameNotificationChannels: (info: {channelId: string; name: string; description: string}[]) => void;
export * as Importance from './app/@types/Importance';