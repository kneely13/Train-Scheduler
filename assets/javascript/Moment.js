$(document).ready( function() {

        // 1.  Initialize Firebase
        var config = {
            apiKey: "AIzaSyCnfg1IruY85LP-1X5s1eT34no4z8JprrU",
            authDomain: "train-scheduler-aec90.firebaseapp.com",
            databaseURL: "https://train-scheduler-aec90.firebaseio.com",
            projectId: "train-scheduler-aec90",
            storageBucket: "",
            messagingSenderId: "34104023857"
        };

        firebase.initializeApp(config);

        var database = firebase.database();
      


    // 2. create button for adding new trains - then update the html + update the database
        //Button for adding trains
        $("#submit").on("click", function(event){
            event.preventDefault();

            //grab user input
            var trainName = $("#input-name").val().trim();
            var trainDestination = $("#input-destination").val().trim();
            var trainDepartTime = $("#input-departTime").val().trim()
            "hh:mm".subtract(1, "years").format("X");

            var trainFrequency = $("#input-frequency").val().trim();


            //current time
	        var currentTime = moment();
            console.log("CURRENT TIME: " +  moment(currentTime).format("hh:mm"));
            
            // Create local "temporary" object for holding train data
            var newTr = {
                name: trainName,
                trainDepart: trainDestination,
                trainArrival: trainArrivalTime,
                frequency: trainFrequency
            };

            // Uploads the new train data to the database
            database.ref().push(newTr);
            
            // Clears all of the text-boxes
            $("#input-name").val("");
            $("#input-destination").val("");
            $("#input-departTime").val("");
            $("#input-frequency").val("");

            return false;
        });


    // 3. Create a way to retrieve employees from the employee database.

        
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        
        console.log(childSnapshot.val());
    
        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().trainDepart;
        var trainArrivalTime = childSnapshot.val().trainArrival;
        var trainFrequency = childSnapshot.val().frequency;
    
        // Employee Info
        // console.log(trainName);
        // console.log(trainDestination);
        // console.log(trainDepartTime);
        // console.log(trainFrequency);
        var trainTime = moment.unix(firstTime).format("hh:mm");
		//calculate difference between times
		var difference =  moment().diff(moment(trainTime),"minutes");
        

                //time apart(remainder)
		var trainRemain = difference % frequency;

		//minutes until arrival
		var minUntil = frequency - trainRemain;

		//next arrival time
		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

		//adding info to DOM table 
		$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minUntil + "</td></tr>");

    })
})

