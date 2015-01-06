package me.eg.BcastRec;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;


public class Receiver3 extends BroadcastReceiver {

    private final String TAG = "Receiver3";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG,"INTENT RECEIVED");


//        Vibrator v = (Vibrator)context
//                    .getSystemService(Context.VIBRATOR_SERVICE);
//        v.vibrate(500);
//
//        String tmp = getResultData()== null ? "" : getResultData() ;
//        tmp = (tmp + " : Receiver3 : ");

//        setResultData(tmp);

        Toast.makeText(context,"Intent received by receive3",Toast.LENGTH_SHORT)
                .show();


    }
}
