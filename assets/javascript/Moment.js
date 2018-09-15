
    
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
    var format = dateFns.format();


// 2. create button for adding new employees - then update the html + update the database
    //Button for adding trains
    $("#submit").on("click", function(event){
        event.preventDefault();

        //grab user input
        var trainName = $("#input-name").val().trim();
        var trainDestination = $("#input-destination").val().trim();
        var trainDepartTime = $("#input-departTime").val().trim();
        var trainFrequency = $("#input-frequency").val().trim();

        // Create local "temporary" object for holding train data
        var newTr = {
            name: trainName,
            destination: trainDestination,
            time: trainDepartTime,
            frequency: trainFrequency
        }

        // Uploads train data to the database
        database.ref().push(newTr);


        // Logs everything to console
        console.log(newTr.name);
        console.log(newTr.destination);
        console.log(newTr.time);
        console.log(newTr.frequency);

        alert("Train successfully added");


        // Clears all of the text-boxes
        $("#input-name").val("");
        $("#input-destination").val("");
        $("#input-departTime").val("");
        $("#input-frequency").val("");

    })


// 3. Create a way to retrieve employees from the employee database.

    
    database.ref().on("child_added", function(childSnapshot) {
    
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainDepartTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainDepartTime);
    console.log(trainFrequency);
  
    // Assumptions
    var trainFrequency = 3;

    // Time is 3:30 AM
    var trainDepartTime = dateFns.setHours(dateFns.setMinutes(new Date(), 30), 03);
    var format = dateFns.format

    console.log(format(trainDepartTime, 'HH:mm'))


    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainDepartTimeConverted = format(dateFns.subYears(trainDepartTime, 1), 'HH:mm');
    console.log(trainDepartTimeConverted);

    // Current Time
    var currentTime = new Date();
    console.log("CURRENT TIME: " + format(currentTime, "hh:mm"));

    // Difference between the times
    var diffTime = dateFns.differenceInMinutes(new Date(), dateFns.subYears(trainDepartTime, 1));
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // Minute Until Train
    var trainMinutesTillTrain = trainFrequency - trainRemainder;
    console.log("MINUTES TILL TRAIN: " + trainMinutesTillTrain);

    // Next Train
    var nextTrain = dateFns.addMinutes(new Date(), trainMinutesTillTrain);
    console.log("ARRIVAL TIME: " + format(nextTrain, "hh:mm"));

    var trainDepartTime = dateFns.differenceInMonths(new Date(), trainDepartTime)
  console.log(trainDepartTime);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newTrain = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainDepartTime),
    $("<td>").text(trainFrequency)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
    




// Assume the following situations.

      // (TEST 1)
      // First Train of the Day is 3:00 AM
      // Assume Train comes every 3 minutes.
      // Assume the current time is 3:16 AM....
      // What time would the next train be...? (Use your brain first)
      // It would be 3:18 -- 2 minutes away

      // (TEST 2)
      // First Train of the Day is 3:00 AM
      // Assume Train comes every 7 minutes.
      // Assume the current time is 3:16 AM....
      // What time would the next train be...? (Use your brain first)
      // It would be 3:21 -- 5 minutes away


      // ==========================================================

      // Solved Mathematically
      // Test case 1:
      // 16 - 00 = 16
      // 16 % 3 = 1 (Modulus is the remainder)
      // 3 - 1 = 2 minutes away
      // 2 + 3:16 = 3:18

      // Solved Mathematically
      // Test case 2:
      // 16 - 00 = 16
      // 16 % 7 = 2 (Modulus is the remainder)
      // 7 - 2 = 5 minutes away
      // 5 + 3:16 = 3:21

      
      
      
      