// ReactNativeAppNotificationSettingsModule.java

package com.reactlibrary;

import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

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
    public void isNotificationEnabled(Promise promise) {
        promise.resolve(NotificationManagerCompat.from(reactContext).areNotificationsEnabled());
    }

    private int getNotificationState() {
        return NotificationManagerCompat.from(reactContext).getImportance();
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable Object data) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, data);
    }
}
