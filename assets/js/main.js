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

$(".btn").on("click", function(event){
    event.preventDefault();

    name= $("#exampleName").val();
    destination= $("#exampleDestination").val();
    initialTime= $("#exampleTime").val();
    frequency= $("#exampleFrequency").val();
    console.log(name);
    console.log(destination);
    console.log(initialTime);
    console.log(frequency);

    database.ref().push({
        name:name,
        destination:destination,
        initialTime:initialTime,
        frequency:frequency
    });
    makeDiv();
    $("#exampleName").val("");
    $("#exampleDestination").val("");
    $("#exampleTime").val("");
    $("#exampleFrequency").val("");
});


function makeDiv(){
    $(".trains").append("<tr class='well'><th class='trainName'> " +
        name +
        " </th><td class='destination'> " + destination +
        " </td><td class='frequency'> " + frequency +
        " </td><td class='initialTime'> " + initialTime +
        " </td></tr>");
    };

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
    var firstTime = "03:30";

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