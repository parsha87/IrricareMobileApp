
Build APK
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android

./gradlew assembleDebug

yourProject/android/app/build/outputs/apk/debug/app-debug.apk



Release 
https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51


react-native start --reset-cache