package me.eg.BcastRec;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by boge on 2015/1/5.
 */
public class Receiver2 extends BroadcastReceiver {

    private final String TAG = "Receiver2";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG,"INTENT RECEIVED");

        Vibrator v = (Vibrator)context
                    .getSystemService(Context.VIBRATOR_SERVICE);
        v.vibrate(500);

        Toast.makeText(context,"Intent received by receive2",Toast.LENGTH_SHORT)
                .show();


    }
}
