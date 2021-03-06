$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDu6iT5AwjwhJthAdDCwBUb3UMSYwUQGP8",
        authDomain: "traintracker-2a54b.firebaseapp.com",
        databaseURL: "https://traintracker-2a54b.firebaseio.com",
        projectId: "traintracker-2a54b",
        storageBucket: "traintracker-2a54b.appspot.com",
        messagingSenderId: "559820376683"
    };
    firebase.initializeApp(config);
    var database = firebase.database();


    var trainName = "";
    var trainDestination = "";
    var firstTrainTime = "";
    var trainFrequency = 0;

    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        // variable values that are set via user input
        trainName = $("#trainInput").val().trim();
        trainDestination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainInput").val().trim();
        trainFrequency = $("#frequencyInput").val().trim();


        //this checks to ensure all fields are filled out with something before allowing user to submit
          if (trainName == "" || trainDestination == "" || firstTrainTime == "" || trainFrequency == 0){
              alert("Please fill out all fields!");
              return;
          }

        database.ref().push({

            name: trainName,
            destination: trainDestination,
            firstTrain: firstTrainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {


        var firstTrainTimeConverted = moment(firstTrainTime, 'HH:mm').subtract(1, 'years');
        var diffTime = moment().diff(moment(firstTrainTimeConverted), 'minutes');
        var tRemainder = diffTime % trainFrequency
        var minutesUntilNext = trainFrequency - tRemainder; //Minutes until next arrival
        var nextArrival = moment().add(minutesUntilNext, "minutes").format("HH:mm");
        

        var sv = snapshot.val();
        var emptyTR = $("<tr>")

        var nameTD = $("<td>").text(sv.name);
        var destinationTD = $("<td>").text(sv.destination);
        var frequencyTD = $("<td>").text(sv.frequency);
        var minsUntilTD = $("<td>").text(minutesUntilNext);
        var nextTD = $("<td>").text(nextArrival);


        emptyTR.append(nameTD);
        emptyTR.append(destinationTD);
        emptyTR.append(frequencyTD);
        emptyTR.append(minsUntilTD);
        emptyTR.append(nextTD);


        $("tbody").append(emptyTR);



    });

});