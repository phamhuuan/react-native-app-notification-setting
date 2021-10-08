export default class NotificationChannelSetting {
	public readonly channelId: string;
	public readonly name: string;
	public readonly description: string;
	public readonly vibrationPattern: number[];
	public readonly sound: string;
	public readonly importance: boolean;
	public readonly lightColor: number;
	public readonly lockscreenVisibility: number;
}