package com.example.instagramlivesimulator;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class WebChromeClient extends android.webkit.WebChromeClient {
    private static final int CAMERA_PERMISSION_REQUEST = 100;

    @Override
    public void onPermissionRequest(final PermissionRequest request) {
        Activity activity = (Activity) request.getOrigin().getHost();
        
        if (ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.CAMERA}, CAMERA_PERMISSION_REQUEST);
        } else {
            request.grant(request.getResources());
        }
    }
}
