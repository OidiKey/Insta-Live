# How to Run Instagram Live Simulator on Android

## Option 1: Using the Android Wrapper (Recommended)

1. Build your React app:
   ```
   npm run build
   ```

2. Create a new Android project in Android Studio:
   - Choose "Empty Activity" template
   - Set minimum SDK to API 21 (Android 5.0) or higher

3. Copy the files from the `android-wrapper` folder into your Android project:
   - Copy Java files to the package directory
   - Copy XML files to the appropriate resource directories
   - Copy the built React app (from the `dist` folder) to `app/src/main/assets/www/`

4. Build and run the Android app

## Option 2: Using a Progressive Web App (PWA)

If you prefer not to create a native Android app, you can:

1. Deploy your React app to a web hosting service
2. Access the website on your Android device
3. Add it to your home screen for an app-like experience

## Option 3: Using Capacitor or Cordova

For a more robust solution:

1. Install Capacitor:
   ```
   npm install @capacitor/core @capacitor/android
   npx cap init
   npx cap add android
   ```

2. Build your React app and sync with Capacitor:
   ```
   npm run build
   npx cap sync
   ```

3. Open the Android project in Android Studio:
   ```
   npx cap open android
   ```

4. Run the app on your device

This approach provides better integration with native features and is recommended for production apps.
