console.log("This worked");

$(document).ready(console.log("Linked jQuery!"));
var name;
var destination;
var initialTime;
var frequency;

var firebaseConfig = {
    apiKey: "AIzaSyD7MNHs02XbXXGvFYxMIH0vy9WsDT46dL4",
    authDomain: "trainscheduler-f3908.firebaseapp.com",
    databaseURL: "https://trainscheduler-f3908.firebaseio.com",
    projectId: "trainscheduler-f3908",
    storageBucket: "",
    messagingSenderId: "413725293180",
    appId: "1:413725293180:web:8169c4d9ee7ab6ef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


database.ref().on("child_added", function makeDiv(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().destination);
    console.log(snapshot.val().initialTime);
    console.log(snapshot.val().frequency);
    var tFrequency = snapshot.val().frequency;

    // Time is 3:30 AM
    var firstTime = snapshot.val().initialTime;

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
    // Change the HTML to reflect
    $(".trains").append("<tr class='well'><th class='trainName'> " +
        snapshot.val().name +
        " </th><td class='destination'> " + snapshot.val().destination +
        " </td><td class='frequency'> " + snapshot.val().frequency +
        " </td><td class='nextArrival'> " + moment(nextTrain).format("hh:mm") + "<td class='minutesAway'> " + tMinutesTillTrain +
        " </td></tr>");


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//   dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#name-display").text(snapshot.val().name);
//     $("#email-display").text(snapshot.val().email);
//     $("#age-display").text(snapshot.val().age);
//     $("#comment-display").text(snapshot.val().comment);
//   });

$(".btn").on("click", function (event) {
    event.preventDefault();

    name = $("#exampleName").val();
    destination = $("#exampleDestination").val();
    initialTime = $("#exampleTime").val();
    frequency = $("#exampleFrequency").val();
    console.log(name);
    console.log(destination);
    console.log(initialTime);
    console.log(frequency);

    database.ref().push({
        name: name,
        destination: destination,
        initialTime: initialTime,
        frequency: frequency,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#exampleName").val("");
    $("#exampleDestination").val("");
    $("#exampleTime").val("");
    $("#exampleFrequency").val("");
});



