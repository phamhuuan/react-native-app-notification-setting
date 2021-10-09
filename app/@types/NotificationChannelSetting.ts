export default class NotificationChannelSetting {
	public readonly channelId: string;
	public readonly name: string | null;
	public readonly description: string | null;
	public readonly vibrationPattern: number[];
	public readonly sound: string;
	public readonly importance: number;
	public readonly lightColor: number;
	public readonly lockscreenVisibility: number;
}