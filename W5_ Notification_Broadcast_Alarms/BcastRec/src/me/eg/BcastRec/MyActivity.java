package me.eg.BcastRec;


import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.view.View;
import android.widget.Button;



public class MyActivity extends Activity {

    private static final String CUSTOM_INTENT = "me.eg.BcastRec.show_toast";
    private final Receiver1 receiver1 = new Receiver1();
    private LocalBroadcastManager localBroadcastManager;



    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);


        final IntentFilter intentFilter = new IntentFilter(CUSTOM_INTENT);
        intentFilter.setPriority(3);

        // 全局注册
//        registerReceiver(receiver1, intentFilter);
        localBroadcastManager = LocalBroadcastManager.getInstance(getApplicationContext());
        localBroadcastManager.registerReceiver(receiver1,intentFilter);

        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

//                sendBroadcast(new Intent(CUSTOM_INTENT),
//                        Manifest.permission.VIBRATE);

//                有序广播
//                sendOrderedBroadcast(new Intent(CUSTOM_INTENT), null,
//                        new BroadcastReceiver() {
//                            @Override
//                            public void onReceive(Context context, Intent intent) {
//                                Toast.makeText(context,"Final Result is " + getResultData()
//                                , Toast.LENGTH_SHORT).show();
//                            }
//                        },null,0,null,null);
                localBroadcastManager.sendBroadcast(new Intent(CUSTOM_INTENT));

            }
        });

    }

    @Override
    protected void onDestroy() {
//        unregisterReceiver(receiver1);

        super.onDestroy();

    }
}
