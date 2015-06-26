package me.eg.BcastRec;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class Receiver1 extends BroadcastReceiver {

    private final String TAG = "Receiver1";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG,"INTENT RECEIVED");

        if (isOrderedBroadcast()){
            Log.i(TAG,"Calling abortBroadCast()");
            abortBroadcast();
        }


//        String tmp = getResultData() == null ? "" : getResultData();
//        setResultData(tmp + ":Receiver 1: ");

        Toast.makeText(context,"Intent received by receive1",Toast.LENGTH_SHORT)
                .show();


    }
}
