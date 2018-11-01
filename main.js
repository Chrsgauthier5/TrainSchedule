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
  
          trainName = $("#trainInput").val().trim();
          trainDestination = $("#destinationInput").val().trim();
          firstTrainTime = $("#firstTrainInput").val().trim();
          trainFrequency = $("#frequencyInput").val().trim();
  
          if (trainName == "" || trainDestination == "" || firstTrainTime == "" || trainFrequency == 0){
              alert("Please fill out all fields!");
              return;
          }
  
          console.log(trainName)
          console.log(trainDestination)
          console.log(firstTrainTime)
          console.log(trainFrequency)
  
          database.ref().push({
  
              name: trainName,
              destination: trainDestination,
              firstTrain: firstTrainTime,
              frequency: trainFrequency,
              dateAdded: firebase.database.ServerValue.TIMESTAMP
          });
      })
  
      database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  
          var sv = snapshot.val();
  
          var emptyTR = $("<tr>")
          var dateConverted = moment(sv.dateAdded).format("MM DD YYYY");
          console.log(dateConverted)
          console.log(moment().diff(sv.startDate, "months"))
          monthsWorked = moment().diff(sv.startDate, "months")
          
          
          var nameTD = $("<td>").text(sv.name);
          var destinationTD = $("<td>").text(sv.destination);
          var firstTrainTD = $("<td>").text(sv.firstTrain);
          var frequencyTD = $("<td>").text(sv.frequency);
          // var nextArrivalTD = $("<td>").text(monthsWorked + " months");
          // var minsUntilTD = $("<td>").text("$" + monthsWorked * sv.monthlyRate)
  
          emptyTR.append(nameTD);
          emptyTR.append(destinationTD);
          emptyTR.append(firstTrainTD);
          emptyTR.append(frequencyTD);
          // emptyTR.append(monthsTD)
          // emptyTR.append(totalBilled)
          // emptyTR.append("<td>").text(sv.startDate);
          // emptyTR.append("<td>").text(sv.rateInput);
  
          $("tbody").append(emptyTR);
  
  
  
      });
  
  });