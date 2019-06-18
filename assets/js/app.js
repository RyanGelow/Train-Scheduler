// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCq7A6VJ3M3Xxzft2R1SO3gg25MZ6HJcjw",
    authDomain: "train-schedule-b14a9.firebaseapp.com",
    databaseURL: "https://train-schedule-b14a9.firebaseio.com",
    projectId: "train-schedule-b14a9",
    storageBucket: "",
    messagingSenderId: "770475777658",
    appId: "1:770475777658:web:9c352da5a9809bc8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();


let currentTime = $(`#time`).text(`${moment().format('h:mm')}`);

let trainName = "";
let currentStation = "";
let firstTrainTime = "";
let frequency = 0;

let firstTrainTimeValue = moment().valueOf(firstTrainTime, 'hmm');
let currentTimeValue = moment().valueOf()

$(`#submit`).on('click', function() {
  if($(`#train-name`).val() === "") {
    $(`#train-name`).text("Please fill out form");
    break;
  }if($(`#current-station`).val() === "") {
    $(`#current-station`).text("Please fill out form");
    break;
  }if($(`#train-time`).val() === "") {
    $(`#train-time`).text("Please fill out form");
    break;
  }if($(`#train-frequency`).val() === "") {
    $(`#train-frequency`).text("Please fill out form");
    break;
  }else{
  trainName = $(`#train-name`).val();
  console.log(trainName);
  currentStation = $(`#current-station`).val();
  console.log(currentStation);
  firstTrainTime = $(`#train-time`).val();
  console.log(firstTrainTime);
  frequency = $(`#train-frequency`).val();
  console.log(frequency);
  console.log(firstTrainTimeValue);
  console.log(currentTimeValue);
  }
});

// could be 123 for 1:23 or 1234 for 12:34 HH:mm is military time
// parseInt(moment('12:34','HH:mm').format('hmm')); === 1234


// let firstTrainTimeFormat = moment("hmm").format("HH:mm")
// let firstTrainTimeValue = moment().valueOf(firstTrainTime, 'hmm');
// let currentTimeFormat = moment().format('HH:mm');
// let currentTimeValue = moment().valueOf()
// let nextArrival = (currentTimeValue - firstTrainTimeValue)/frequency 
// let minutesAway = 


// database.ref().on("value", function(snapshot) {
//     if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("firstTrainTime").exists() && snapshot.child("frequency").exists()) {

//         trainName = snapshot.val().trainTime;
//         destination = snapshot.val().destination;
//         frequency = snapshot.val().frequency;
//         firstTrainTime = snapshot.val().firstTrainTime;
//         nextArrival = trainName

//     }
// })



// database.ref().on("child_added", function(snapshot) {

// })

//         // Capture Button Click
//     $("#add-user").on("click", function(event) {
//         event.preventDefault();
  
//         // Grabbed values from text boxes
//         name = $("#name-input").val().trim();
//         email = $("#email-input").val().trim();
//         age = $("#age-input").val().trim();
//         comment = $("#comment-input").val().trim();
  
//         // Code for handling the push
//         database.ref().push({
//           name: name,
//           email: email,
//           age: age,
//           comment: comment,
//           dateAdded: firebase.database.ServerValue.TIMESTAMP
//         });
  
//       });
  
//       // Firebase watcher .on("child_added"
//       database.ref().on("child_added", function(snapshot) {
//         // storing the snapshot.val() in a variable for convenience
//         var sv = snapshot.val();
  
//         // Console.loging the last user's data
//         console.log(sv.name);
//         console.log(sv.email);
//         console.log(sv.age);
//         console.log(sv.comment);
  
//         // Change the HTML to reflect
//         $("#name-display").text(sv.name);
//         $("#email-display").text(sv.email);
//         $("#age-display").text(sv.age);
//         $("#comment-display").text(sv.comment);
  
//         // Handle the errors
//       }, function(errorObject) {
//         console.log("Errors handled: " + errorObject.code);
//       });
  