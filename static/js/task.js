/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

const init = (async () => {
    await psiTurk.preloadPages(pages);
})()
// psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

var StroopExperiment = function() {

	
	var annotations =[]; //to collect the (moveTime, myTableConfValue) events for each stimulus

	// Set the Stimuli
	var stims;
	var vid_count = 0;
	var trial_score = 0; 
    console.log("in task.js THE CONDITION IS " + mycondition);
    
    //Set which stimuli they see based on their condition
    // if (mycondition == '0'){ //Condition 0 = Perspective A = Back to door = Closer to Robot
        console.log("Condition 0!");
		trial_stims = [['trial_1.webm', 'trial_1.png', [564, 171]], 
		['trial_2.webm', 'trial_2.png', [638, 296]],
		];
		final_trial = ['trial_3.webm', 'trial_3.png', [658, 258]];

        stims = [['video_1_31_8484.webm' , 'image_1_31_8484.png' ], 
		['video_0_31_15272.webm' , 'image_0_31_15272.png' ], 
		['video_3_19_13228.webm' , 'image_3_19_13228.png' ], 
		['video_2_24_6663.webm' , 'image_2_24_6663.png' ], 
		['video_3_24_1430.webm' , 'image_3_24_1430.png' ], 
		['video_2_2_5681.webm' , 'image_2_2_5681.png' ], 
		['video_1_31_18714.webm' , 'image_1_31_18714.png' ], 
		['video_3_9_4110.webm' , 'image_3_9_4110.png' ], 
		['video_2_2_9645.webm' , 'image_2_2_9645.png' ], 
		['video_5_31_12411.webm' , 'image_5_31_12411.png' ], 
		['video_3_31_11030.webm' , 'image_3_31_11030.png' ], 
		['video_3_19_20034.webm' , 'image_3_19_20034.png' ], 
		['video_0_24_25698.webm' , 'image_0_24_25698.png' ], 
		['video_3_31_1419.webm' , 'image_3_31_1419.png' ], 
		['video_0_19_18480.webm' , 'image_0_19_18480.png' ], 
		['video_2_9_10103.webm' , 'image_2_9_10103.png' ], 
		['video_4_19_15754.webm' , 'image_4_19_15754.png' ], 
		['video_3_24_9990.webm' , 'image_3_24_9990.png' ], 
		['video_2_24_826.webm' , 'image_2_24_826.png' ], 
		['video_0_31_17902.webm' , 'image_0_31_17902.png' ], 
		['video_4_19_32225.webm' , 'image_4_19_32225.png' ], 
		['video_2_19_16088.webm' , 'image_2_19_16088.png' ], 
		['video_3_24_11362.webm' , 'image_3_24_11362.png' ], 
		['video_0_24_31082.webm' , 'image_0_24_31082.png' ], 
		['video_2_24_8713.webm' , 'image_2_24_8713.png' ], 
		['video_3_24_3254.webm' , 'image_3_24_3254.png' ], 
		['video_5_24_15496.webm' , 'image_5_24_15496.png' ], 
		['video_1_2_5565.webm' , 'image_1_2_5565.png' ], 
		['video_2_31_17591.webm' , 'image_2_31_17591.png' ], 
		['video_3_31_5402.webm' , 'image_3_31_5402.png' ], 
		['video_2_19_32832.webm' , 'image_2_19_32832.png' ], 
		['video_2_19_178.webm' , 'image_2_19_178.png' ], 
		['video_3_31_7926.webm' , 'image_3_31_7926.png' ], 
		['video_0_24_22665.webm' , 'image_0_24_22665.png' ], 
		['video_3_31_16994.webm' , 'image_3_31_16994.png' ], 
		['video_0_24_21680.webm' , 'image_0_24_21680.png' ], 
		['video_4_19_25934.webm' , 'image_4_19_25934.png' ], 
		['video_3_24_17654.webm' , 'image_3_24_17654.png' ], 
		['video_2_14_6754.webm' , 'image_2_14_6754.png' ], 
		['video_2_24_13422.webm' , 'image_2_24_13422.png' ], 
		['video_1_24_7727.webm' , 'image_1_24_7727.png' ], 
		['video_1_14_2153.webm' , 'image_1_14_2153.png' ], 
		['video_0_24_29468.webm' , 'image_0_24_29468.png' ], 
		['video_1_19_1136.webm' , 'image_1_19_1136.png' ], 
		['video_2_31_14060.webm' , 'image_2_31_14060.png' ], 
		['video_2_19_15988.webm' , 'image_2_19_15988.png' ], 
		['video_0_14_800.webm' , 'image_0_14_800.png' ], 
		['video_2_24_31131.webm' , 'image_2_24_31131.png' ], 
		['video_0_19_31941.webm' , 'image_0_19_31941.png' ], 
		['video_0_9_3128.webm' , 'image_0_9_3128.png' ], 
		['video_4_19_28729.webm' , 'image_4_19_28729.png' ], 
		['video_0_9_4298.webm' , 'image_0_9_4298.png' ], 
		['video_0_19_303.webm' , 'image_0_19_303.png' ], 
		['video_2_19_17443.webm' , 'image_2_19_17443.png' ], 
		['video_0_24_30608.webm' , 'image_0_24_30608.png' ], 
		['video_0_9_409.webm' , 'image_0_9_409.png' ], 
		['video_1_24_27127.webm' , 'image_1_24_27127.png' ], 
		['video_1_19_19083.webm' , 'image_1_19_19083.png' ], 
		['video_2_24_27726.webm' , 'image_2_24_27726.png' ], 
		['video_6_31_12203.webm' , 'image_6_31_12203.png' ], 
		['video_2_31_204.webm' , 'image_2_31_204.png' ], 
		['video_3_14_4077.webm' , 'image_3_14_4077.png' ], 
		['video_3_14_4950.webm' , 'image_3_14_4950.png' ], 
		['video_2_19_18790.webm' , 'image_2_19_18790.png' ], 
		['video_1_31_11254.webm' , 'image_1_31_11254.png' ], 
		['video_1_24_30813.webm' , 'image_1_24_30813.png' ], 
		['video_1_9_110.webm' , 'image_1_9_110.png' ], 
		['video_3_31_9296.webm' , 'image_3_31_9296.png' ], 
		['video_1_2_9411.webm' , 'image_1_2_9411.png' ], 
		['video_0_9_7342.webm' , 'image_0_9_7342.png' ], 
		['video_0_9_273.webm' , 'image_0_9_273.png' ], 
		['video_0_24_10418.webm' , 'image_0_24_10418.png' ], 
		['video_2_19_20541.webm' , 'image_2_19_20541.png' ], 
		['video_2_9_5440.webm' , 'image_2_9_5440.png' ], 
		['video_3_9_1124.webm' , 'image_3_9_1124.png' ], 
		['video_4_24_26936.webm' , 'image_4_24_26936.png' ], 
		['video_1_24_5569.webm' , 'image_1_24_5569.png' ], 
		['video_0_19_20986.webm' , 'image_0_19_20986.png' ], 
		['video_1_24_20625.webm' , 'image_1_24_20625.png' ], 
		['video_2_24_18830.webm' , 'image_2_24_18830.png' ], 
		['video_1_31_391.webm' , 'image_1_31_391.png' ], 
		['video_3_31_5508.webm' , 'image_3_31_5508.png' ], 
		['video_2_2_9516.webm' , 'image_2_2_9516.png' ], 
		['video_9_31_14299.webm' , 'image_9_31_14299.png' ], 
		['video_2_31_4037.webm' , 'image_2_31_4037.png' ], 
		['video_3_31_15841.webm' , 'image_3_31_15841.png' ], 
		['video_0_24_20827.webm' , 'image_0_24_20827.png' ], 
		['video_0_9_9016.webm' , 'image_0_9_9016.png' ], 
		['video_3_19_26492.webm' , 'image_3_19_26492.png' ], 
		['video_1_19_3820.webm' , 'image_1_19_3820.png' ], 
		['video_3_19_7010.webm' , 'image_3_19_7010.png' ], 
		['video_0_24_6928.webm' , 'image_0_24_6928.png' ], 
		['video_2_14_7345.webm' , 'image_2_14_7345.png' ], 
		['video_1_9_7970.webm' , 'image_1_9_7970.png' ], 
		['video_0_31_10950.webm' , 'image_0_31_10950.png' ], 
		['video_0_24_19620.webm' , 'image_0_24_19620.png' ], 
		['video_3_31_11130.webm' , 'image_3_31_11130.png' ], 
		['video_4_9_8617.webm' , 'image_4_9_8617.png' ], 
		['video_3_24_30896.webm' , 'image_3_24_30896.png' ], 
		['video_1_31_594.webm' , 'image_1_31_594.png' ], 
		['video_3_31_19900.webm' , 'image_3_31_19900.png' ], 
		['video_1_9_9703.webm' , 'image_1_9_9703.png' ], 
		['video_0_24_4221.webm' , 'image_0_24_4221.png' ], 
		['video_2_24_15974.webm' , 'image_2_24_15974.png' ], 
		['video_1_2_3384.webm' , 'image_1_2_3384.png' ], 
		['video_2_2_8304.webm' , 'image_2_2_8304.png' ], 
		['video_1_2_485.webm' , 'image_1_2_485.png' ], 
		['video_0_14_1317.webm' , 'image_0_14_1317.png' ], 
		['video_1_2_2667.webm' , 'image_1_2_2667.png' ], 
		['video_2_19_24472.webm' , 'image_2_19_24472.png' ], 
		['video_2_19_29592.webm' , 'image_2_19_29592.png' ], 
		['video_2_19_32577.webm' , 'image_2_19_32577.png' ], 
		['video_2_24_11562.webm' , 'image_2_24_11562.png' ], 
		['video_3_19_15227.webm' , 'image_3_19_15227.png' ], 
		['video_0_19_8883.webm' , 'image_0_19_8883.png' ], 
		['video_3_14_3461.webm' , 'image_3_14_3461.png' ], 
		['video_2_24_18974.webm' , 'image_2_24_18974.png' ], 
		['video_1_19_10928.webm' , 'image_1_19_10928.png' ], 
		['video_0_19_31069.webm' , 'image_0_19_31069.png' ], 
		['video_0_14_5537.webm' , 'image_0_14_5537.png' ], 
		['video_1_24_1565.webm' , 'image_1_24_1565.png' ], 
		['video_3_24_10256.webm' , 'image_3_24_10256.png' ], 
		['video_1_19_4143.webm' , 'image_1_19_4143.png' ], 
		['video_1_9_8771.webm' , 'image_1_9_8771.png' ], 
		['video_0_14_5278.webm' , 'image_0_14_5278.png' ], 
		['video_2_14_268.webm' , 'image_2_14_268.png' ], 
		['video_3_24_13960.webm' , 'image_3_24_13960.png' ], 
		['video_0_19_22092.webm' , 'image_0_19_22092.png' ], 
		['video_3_19_16450.webm' , 'image_3_19_16450.png' ], 
		['video_1_24_9882.webm' , 'image_1_24_9882.png' ], 
		['video_0_24_11000.webm' , 'image_0_24_11000.png' ], 
		['video_1_19_27135.webm' , 'image_1_19_27135.png' ], 
		['video_2_31_8810.webm' , 'image_2_31_8810.png' ], 
		['video_3_31_7574.webm' , 'image_3_31_7574.png' ], 
		['video_2_19_30218.webm' , 'image_2_19_30218.png' ], 
		['video_3_24_6812.webm' , 'image_3_24_6812.png' ], 
		['video_1_31_3288.webm' , 'image_1_31_3288.png' ], 
		['video_0_19_11150.webm' , 'image_0_19_11150.png' ], 
		['video_4_19_13397.webm' , 'image_4_19_13397.png' ], 
		['video_3_19_40.webm' , 'image_3_19_40.png' ], 
		['video_0_24_25448.webm' , 'image_0_24_25448.png' ], 
		['video_2_24_31596.webm' , 'image_2_24_31596.png' ], 
		['video_7_31_18610.webm' , 'image_7_31_18610.png' ], 
		['video_0_24_28424.webm' , 'image_0_24_28424.png' ], 
		['video_2_19_16193.webm' , 'image_2_19_16193.png' ], 
		['video_1_2_9964.webm' , 'image_1_2_9964.png' ], 
		['video_4_24_11988.webm' , 'image_4_24_11988.png' ], 
		['video_0_24_17765.webm' , 'image_0_24_17765.png' ], 
		['video_3_19_30020.webm' , 'image_3_19_30020.png' ], 
		['video_2_19_21749.webm' , 'image_2_19_21749.png' ], 
		['video_1_24_29755.webm' , 'image_1_24_29755.png' ], 
		['video_0_9_655.webm' , 'image_0_9_655.png' ], 
		['video_3_19_12938.webm' , 'image_3_19_12938.png' ], 
		['video_1_31_11986.webm' , 'image_1_31_11986.png' ], 
		['video_0_2_8771.webm' , 'image_0_2_8771.png' ], 
		['video_2_31_16054.webm' , 'image_2_31_16054.png' ], 
		['video_1_31_2525.webm' , 'image_1_31_2525.png' ], 
		['video_1_9_10328.webm' , 'image_1_9_10328.png' ], 
		['video_3_2_5386.webm' , 'image_3_2_5386.png' ], 
		['video_1_2_3519.webm' , 'image_1_2_3519.png' ], 
		['video_2_24_15834.webm' , 'image_2_24_15834.png' ], 
		['video_2_24_3036.webm' , 'image_2_24_3036.png' ], 
		['video_0_24_4038.webm' , 'image_0_24_4038.png' ], 
		['video_2_31_18918.webm' , 'image_2_31_18918.png' ], 
		['video_1_2_11068.webm' , 'image_1_2_11068.png' ], 
		['video_2_14_3208.webm' , 'image_2_14_3208.png' ], 
		['video_2_19_26071.webm' , 'image_2_19_26071.png' ], 
		['video_2_31_19691.webm' , 'image_2_31_19691.png' ], 
		['video_2_19_15117.webm' , 'image_2_19_15117.png' ], 
		['video_0_31_1547.webm' , 'image_0_31_1547.png' ], 
		['video_2_31_7461.webm' , 'image_2_31_7461.png' ], 
		['video_0_31_14194.webm' , 'image_0_31_14194.png' ], 
		['video_0_9_1818.webm' , 'image_0_9_1818.png' ], 
		['video_6_14_7028.webm' , 'image_6_14_7028.png' ], 
		['video_0_19_22792.webm' , 'image_0_19_22792.png' ], 
		['video_0_9_4001.webm' , 'image_0_9_4001.png' ], 
		['video_1_19_25531.webm' , 'image_1_19_25531.png' ], 
		['video_2_19_12581.webm' , 'image_2_19_12581.png' ], 
		['video_3_31_6044.webm' , 'image_3_31_6044.png' ], 
		['video_3_31_4843.webm' , 'image_3_31_4843.png' ], 
		['video_4_24_27177.webm' , 'image_4_24_27177.png' ], 
		['video_3_31_2702.webm' , 'image_3_31_2702.png' ], 
		['video_2_24_19211.webm' , 'image_2_24_19211.png' ], 
		['video_1_2_1857.webm' , 'image_1_2_1857.png' ], 
		['video_3_24_6124.webm' , 'image_3_24_6124.png' ], 
		['video_1_19_1560.webm' , 'image_1_19_1560.png' ], 
		['video_4_31_688.webm' , 'image_4_31_688.png' ], 
		['video_1_2_7994.webm' , 'image_1_2_7994.png' ], 
		['video_1_14_3571.webm' , 'image_1_14_3571.png' ], 
		['video_0_24_1944.webm' , 'image_0_24_1944.png' ], 
		['video_3_19_2406.webm' , 'image_3_19_2406.png' ], 
		['video_2_31_6285.webm' , 'image_2_31_6285.png' ], 
		['video_0_24_8095.webm' , 'image_0_24_8095.png' ], 
		['video_1_31_181.webm' , 'image_1_31_181.png' ], 
		['video_3_19_11370.webm' , 'image_3_19_11370.png' ], 
		['video_4_2_2793.webm' , 'image_4_2_2793.png' ], 
		['video_3_9_5264.webm' , 'image_3_9_5264.png' ], 
		['video_3_31_18457.webm' , 'image_3_31_18457.png' ], 
		['video_1_9_9922.webm' , 'image_1_9_9922.png' ], 
		['video_1_2_10948.webm' , 'image_1_2_10948.png' ], 
		['video_1_9_5656.webm' , 'image_1_9_5656.png' ], 
		['video_6_31_9044.webm' , 'image_6_31_9044.png' ], 
		['video_1_24_962.webm' , 'image_1_24_962.png' ], 
		['video_2_24_8270.webm' , 'image_2_24_8270.png' ], 
		['video_3_19_11022.webm' , 'image_3_19_11022.png' ], 
		['video_0_2_6280.webm' , 'image_0_2_6280.png' ], 
		['video_2_31_9682.webm' , 'image_2_31_9682.png' ], 
		['video_3_24_16353.webm' , 'image_3_24_16353.png' ], 
		['video_2_9_6275.webm' , 'image_2_9_6275.png' ], 
		['video_0_9_9472.webm' , 'image_0_9_9472.png' ], 
		['video_3_31_1860.webm' , 'image_3_31_1860.png' ], 
		['video_2_19_4332.webm' , 'image_2_19_4332.png' ], 
		['video_0_9_5567.webm' , 'image_0_9_5567.png' ], 
		['video_0_14_2423.webm' , 'image_0_14_2423.png' ], 
		['video_3_14_1031.webm' , 'image_3_14_1031.png' ], 
		['video_4_24_12273.webm' , 'image_4_24_12273.png' ], 
		['video_2_24_11120.webm' , 'image_2_24_11120.png' ], 
		['video_2_19_702.webm' , 'image_2_19_702.png' ], 
		['video_2_2_1486.webm' , 'image_2_2_1486.png' ], 
		['video_1_2_7174.webm' , 'image_1_2_7174.png' ], 
		['video_0_31_13765.webm' , 'image_0_31_13765.png' ], 
		['video_2_2_290.webm' , 'image_2_2_290.png' ], 
		['video_1_31_16229.webm' , 'image_1_31_16229.png' ], 
		['video_1_31_17158.webm' , 'image_1_31_17158.png' ], 
		['video_2_14_2574.webm' , 'image_2_14_2574.png' ], 
		['video_2_19_25718.webm' , 'image_2_19_25718.png' ], 
		['video_1_24_18674.webm' , 'image_1_24_18674.png' ], 
		['video_2_2_9812.webm' , 'image_2_2_9812.png' ], 
		['video_1_19_30578.webm' , 'image_1_19_30578.png' ], 
		['video_1_2_10516.webm' , 'image_1_2_10516.png' ], 
		['video_0_31_15951.webm' , 'image_0_31_15951.png' ], 
		['video_0_19_16563.webm' , 'image_0_19_16563.png' ], 
		['video_3_19_19917.webm' , 'image_3_19_19917.png' ], 
		['video_0_9_10242.webm' , 'image_0_9_10242.png' ], 
		['video_2_19_6578.webm' , 'image_2_19_6578.png' ], 
		['video_0_24_14255.webm' , 'image_0_24_14255.png' ], 
		['video_4_31_5219.webm' , 'image_4_31_5219.png' ], 
		['video_2_2_10067.webm' , 'image_2_2_10067.png' ], 
		['video_0_24_2522.webm' , 'image_0_24_2522.png' ], 
		['video_0_9_3415.webm' , 'image_0_9_3415.png' ], 
		['video_2_9_1962.webm' , 'image_2_9_1962.png' ], 
		['video_2_2_3020.webm' , 'image_2_2_3020.png' ], 
		['video_1_2_11616.webm' , 'image_1_2_11616.png' ], 
		['video_0_19_29738.webm' , 'image_0_19_29738.png' ], 
		['video_1_2_10175.webm' , 'image_1_2_10175.png' ], 
		['video_1_2_1657.webm' , 'image_1_2_1657.png' ], 
		['video_2_9_4740.webm' , 'image_2_9_4740.png' ], 
		['video_0_14_1450.webm' , 'image_0_14_1450.png' ], 
		['video_1_14_3692.webm' , 'image_1_14_3692.png' ], 
		['video_1_14_2349.webm' , 'image_1_14_2349.png' ], 
		['video_1_19_6368.webm' , 'image_1_19_6368.png' ], 
		['video_3_19_28846.webm' , 'image_3_19_28846.png' ], 
		['video_0_19_592.webm' , 'image_0_19_592.png' ], 
		['video_5_31_11483.webm' , 'image_5_31_11483.png' ], 
		['video_5_19_29899.webm' , 'image_5_19_29899.png' ], 
		['video_1_2_8851.webm' , 'image_1_2_8851.png' ], 
		['video_0_14_4199.webm' , 'image_0_14_4199.png' ], 
		['video_3_24_2929.webm' , 'image_3_24_2929.png' ], 
		['video_0_19_24051.webm' , 'image_0_19_24051.png' ], 
		['video_3_9_2363.webm' , 'image_3_9_2363.png' ], 
		['video_1_9_2064.webm' , 'image_1_9_2064.png' ], 
		['video_4_31_19316.webm' , 'image_4_31_19316.png' ], 
		['video_1_2_10672.webm' , 'image_1_2_10672.png' ], 
		['video_0_24_31777.webm' , 'image_0_24_31777.png' ], 
		['video_3_9_4602.webm' , 'image_3_9_4602.png' ], 
		['video_3_2_2448.webm' , 'image_3_2_2448.png' ], 
		['video_2_24_5825.webm' , 'image_2_24_5825.png' ], 
		['video_2_2_9290.webm' , 'image_2_2_9290.png' ], 
		['video_1_2_7040.webm' , 'image_1_2_7040.png' ], 
		['video_0_31_18167.webm' , 'image_0_31_18167.png' ], 
		['video_2_31_8619.webm' , 'image_2_31_8619.png' ], 
		['video_1_19_10596.webm' , 'image_1_19_10596.png' ], 
		['video_1_24_5053.webm' , 'image_1_24_5053.png' ], 
		['video_2_19_10112.webm' , 'image_2_19_10112.png' ], 
		['video_1_24_17598.webm' , 'image_1_24_17598.png' ], 
		['video_3_31_19567.webm' , 'image_3_31_19567.png' ], 
		['video_3_31_14466.webm' , 'image_3_31_14466.png' ], 
		['video_1_2_4569.webm' , 'image_1_2_4569.png' ], 
		['video_5_31_13665.webm' , 'image_5_31_13665.png' ], 
		['video_1_31_7338.webm' , 'image_1_31_7338.png' ], 
		['video_2_24_1144.webm' , 'image_2_24_1144.png' ], 
		['video_0_9_5811.webm' , 'image_0_9_5811.png' ], 
		['video_3_31_9443.webm' , 'image_3_31_9443.png' ], 
		['video_1_19_13529.webm' , 'image_1_19_13529.png' ], 
		['video_0_24_7313.webm' , 'image_0_24_7313.png' ], 
		['video_2_31_18815.webm' , 'image_2_31_18815.png' ], 
		['video_1_9_1849.webm' , 'image_1_9_1849.png' ], 
		['video_0_19_13817.webm' , 'image_0_19_13817.png' ], 
		['video_0_24_17169.webm' , 'image_0_24_17169.png' ], 
		['video_0_14_1723.webm' , 'image_0_14_1723.png' ], 
		['video_3_9_8045.webm' , 'image_3_9_8045.png' ], 
		['video_2_31_1073.webm' , 'image_2_31_1073.png' ], 
		['video_4_19_15605.webm' , 'image_4_19_15605.png' ], 
		['video_0_14_2.webm' , 'image_0_14_2.png' ], 
		['video_2_14_1851.webm' , 'image_2_14_1851.png' ], 
		['video_4_19_30888.webm' , 'image_4_19_30888.png' ], 
		['video_0_19_15018.webm' , 'image_0_19_15018.png' ], 
		['video_3_19_19417.webm' , 'image_3_19_19417.png' ], 
		['video_1_14_3942.webm' , 'image_1_14_3942.png' ], 
		['video_0_31_14961.webm' , 'image_0_31_14961.png' ], 
		['video_1_24_16955.webm' , 'image_1_24_16955.png' ], 
		['video_4_31_4878.webm' , 'image_4_31_4878.png' ], 
		['video_1_19_19793.webm' , 'image_1_19_19793.png' ], 
		['video_2_19_10778.webm' , 'image_2_19_10778.png' ], 
		['video_1_2_5287.webm' , 'image_1_2_5287.png' ], 
		['video_3_19_19636.webm' , 'image_3_19_19636.png' ], 
		['video_0_19_481.webm' , 'image_0_19_481.png' ], 
		['video_3_2_3123.webm' , 'image_3_2_3123.png' ], 
		['video_1_24_27874.webm' , 'image_1_24_27874.png' ], 
		['video_2_24_17063.webm' , 'image_2_24_17063.png' ], 
		['video_0_31_13502.webm' , 'image_0_31_13502.png' ], 
		['video_4_2_5893.webm' , 'image_4_2_5893.png' ], 
		['video_1_24_22956.webm' , 'image_1_24_22956.png' ], 
		['video_3_31_2368.webm' , 'image_3_31_2368.png' ], 
		['video_1_31_12329.webm' , 'image_1_31_12329.png' ], 
		['video_2_31_7149.webm' , 'image_2_31_7149.png' ], 
		['video_0_9_1489.webm' , 'image_0_9_1489.png' ], 
		['video_1_31_3540.webm' , 'image_1_31_3540.png' ], 
		['video_2_24_3148.webm' , 'image_2_24_3148.png' ], 
		['video_3_31_3839.webm' , 'image_3_31_3839.png' ], 
		['video_3_2_2248.webm' , 'image_3_2_2248.png' ], 
		['video_0_14_6000.webm' , 'image_0_14_6000.png' ], 
		['video_0_31_2.webm' , 'image_0_31_2.png' ], 
		['video_1_24_7461.webm' , 'image_1_24_7461.png' ], 
		['video_0_31_17225.webm' , 'image_0_31_17225.png' ], 
		['video_3_24_176.webm' , 'image_3_24_176.png' ], 
		['video_1_2_172.webm' , 'image_1_2_172.png' ], 
		['video_2_19_27005.webm' , 'image_2_19_27005.png' ], 
		['video_0_2_6553.webm' , 'image_0_2_6553.png' ], 
		['video_1_19_4457.webm' , 'image_1_19_4457.png' ], 
		['video_0_19_28558.webm' , 'image_0_19_28558.png' ], 
		['video_2_19_20231.webm' , 'image_2_19_20231.png' ], 
		['video_2_9_8152.webm' , 'image_2_9_8152.png' ], 
		['video_1_24_7590.webm' , 'image_1_24_7590.png' ], 
		['video_1_2_11751.webm' , 'image_1_2_11751.png' ], 
		['video_1_14_902.webm' , 'image_1_14_902.png' ], 
		['video_3_24_16731.webm' , 'image_3_24_16731.png' ], 
		['video_0_31_13394.webm' , 'image_0_31_13394.png' ], 
		['video_4_31_2572.webm' , 'image_4_31_2572.png' ], 
		['video_1_19_25848.webm' , 'image_1_19_25848.png' ], 
		['video_0_31_11611.webm' , 'image_0_31_11611.png' ], 
		['video_3_24_30685.webm' , 'image_3_24_30685.png' ], 
		['video_2_9_10480.webm' , 'image_2_9_10480.png' ], 
		['video_2_24_8418.webm' , 'image_2_24_8418.png' ], 
		['video_3_24_29635.webm' , 'image_3_24_29635.png' ], 
		['video_1_31_1014.webm' , 'image_1_31_1014.png' ], 
		['video_1_2_4437.webm' , 'image_1_2_4437.png' ], 
		['video_1_31_3432.webm' , 'image_1_31_3432.png' ], 
		['video_0_24_2131.webm' , 'image_0_24_2131.png' ], 
		['video_1_2_2945.webm' , 'image_1_2_2945.png' ], 
		['video_2_19_4007.webm' , 'image_2_19_4007.png' ], 
		['video_3_14_6161.webm' , 'image_3_14_6161.png' ], 
		['video_1_24_95.webm' , 'image_1_24_95.png' ], 
		['video_1_31_7085.webm' , 'image_1_31_7085.png' ], 
		['video_2_14_5386.webm' , 'image_2_14_5386.png' ], 
		['video_3_24_28244.webm' , 'image_3_24_28244.png' ], 
		['video_3_24_31496.webm' , 'image_3_24_31496.png' ], 
		['video_0_24_13286.webm' , 'image_0_24_13286.png' ], 
		['video_2_2_11233.webm' , 'image_2_2_11233.png' ], 
		['video_1_31_16919.webm' , 'image_1_31_16919.png' ], 
		['video_3_24_2586.webm' , 'image_3_24_2586.png' ], 
		['video_2_31_15679.webm' , 'image_2_31_15679.png' ], 
		['video_3_31_5719.webm' , 'image_3_31_5719.png' ], 
		['video_6_19_14888.webm' , 'image_6_19_14888.png' ], 
		['video_5_31_6173.webm' , 'image_5_31_6173.png' ], 
		['video_2_9_7205.webm' , 'image_2_9_7205.png' ], 
		['video_0_9_4405.webm' , 'image_0_9_4405.png' ], 
		['video_2_19_16335.webm' , 'image_2_19_16335.png' ], 
		['video_0_24_10708.webm' , 'image_0_24_10708.png' ], 
		['video_0_24_14657.webm' , 'image_0_24_14657.png' ], 
		['video_2_24_25795.webm' , 'image_2_24_25795.png' ], 
		['video_4_24_8604.webm' , 'image_4_24_8604.png' ], 
		['video_3_31_7803.webm' , 'image_3_31_7803.png' ], 
		['video_2_31_5937.webm' , 'image_2_31_5937.png' ], 
		['video_2_24_14457.webm' , 'image_2_24_14457.png' ], 
		['video_3_19_25353.webm' , 'image_3_19_25353.png' ], 
		['video_0_24_10886.webm' , 'image_0_24_10886.png' ], 
		['video_3_24_16157.webm' , 'image_3_24_16157.png' ], 
		['video_0_31_6801.webm' , 'image_0_31_6801.png' ], 
		['video_1_31_827.webm' , 'image_1_31_827.png' ], 
		['video_0_19_24171.webm' , 'image_0_19_24171.png' ], 
		['video_0_14_5691.webm' , 'image_0_14_5691.png' ], 
		['video_2_19_27209.webm' , 'image_2_19_27209.png' ], 
		['video_3_19_14769.webm' , 'image_3_19_14769.png' ], 
		['video_1_9_9816.webm' , 'image_1_9_9816.png' ], 
		['video_4_31_10144.webm' , 'image_4_31_10144.png' ], 
		['video_3_19_24354.webm' , 'image_3_19_24354.png' ], 
		['video_13_31_11881.webm' , 'image_13_31_11881.png' ], 
		['video_2_2_8584.webm' , 'image_2_2_8584.png' ], 
		['video_1_9_1278.webm' , 'image_1_9_1278.png' ], 
		['video_3_24_22543.webm' , 'image_3_24_22543.png' ], 
		['video_0_14_193.webm' , 'image_0_14_193.png' ], 
		['video_0_24_30409.webm' , 'image_0_24_30409.png' ], 
		['video_4_24_32704.webm' , 'image_4_24_32704.png' ], 
		['video_2_31_7769.webm' , 'image_2_31_7769.png' ], 
		['video_3_19_20688.webm' , 'image_3_19_20688.png' ], 
		['video_2_19_12207.webm' , 'image_2_19_12207.png' ], 
		['video_5_31_12569.webm' , 'image_5_31_12569.png' ], 
		['video_2_19_21269.webm' , 'image_2_19_21269.png' ], 
		['video_2_14_4037.webm' , 'image_2_14_4037.png' ], 
		['video_3_24_22814.webm' , 'image_3_24_22814.png' ], 
		['video_0_19_25222.webm' , 'image_0_19_25222.png' ], 
		['video_1_24_4867.webm' , 'image_1_24_4867.png' ], 
		['video_0_24_2877.webm' , 'image_0_24_2877.png' ], 
		['video_1_31_16429.webm' , 'image_1_31_16429.png' ], 
		['video_1_9_5988.webm' , 'image_1_9_5988.png' ], 
		['video_0_24_10577.webm' , 'image_0_24_10577.png' ], 
		['video_3_31_8934.webm' , 'image_3_31_8934.png' ], 
		['video_6_31_4993.webm' , 'image_6_31_4993.png' ], 
		['video_1_2_11423.webm' , 'image_1_2_11423.png' ], 
		['video_2_19_11229.webm' , 'image_2_19_11229.png' ], 
		['video_1_9_9541.webm' , 'image_1_9_9541.png' ], 
		['video_0_24_21961.webm' , 'image_0_24_21961.png' ], 
		['video_1_14_2855.webm' , 'image_1_14_2855.png' ], 
		['video_0_19_9067.webm' , 'image_0_19_9067.png' ], 
		['video_0_24_23291.webm' , 'image_0_24_23291.png' ], 
		['video_0_14_1608.webm' , 'image_0_14_1608.png' ], 
		['video_2_14_3348.webm' , 'image_2_14_3348.png' ], 
		['video_3_24_21525.webm' , 'image_3_24_21525.png' ], 
		];
		
	stims = _.shuffle(stims);

	var mark_image_trial = function(imagePath, gt) {
		console.log("The video has ended, show image and get annotations")
		document.getElementById("image-heading").style.display = "block"
		document.getElementById("video-control-panel").style.display = "block";
		document.getElementById("image-control-panel").style.display = "block";
		
		var video = document.getElementById("vid");
		trial_duration = video.duration;

		d3.select("#image-container").append("img").attr("id", "image-to-annotate");
		d3.select("#image-to-annotate").attr("src", "../static/stimuli_images/" + imagePath + "");

		var anno = Annotorious.init({
			image: document.getElementById('image-to-annotate'),
			disableEditor: true,
			widgets : [],
			allowEmpty : true
		});
		anno.setVisible(true);
		var done_image = document.getElementById("done-image");
			
		done_image.onmousedown = function() {
			if (anno.getAnnotations().length !== 1) {
				console.log(trial_score);
				psiTurk.recordTrialData({'phase':"TRIAL",
								 'annotations': anno.getAnnotations(),
								 'image_name' : imagePath,
								}); 
				document.getElementById("video-control-panel").style.display = "none";
				document.getElementById("container-exp").style.display = "none";
				document.getElementById("container-instructions").style.display = "block";
			}
			else {
				var box = anno.getAnnotations()[0].target.selector.value.split(":")[1].split(",");
				psiTurk.recordTrialData({'phase':"TRIAL",
								 'annotations': anno.getAnnotations(),
								 'image_name' : imagePath,
								});  
			
				console.log(box);
				if (gt[0] >= parseFloat(box[0]) && gt[0] <= parseFloat(box[0]) + parseFloat(box[2]) && gt[1] >= parseFloat(box[1]) && gt[1] <= parseFloat(box[1]) + parseFloat(box[3])) {
					console.log(trial_score);
					trial_score += 1;
				}
				// else {
				// 	alert("You got the practice round wrong and hence you are being removed from the study.")
				// 	finish(0);
				// }
				document.getElementById("video-control-panel").style.display = "none";
				document.getElementById("container-exp").style.display = "none";
				document.getElementById("container-instructions").style.display = "block";
				console.log(trial_score);
			}
		};
		
		document.getElementById("cont").addEventListener('click', continueClick);
	
		function continueClick(){
			//DEBUG: console.log("continue button pressed");
			//Do not respond to more clicks
			
			document.getElementById("cont").removeEventListener('click', continueClick);
			//go to next stimulus
			d3.select("#sourceComp").remove();
			d3.select("#vid").remove();
			// d3.select("#sourceComp_ego").remove();
			// d3.select("#vid_ego").remove();
			d3.select("#image-to-annotate").remove();
			trial_round();
		}
	};


	var trial_round = function() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		var thresh_score = 2;
		if (trial_stims.length === 0) {
			console.log(trial_score)
			console.log(thresh_score)
			next();
			// if (trial_score >= thresh_score) {
			// 	next();
			// }
			// else {
			// 	finish(0);
			// }
			
		}
		else {
			var play_count = 0;
			var stim = trial_stims.shift();
			document.getElementById("trial-heading").innerHTML = "This is a practice round, if you get this wrong you will be removed from the study. Please watch this video of a driving scenario.";
			document.getElementById("container-exp").style.display = "block";
			document.getElementById("container-instructions").style.display = "none";
			document.getElementById("image-heading").style.display = "none";
			show_stimulus(stim[0]);
			var video = document.getElementById("vid");
			video.onended = function(){
				play_count += 1;
			}
			
			var done = document.getElementById("Done");
                			
			done.onmousedown = function(){
				//DEBUG: 
				if (play_count < 1){
					alert("Pleae watch the complete video atleast once!")
				}
				else{
					console.log("The user is done watching the video");
					mark_image_trial(stim[1], stim[2])	
				}
				console.log(trial_score)
				// const scrollingElement = (document.scrollingElement || document.body);
				// scrollingElement.scrollTop = scrollingElement.scrollHeight;
				// window.scrollTo(0, document.body.scrollHeight);
			}
		}
	};


	var next = function() {
		console.log(stims.length)
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		if (trial_stims.length === 0) {
			// if (stims.length===0) {
			if (vid_count === 16) {

				finish(1);
			}
			else {
				var play_count = 0;
				var stim = stims.shift();
				var stimStartTime, 
					stimPauseTime,
					stimPlayTime;
				
				// if(stim[1] == "show_video"){
				document.getElementById("container-exp").style.display = "block";
				document.getElementById("container-instructions").style.display = "none";
				document.getElementById("image-heading").style.display = "none";
				document.getElementById("trial-heading").innerHTML = "Please watch this video of a driving scenario."
				
				if (vid_count === 15) {
					show_stimulus(final_trial[0]);
				}
				else {
					show_stimulus(stim[0]);			
				}
				var video = document.getElementById("vid");
				video.onended = function(){
					play_count += 1;
				}
				
				// video.play()
				
				// var play_pause = document.getElementById("play-pause");
				// var replay = document.getElementById("replay");
				var done = document.getElementById("Done");
								
				done.onmousedown = function(){
					//DEBUG: 
					if (play_count < 1){
						alert("Pleae watch the complete video atleast once!")
					}
					else{
						console.log("The user is done watching the video");
						if (vid_count === 15) {
							mark_image(final_trial[1])
						}
						else {
							mark_image(stim[1])	
						}
					}
					// const scrollingElement = (document.scrollingElement || document.body);
					// scrollingElement.scrollTop = scrollingElement.scrollHeight;
					// window.scrollTo(0, document.body.scrollHeight);
				}

				// play_pause.onmousedown = function(){
					
				// 	if (typeof stimStartTime == 'undefined'){
				// 		stimStartTime = new Date().getTime(); 
				// 	}
				// 	else {
				// 		stimPlayTime = new Date().getTime(); //Time play begins again
				// 		var pauseTime = stimPlayTime - stimPauseTime; //calculate length of pause
				// 		stimStartTime = stimStartTime + pauseTime; //update start time to compensate for the pause
				// 	}
				// 	if (video.paused) {
				// 		video.play();
				// 		video_ego.play();
				// 		play_pause.innerHTML = "Pause"
				// 	}
				// 	else {
				// 		video.pause();
				// 		video_ego.pause();
				// 		play_pause.innerHTML = "Play"
				// 	}
				// }

				// replay.onmousedown = function(){
				// 	// keep count of replay
				// 	video.pause();
				// 	video_ego.pause();
				// 	video.currentTime = 0;
				// 	video_ego.currentTime = 0;
				// 	play_pause.innerHTML = "Play"
				// }
			}
		}
		else {
			trial_round();
		}
	};
	


	var mark_image = function(imagePath) {
		console.log("The video has ended, show image and get annotations")
		document.getElementById("image-heading").style.display = "block"
		document.getElementById("video-control-panel").style.display = "block";
		document.getElementById("image-control-panel").style.display = "block";
		
		var video = document.getElementById("vid");
		trial_duration = video.duration;
		
		// psiTurk.recordTrialData({'phase':"TRIAL",
		// 						 'IV': stimulus[3],
		// 						 'goaltable': stimulus[4],
		// 						 'viewpoint': stimulus[5],
		// 						 'events':sliderEvents,
		// 						 'condition':mycondition,
		// 						 'videoduraction':trial_duration
		// 						}
		// 					   );            
	

		// var video_name = document.getElementById("#sourceComp").innerHTML
		// d3.select("#sourceComp").remove();
		// d3.select("#vid").remove();

		d3.select("#image-container").append("img").attr("id", "image-to-annotate");
		d3.select("#image-to-annotate").attr("src", "../static/stimuli_images/" + imagePath + "");

		var anno = Annotorious.init({
			image: document.getElementById('image-to-annotate'),
			disableEditor: true,
			widgets : [],
			allowEmpty : true
		});
		anno.setVisible(true);
		var done_image = document.getElementById("done-image");
			

		done_image.onmousedown = function() {
			console.log(anno.getAnnotations());
			psiTurk.recordTrialData({'phase':"TRIAL",
								 'annotations': anno.getAnnotations(),
								 'image_name' : imagePath,
								});  
			// const annotations = anno.getAnnotations();
			// console.log(const_annotations)
			document.getElementById("video-control-panel").style.display = "none";
			document.getElementById("container-exp").style.display = "none";
			document.getElementById("container-instructions").style.display = "block";
		};
		
		document.getElementById("cont").addEventListener('click', continueClick);
	
		function continueClick(){
			//DEBUG: console.log("continue button pressed");
			psiTurk.saveData();
			//Do not respond to more clicks
			
			document.getElementById("cont").removeEventListener('click', continueClick);
			//go to next stimulus
			d3.select("#sourceComp").remove();
			d3.select("#vid").remove();
			// d3.select("#sourceComp_ego").remove();
			// d3.select("#vid_ego").remove();
			d3.select("#image-to-annotate").remove();
			vid_count += 1;
			next();
		}

	};

	var show_stimulus = function(videoPath) {
        // DEBUG: 
		console.log("showing stim: " + videoPath);
		// document.getElementById("trial-heading").innerHTML = "Please watch this video of a driving scenario."

		document.getElementById("image-control-panel").style.display = "none";
		document.getElementById("video-control-panel").style.display = "block";

        d3.select("#video-container").append("video").attr("id", "vid").attr("width","1280").attr("height", "720").attr("controls", "controls");
		d3.select("#vid").append("source").attr("id", "sourceComp").attr("src", "../static/stimuli_videos/" + videoPath + "").attr("type", "video/webm");

		// d3.select("#video-container").append("video").attr("id", "vid_ego").attr("width","1280").attr("height", "720").attr("controls", "controls");
		// d3.select("#vid_ego").append("source").attr("id", "sourceComp_ego").attr("src", "../static/stimuli_ego/" + videoPath + "").attr("type", "video/webm");
	};

	var finish = function(state) {
		currentview = new Questionnaire(state);
	};

	var driving_questionnaire = function() {
		document.getElementById("container-exp").style.display = "none";
		document.getElementById("container-instructions").style.display = "none";
		document.getElementById("container-questionnaire").style.display = "block";
		record_responses = function() {
			var dl_val = "False";
			if ($('#dl').is(":checked")){
				dl_val = "True";
			}
			var exp_ddl = document.getElementById("experience");
			// var exp_value = exp_ddl.value;
			var exp_text = exp_ddl.options[exp_ddl.selectedIndex].text;
			var habit_ddl = document.getElementById("habit");
			// var habit_value = habit_ddl.value;
			var habit_text = habit_ddl.options[habit_ddl.selectedIndex].text;
			var prolific_id = document.getElementById("prolific_id").value; 

			psiTurk.recordTrialData({'phase':'drivingquestionnaire', 'status':'submit', 'dl':dl_val, 'exp':exp_text, 'habit':habit_text, 'pid':prolific_id});
				
			// $('textarea').each( function(i, val) {
			// 	psiTurk.recordUnstructuredData(this.id, this.value);
			// });
			// $('select').each( function(i, val) {
			// 	psiTurk.recordUnstructuredData(this.id, this.value);		
			// });
	
		};
	
		prompt_resubmit = function() {
			document.body.innerHTML = error_message;
			$("#resubmit").click(resubmit);
		};
	
		resubmit = function() {
			document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
			reprompt = setTimeout(prompt_resubmit, 10000);
			
			psiTurk.saveData({
				success: function() {
					console.log("Posted Questionnaire");
					document.getElementById("container-questionnaire").style.display = "none";
					next();
				}, 
				error: prompt_resubmit
			});
		};
	
		psiTurk.recordTrialData({'phase':'drivingquestionnaire', 'status':'begin'});
		
		$("#next").click(function () {
			record_responses();
			psiTurk.saveData({
				success: function(){
					console.log("Posted Questionnaire")
					document.getElementById("container-questionnaire").style.display = "none";
					next();

				}, 
				error: prompt_resubmit});
		});
			
	};

	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	// $("body").focus().keydown(response_handler); 

	// Start the test
	// next();
	driving_questionnaire();
	// next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function(state) {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                psiTurk.computeBonus('compute_bonus', function(){
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 


			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	console.log(state)
	if (state === 1) {
		document.getElementById('code').style.display = 'block';
	}
	else {
		document.getElementById('code').style.display = 'none';
	}
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).on('load', async () => {
	await init;
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new StroopExperiment(); } // what you want to do when you are done with instructions
    );
});
