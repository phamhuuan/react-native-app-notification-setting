export default interface NotificationChannelSetting {
	readonly channelId: string;
	readonly name: string | null;
	readonly description: string | null;
	readonly vibrationPattern: number[];
	readonly sound: string;
	readonly importance: number;
	readonly lightColor: number;
	readonly lockscreenVisibility: number;
}