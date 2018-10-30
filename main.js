$(document).ready(function () {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAhHyAsOw0UWZ5eyaxCL7CkFkDprQYOneY",
        authDomain: "employee-timecard-ad296.firebaseapp.com",
        databaseURL: "https://employee-timecard-ad296.firebaseio.com",
        projectId: "employee-timecard-ad296",
        storageBucket: "employee-timecard-ad296.appspot.com",
        messagingSenderId: "613059034204"
    };

    firebase.initializeApp(config);
    var database = firebase.database();


    var nameInput = "";
    var roleInput = "";
    var dateInput = "";
    var rateInput = 0;

    $("#submitButton").on("click", function (event) {
        event.preventDefault();

        nameInput = $("#nameInput").val().trim();
        roleInput = $("#roleInput").val().trim();
        dateInput = $("#dateInput").val().trim();
        rateInput = $("#rateInput").val().trim();

        database.ref().push({

            name: nameInput,
            role: roleInput,
            startDate: dateInput,
            monthlyRate: rateInput,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    })

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

        var sv = snapshot.val();

        var emptyTR = $("<tr>")
        var dateConverted = moment(sv.dateAdded).format("MM DD YYYY");
        console.log(dateConverted)
        console.log(moment().diff(sv.startDate, "months"))
        var monthsWorked = moment().diff(sv.startDate, "months")
        
        
        var nameTD = $("<td>").text(sv.name);
        var roleTD = $("<td>").text(sv.role);
        var dateTD = $("<td>").text(sv.startDate);
        var rateTD = $("<td>").text("$" + sv.monthlyRate);
        var monthsTD = $("<td>").text(monthsWorked + " months");
        var totalBilled = $("<td>").text("$" + monthsWorked * sv.monthlyRate)

        emptyTR.append(nameTD);
        emptyTR.append(roleTD);
        emptyTR.append(dateTD);
        emptyTR.append(rateTD);
        emptyTR.append(monthsTD)
        emptyTR.append(totalBilled)
        // emptyTR.append("<td>").text(sv.startDate);
        // emptyTR.append("<td>").text(sv.rateInput);

        $("tbody").append(emptyTR);



    })



});