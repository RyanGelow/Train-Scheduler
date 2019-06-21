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

const currentTime = $(`#time`).text(`${moment().format('h:mm')}`);

const trainName = $(`#train-name`).val();
// console.log("Train Name: " + trainName);

const currentStation = $(`#current-station`).val();
// console.log("Current Station: " + currentStation);

const firstTrainTime = $(`#train-time`).val();
// console.log("1st Train Time: " + firstTrainTime);
const frequency = $(`#train-frequency`).val();
// console.log("Frequency: " + frequency);

// At the initial load and subsequent value changes, get a snapshot of the stored data. Real-time update when the firebase database changes.
database.ref("/schedules/").on("value", function(snapshot) {
  console.log(snapshot.val());
  const schedules = snapshot.val()

  // for( let key in snapshot.val() ) {
  //   console.log(key)
  // }
  const result = Object.keys( snapshot.val() )
  console.log( result )

  result.forEach( key => {
    console.log(schedules[key])
    let trainNames = schedules[key].trainName;
    let currentStations = schedules[key].currentStation;
    let firstTrainTimes = schedules[key].firstTrainTime;
    let frequencies = schedules[key].frequency;

    // Comparable value for first train's time 
    let firstTrainTimeValue = moment(firstTrainTimes, "h:mm").subtract(1, "years");
    
    // Difference between the times
    const diffTime = moment().diff(moment(firstTrainTimeValue), "minutes");
    
    // Time apart (remainder)
    const tRemainder = diffTime % frequencies;
    
    // Minute Until Train
    const minutesAway = frequencies - tRemainder;
    
    // Next Train
    const nextArrivalMoment = moment().add(minutesAway, "minutes");
    const nextArrival = moment(nextArrivalMoment).format("hh:mm");
    
    const $newTableRow = $('<tr>');
    const $tTrainName = $('<td>').addClass("small").text(trainNames);
    const $cCurrentStation = $('<td>').addClass("small").text(currentStations);
    const $fFrequency = $('<td>').addClass("small").text(frequencies);
    const $nNextArrival = $('<td>').addClass("small").text(nextArrival);
    const $mMinutesAway = $('<td>').addClass("small").text(minutesAway);
    
    $newTableRow.append($tTrainName).append($cCurrentStation).append($fFrequency).append($nNextArrival).append($mMinutesAway)
    $('.train-input').append($newTableRow);
  
  } )



  // If Firebase has a highPrice and highBidder stored, update our client-side variables
  // if (snapshot.child("trainName").exists() && snapshot.child("currentStation").exists() && snapshot.child("firstTrainTime").exists() && snapshot.child("frequency").exists()) {
    
    // If Firebase does not have any train values stored, they remain the same as the values we set when we initialized the variables.
    // In either case, we want to log the values to console and display them on the page.
    
    /*
    database.train-schedule-b14a9.forEach(function(trainName, currentStation, firstTrainTime, frequency) {
      let trainNames = snapshot.val().trainName;
      let currentStations = snapshot.val().currentStation;
      let firstTrainTimes = snapshot.val().firstTrainTime;
      let frequencies = snapshot.val().frequency;
      
      // Comparable value for first train's time 
      let firstTrainTimeValue = moment(firstTrainTimes, "h:mm").subtract(1, "years");
    
      // Difference between the times
      const diffTime = moment().diff(moment(firstTrainTimeValue), "minutes");
      
      // Time apart (remainder)
      const tRemainder = diffTime % frequencies;
      
      // Minute Until Train
      const minutesAway = frequencies - tRemainder;
      
      // Next Train
      const nextArrivalMoment = moment().add(minutesAway, "minutes");
      const nextArrival = moment(nextArrivalMoment).format("hh:mm");
      
      const $newTableRow = $('<tr>');
      const $tTrainName = $('<td>').addClass("small").text(trainNames);
      const $cCurrentStation = $('<td>').addClass("small").text(currentStations);
      const $fFrequency = $('<td>').addClass("small").text(frequencies);
      const $nNextArrival = $('<td>').addClass("small").text(nextArrival);
      const $mMinutesAway = $('<td>').addClass("small").text(minutesAway);
      
      $newTableRow.append($tTrainName).append($cCurrentStation).append($fFrequency).append($nNextArrival).append($mMinutesAway)
      $('.train-input').append($newTableRow);
    })
    */


// If any errors are experienced, log them to console.
},function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});



$(`#submit`).on('click', function(e) {
  e.preventDefault();
  if($(`#train-name`).val() === "" || $(`#current-station`).val() === "" || $(`#train-time`).val() === "" || $(`#train-frequency`).val() === "") {
    $(`.if-error`).text("Add Train - Please fill out form in full");
  }else{
    let trainName = $(`#train-name`).val();
    console.log(trainName);
    let currentStation = $(`#current-station`).val();
    console.log(currentStation);
    let firstTrainTime = $(`#train-time`).val();
    console.log(firstTrainTime);
    let tFrequency = $(`#train-frequency`).val();
    console.log(tFrequency);

    // database.ref().set({
    //   trainName: trainName,
    //   currentStation: currentStation,
    //   firstTrainTime: firstTrainTime,
    //   frequency: tFrequency
    // });

    var newKey = database.ref().child('schedules').push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/schedules/' + newKey] = {
      trainName: trainName,
      currentStation: currentStation,
      firstTrainTime: firstTrainTime,
      frequency: tFrequency
    };

    database.ref().update(updates);


    let firstTrainTimeValue = moment(firstTrainTime, "h:mm").subtract(1, "years");
    console.log("First Train Time Value: " + firstTrainTimeValue);
    let currentTimeValue = moment()
    console.log("Current Time Value: " + currentTimeValue);

    
    // Difference between the times
    const diffTime = moment().diff(moment(firstTrainTimeValue), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    const tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    const minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    const nextArrivalMoment = moment().add(minutesAway, "minutes");
    const nextArrival = moment(nextArrivalMoment).format("hh:mm");
    console.log("ARRIVAL TIME: " + nextArrival);

    const $newTableRow = $('<tr>');
    const $tTrainName = $('<td>').addClass("small").text(trainName);
    const $cCurrentStation = $('<td>').addClass("small").text(currentStation);
    const $fFrequency = $('<td>').addClass("small").text(tFrequency);
    const $nNextArrival = $('<td>').addClass("small").text(nextArrival);
    const $mMinutesAway = $('<td>').addClass("small").text(minutesAway);
    
    $newTableRow.append($tTrainName).append($cCurrentStation).append($fFrequency).append($nNextArrival).append($mMinutesAway)
    $('.train-input').append($newTableRow);
  }
});



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
  