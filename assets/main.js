console.log("linked")


console.log("linked")


$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAzgG0sZMt1LAEgtRo2m1hhM2N0lFpUfUs",
        authDomain: "train-43603.firebaseapp.com",
        databaseURL: "https://train-43603.firebaseio.com",
        projectId: "train-43603",
        storageBucket: "train-43603.appspot.com",
        messagingSenderId: "939003073896"
    };
    firebase.initializeApp(config);


    let database = firebase.database();

    // get values from forms and set them to a var
    $(".btn").on("click", function () {
        event.preventDefault();
        let name = $("#Name").val().trim();
        let role = $("#dest").val().trim();
        let startDate = $("#fTT").val().trim();
        let rate = $("#freq").val().trim();

        //push values from the forms to the database 
        database.ref().push({
            Name: name,
            role: role,
            startDate: startDate,
            rate: rate


        });

    })



    //when new child is added to data base this function runs
    database.ref().on("child_added", function (data) {
        let snap = data.val();
        //start of moment functions
        // Assumptions
        //create another snap of the data for freq to add to moments
        var tFrequency = snap.rate;

        // Time is 3:30 AM
        var firstTime = snap.startDate;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




        console.log(snap.Name);
        console.log(snap.role);
        console.log(snap.startDate);
        console.log(snap.rate);
        //append the new values to the table
        var monthsBilled = moment(snap.startDate, "MMDDYYYY").fromNow();
        $("tbody").append("<tr><td>" + snap.Name + "</td><td>" + snap.role + "</td><td>" + snap.rate + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td>" + "</td><td>" + tMinutesTillTrain + "</td>")



    })


});