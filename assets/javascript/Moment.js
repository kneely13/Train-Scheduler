
    
// Initialize Firebase
    var config = {
        apiKey: "AIzaSyCnfg1IruY85LP-1X5s1eT34no4z8JprrU",
        authDomain: "train-scheduler-aec90.firebaseapp.com",
        databaseURL: "https://train-scheduler-aec90.firebaseio.com",
        projectId: "train-scheduler-aec90",
        storageBucket: "",
        messagingSenderId: "34104023857"
    };

    firebase.initializeApp(config);


























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

      
      
      
      // Assumptions
      var tFrequency = 3;

      // Time is 3:30 AM
      var firstTime = dateFns.setHours(dateFns.setMinutes(new Date(), 30), 03);
      var format = dateFns.format

      console.log(format(firstTime, 'HH:mm'))
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = format(dateFns.subYears(firstTime, 1), 'HH:mm');
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = new Date();
      console.log("CURRENT TIME: " + format(currentTime, "hh:mm"));

      // Difference between the times
      var diffTime = dateFns.differenceInMinutes(new Date(), dateFns.subYears(firstTime, 1));
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = dateFns.addMinutes(new Date(), tMinutesTillTrain);
      console.log("ARRIVAL TIME: " + format(nextTrain, "hh:mm"));
