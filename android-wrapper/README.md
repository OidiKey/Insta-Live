# Instagram Live Simulator - Android Wrapper

## Setup Instructions

1. Create a new Android project in Android Studio
2. Copy these files into your project:
   - `MainActivity.java` → app/src/main/java/com/example/instagramlivesimulator/
   - `activity_main.xml` → app/src/main/res/layout/
   - `AndroidManifest.xml` → app/src/main/ (replace the existing file)

3. Build your React app with:
   ```
   npm run build
   ```

4. Copy the contents of the `dist` folder to:
   ```
   app/src/main/assets/www/
   ```
   (Create the assets/www folders if they don't exist)

5. Build and run the Android app

## Important Notes

- This wrapper enables camera access through the WebView
- The app requires camera permissions which the user will need to grant
- For production use, you might want to consider using a framework like React Native instead
