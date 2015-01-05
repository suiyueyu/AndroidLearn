package me.eg.BcastRec;


import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MyActivity extends Activity {

    private static final String CUSTOM_INTENT = "me.eg.BcastRec.show_toast";
    private final Receiver1 receiver1 = new Receiver1();



    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);


        final IntentFilter intentFilter = new IntentFilter(CUSTOM_INTENT);
        intentFilter.setPriority(3);

        registerReceiver(receiver1, intentFilter);

        Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                sendBroadcast(new Intent(CUSTOM_INTENT),
//                        Manifest.permission.VIBRATE);
                sendOrderedBroadcast(new Intent(CUSTOM_INTENT)
                    ,Manifest.permission.VIBRATE);
            }
        });

    }

    @Override
    protected void onDestroy() {
        unregisterReceiver(receiver1);
        super.onDestroy();

    }
}
