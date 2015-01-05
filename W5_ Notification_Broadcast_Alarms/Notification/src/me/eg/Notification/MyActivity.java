package me.eg.Notification;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RemoteViews;

public class MyActivity extends Activity {
    private static final int MY_NOTIFICATION_ID = 1;

    private int mNotificationCount;

    private final CharSequence tickerText = "This is a Really, Really, Super Long Notification Message!";
    private final CharSequence contentText = "You've Been Notified!";

    private Intent mNotificationIntent;
    private PendingIntent mContentIntent;

    private long[] mVibratePattern = {0,200,200,300};

    RemoteViews mContentView = new RemoteViews("me.eg.Notification"
        ,R.layout.custom_notification);

    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        mNotificationIntent = new Intent(getApplicationContext()
                ,NotificationSubActivity.class);
        mContentIntent = PendingIntent.getActivity(
                getApplicationContext()
                ,0
                ,mNotificationIntent
                ,PendingIntent.FLAG_UPDATE_CURRENT);

        final Button button = (Button)findViewById(R.id.button1);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mContentView.setTextViewText(R.id.text,contentText
                        + " (" + ++mNotificationCount + ")");

                Notification.Builder notificationBuilder = new Notification.Builder(getApplicationContext())
                        .setTicker(tickerText)
                        .setSmallIcon(android.R.drawable.stat_sys_warning)
                        .setAutoCancel(true)
                        .setContentIntent(mContentIntent)
                        .setVibrate(mVibratePattern)
                        .setContent(mContentView);

                NotificationManager mNotificationManager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
                mNotificationManager.notify(MY_NOTIFICATION_ID,notificationBuilder.build());

            }
        });


    }
}
