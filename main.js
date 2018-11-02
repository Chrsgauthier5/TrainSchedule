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

        // variables that are set via user input
        trainName = $("#trainInput").val().trim();
        trainDestination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainInput").val().trim();
        trainFrequency = $("#frequencyInput").val().trim();


        firstTrainTimeConverted = moment(firstTrainTime, 'HH:mm').subtract(1, 'years');
        diffTime = moment().diff(moment(firstTrainTimeConverted), 'minutes');
        console.log(diffTime)
        tRemainder = diffTime % trainFrequency
        minutesUntilNext = trainFrequency - tRemainder; //Minutes until next arrival
        console.log(minutesUntilNext);

        nextArrival = moment().add(minutesUntilNext, "minutes").format("HH:mm");
        console.log(nextArrival);



        this checks to ensure all fields are filled out with something before allowing user to submit
          if (trainName == "" || trainDestination == "" || firstTrainTime == "" || trainFrequency == 0){
              alert("Please fill out all fields!");
              return;
          }

        //   console.log(trainName)
        //   console.log(trainDestination)
        //   console.log(firstTrainTime)
        //   console.log(trainFrequency)

        database.ref().push({

            name: trainName,
            destination: trainDestination,
            firstTrain: firstTrainTime,
            frequency: trainFrequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

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
        emptyTR.append(nextArrival);


        $("tbody").append(emptyTR);



    });

});