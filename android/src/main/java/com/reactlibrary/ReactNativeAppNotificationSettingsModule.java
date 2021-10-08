// ReactNativeAppNotificationSettingsModule.java

package com.reactlibrary;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import java.util.Arrays;
import java.util.List;

public class ReactNativeAppNotificationSettingsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private static final String NOTIFICATION_IMPORTANCE_CHANGE = "NOTIFICATION_IMPORTANCE_CHANGE";

    public ReactNativeAppNotificationSettingsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "ReactNativeAppNotificationSettings";
    }

    @ReactMethod
    public void openNotificationSetting() {
        Intent notificationIntent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            notificationIntent.setAction(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            notificationIntent.putExtra(Settings.EXTRA_APP_PACKAGE, reactContext.getPackageName());
        } else {
            notificationIntent.setAction("android.settings.APP_NOTIFICATION_SETTINGS");
            notificationIntent.putExtra("app_package", reactContext.getPackageName());
            notificationIntent.putExtra("app_uid", reactContext.getApplicationInfo().uid);
        }
        reactContext.startActivity(notificationIntent);
    }

    @ReactMethod
    public void openNotificationChannelSetting(String channelId) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            Intent intent = new Intent(Settings.ACTION_CHANNEL_NOTIFICATION_SETTINGS);
            intent.putExtra(Settings.EXTRA_APP_PACKAGE, reactContext.getPackageName());
            intent.putExtra(Settings.EXTRA_CHANNEL_ID, channelId);
            reactContext.startActivity(intent);
        }
    }

    @ReactMethod
    public void isNotificationEnabled(Promise promise) {
        promise.resolve(NotificationManagerCompat.from(reactContext).areNotificationsEnabled());
    }

    @ReactMethod
    public void createNotificationChannel(String channelId, String name, String description) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = reactContext.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    @ReactMethod
    public void deleteNotificationChannel(String channelId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.deleteNotificationChannel(channelId);
        }
    }

    @ReactMethod
    public void getNotificationChannelSetting(String channelId, Promise promise) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationManager notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel channel = notificationManager.getNotificationChannel(channelId);
            WritableArray vibrationPattern = new WritableNativeArray();
            if (channel.getVibrationPattern() != null) {
                Arrays.stream(channel.getVibrationPattern()).forEach(pattern -> {
                    vibrationPattern.pushInt((int) pattern);
                });
            }
            WritableMap map = new WritableNativeMap();
            map.putString("channelId", channel.getId());
            map.putString("name", channel.getName().toString());
            map.putString("description", channel.getDescription());
            map.putArray("vibrationPattern", vibrationPattern);
            map.putString("sound", channel.getSound().toString());
            map.putInt("importance", channel.getImportance());
            map.putInt("lightColor", channel.getLightColor());
            map.putInt("lockscreenVisibility", channel.getLockscreenVisibility());
            promise.resolve(map);
        }
    }

    @ReactMethod
    public void getNotificationChannelsSetting(Promise promise) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationManager notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            List<NotificationChannel> notificationChannelList = notificationManager.getNotificationChannels();
            WritableArray list = new WritableNativeArray();
            notificationChannelList.forEach(channel -> {
                WritableArray vibrationPattern = new WritableNativeArray();
                if (channel.getVibrationPattern() != null) {
                    Arrays.stream(channel.getVibrationPattern()).forEach(pattern -> {
                        vibrationPattern.pushInt((int) pattern);
                    });
                }
                WritableMap map = new WritableNativeMap();
                map.putString("channelId", channel.getId());
                map.putString("name", channel.getName().toString());
                map.putString("description", channel.getDescription());
                map.putArray("vibrationPattern", vibrationPattern);
                map.putString("sound", channel.getSound().toString());
                map.putInt("importance", channel.getImportance());
                map.putInt("lightColor", channel.getLightColor());
                map.putInt("lockscreenVisibility", channel.getLockscreenVisibility());
                list.pushMap(map);
            });
            promise.resolve(list);
        }
    }

    @ReactMethod
    public void renameNotificationChannel(String channelId, String name, String description) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationManager notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationChannel channel = notificationManager.getNotificationChannel(channelId);
            channel.setName(name);
            channel.setDescription(description);
        }
    }

    @ReactMethod
    public void renameNotificationChannels(ReadableArray array) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            NotificationManager notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);
            List<NotificationChannel> notificationChannelList = notificationManager.getNotificationChannels();
            for (int i = 0; i < array.size(); i++) {
                ReadableMap map = array.getMap(i);
                for (int j = 0; j < notificationChannelList.size(); j++) {
                    assert map != null;
                    if (notificationChannelList.get(j).getId().equals(map.getString("channelId"))) {
                        notificationChannelList.get(j).setName(map.getString("name"));
                        notificationChannelList.get(j).setDescription(map.getString("description"));
                        break;
                    }
                }
            }
        }
    }
}
