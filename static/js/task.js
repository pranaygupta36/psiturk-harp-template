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

psiTurk.preloadPages(pages);

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
    console.log("in task.js THE CONDITION IS " + mycondition);
    
    //Set which stimuli they see based on their condition
    // if (mycondition == '0'){ //Condition 0 = Perspective A = Back to door = Closer to Robot
        console.log("Condition 0!");
        stims = [
            //[Stimulus nickname, trial type, stimulus video name (form: pathingMethod_goalTable_Pperspective), pathing method (Omn, SA, SB,or M), goal table (0 = Before Table, 1 = Pespective Table, 2 = Across, 3 = Perpendicular), viewpoint (A or B)]
			// ["Goal: 0, PathMethod: L_who", "show_video", "A_0_PA.mp4", "L_who", "GOAL", "Perspective"]

            ["Goal: 0, PathMethod: LA, View A", "show_video", "video_1.mp4", "2.png", "LA",   "G_ME", "VA"],
            ["Goal: 0, PathMethod: LA, View A", "show_video", "video_2.mp4", "2.png", "LA",   "G_ME", "VA"],
		];

	// var wordon, // time word is presented
	//     listening = false;

	// // Stimuli for a basic Stroop experiment
	// var stims = [
	// 		["SHIP", "red", "unrelated"],
	// 		["MONKEY", "green", "unrelated"],
	// 		["ZAMBONI", "blue", "unrelated"],
	// 		["RED", "red", "congruent"],
	// 		["GREEN", "green", "congruent"],
	// 		["BLUE", "blue", "congruent"],
	// 		["GREEN", "red", "incongruent"],
	// 		["BLUE", "green", "incongruent"],
	// 		["RED", "blue", "incongruent"]
	// 	];

	stims = _.shuffle(stims);

	var next = function() {
		console.log(stims.length)
		if (stims.length===0) {
			finish();
		}
		else {
			var stim = stims.shift();
			var stimStartTime, 
	            stimPauseTime,
                stimPlayTime;
            
            // if(stim[1] == "show_video"){
			document.getElementById("container-exp").style.display = "block";
			document.getElementById("container-instructions").style.display = "none";
			document.getElementById("container-bot-check").style.display = "none";

			show_stimulus(stim[2]);			
			var video = document.getElementById("vid");
			// video.play()
			
			video.onended = function(){
				//DEBUG: 
				console.log("The video has ended");
				mark_image(stim[3])
			}
			var play_pause = document.getElementById("play-pause");
			var replay = document.getElementById("replay");
                			

			play_pause.onmousedown = function(){
				
				if (typeof stimStartTime == 'undefined'){
					stimStartTime = new Date().getTime(); 
				}
				else {
					stimPlayTime = new Date().getTime(); //Time play begins again
					var pauseTime = stimPlayTime - stimPauseTime; //calculate length of pause
					stimStartTime = stimStartTime + pauseTime; //update start time to compensate for the pause
				}
				if (video.paused) {
					video.play();
					play_pause.innerHTML = "Pause"
				}
				else {
					video.pause();
					play_pause.innerHTML = "Play"
				}
			}

			replay.onmousedown = function(){
				// keep count of replay
				video.pause();
				video.currentTime = 0;
				play_pause.innerHTML = "Play"
			}
		}
	};
	


	var mark_image = function(imagePath) {
		console.log("The video has ended, show image and get annotations")
		document.getElementById("trial-heading").innerHTML = "Please draw boxes around the vehicles in the image."
		document.getElementById("video-control-panel").style.display = "none";
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
	
		d3.select("#sourceComp").remove();
		d3.select("#vid").remove();

		d3.select("#media-container").append("img").attr("id", "image-to-annotate");
		d3.select("#image-to-annotate").attr("src", "../static/stimuli_images/" + imagePath + "");

		var anno = Annotorious.init({
			image: document.getElementById('image-to-annotate'),
			// disableEditor: true,
			widgets : [],
			allowEmpty : true
		});
		anno.setVisible(true);
		var done_image = document.getElementById("done-image");
		
		done_image.onmousedown = function() {
			console.log(anno.getAnnotations());
			psiTurk.recordTrialData({'phase':"TRIAL",
								 'annotations': anno.getAnnotations(),
								});  
			// const annotations = anno.getAnnotations();
			// console.log(const_annotations)
			document.getElementById("video-control-panel").style.display = "none";
			document.getElementById("container-exp").style.display = "none";
			document.getElementById("container-instructions").style.display = "block";
			document.getElementById("container-bot-check").style.display = "none";
		};
		
		document.getElementById("cont").addEventListener('click', continueClick);
	
		function continueClick(){
			//DEBUG: console.log("continue button pressed");
			psiTurk.saveData();
			//Do not respond to more clicks
			
			document.getElementById("cont").removeEventListener('click', continueClick);
			//go to next stimulus
			d3.select("#image-to-annotate").remove();
			next();
		}

	};

	var show_stimulus = function(videoPath) {
        // DEBUG: 
		console.log("showing stim: " + videoPath);
		document.getElementById("trial-heading").innerHTML = "Here is a video of a driving scenario."

		document.getElementById("image-control-panel").style.display = "none";
		document.getElementById("video-control-panel").style.display = "block";

        d3.select("#media-container").append("video").attr("id", "vid").attr("width","1280").attr("height", "720").attr("controls", "controls");
		d3.select("#vid").append("source").attr("id", "sourceComp").attr("src", "../static/stimuli_videos/" + videoPath + "");
	};

	var finish = function() {
	    currentview = new Questionnaire();
	};
	
	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	// $("body").focus().keydown(response_handler); 

	// Start the test
	next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

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
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new StroopExperiment(); } // what you want to do when you are done with instructions
    );
});
