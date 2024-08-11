/**
 * @format
 */
import { AppRegistry } from 'react-native';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import App from './src/App';
import { name as appName } from './app.json';

// Configure push notifications
PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
                console.log("TOKEN:", token);
        },

        // (required) Called when a remote or local notification is opened or received
        onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                // Process the notification
                if (notification.userInteraction) {
                        // Handle the notification that was opened by the user
                }

                // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        // ANDROID ONLY: FCM Sender ID
        senderID: "137135572804",

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
                alert: true,
                badge: true,
                sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
});

// Create a channel for Android
PushNotification.createChannel(
    {
            channelId: "prayer-time-channel", // Kanal ID'si
            channelName: "Prayer Time Channel", // Kanal adı
            channelDescription: "A channel to notify about prayer times", // Kanal açıklaması
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`) // created == true : yeni kanal oluşturuldu
);

AppRegistry.registerComponent(appName, () => App);
