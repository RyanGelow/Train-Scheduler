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

$(`#submit`).on('click', function(e) {
  e.preventDefault();
  if($(`#train-name`).val() === "" || $(`#current-station`).val() === "" || $(`#train-time`).val() === "" || $(`#train-frequency`).val() === "") {
    $(`.if-error`).text("Add Train - Please fill out form in full");
  }else{  
    var newKey = database.ref().child('schedules').push().key;

    const trainName = $(`#train-name`).val();
    // console.log("Train Name: " + trainName);
    const currentStation = $(`#current-station`).val();
    // console.log("Current Station: " + currentStation);
    const firstTrainTime = $(`#train-time`).val();
    // console.log("1st Train Time: " + firstTrainTime);
    const tFrequency = $(`#train-frequency`).val();
    // console.log("Frequency: " + frequency);

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/schedules/' + newKey] = {
      trainName: trainName,
      currentStation: currentStation,
      firstTrainTime: firstTrainTime,
      frequency: tFrequency,
      closer: "close"
    };

    database.ref().update(updates);
    const clearFillIn = function() {
      $(`#train-name`).val(""); 
      $(`#current-station`).val("");
      $(`#train-time`).val("");
      $(`#train-frequency`).val("");
    }
    clearFillIn();
  }
})

// At the initial load and subsequent value changes, get a snapshot of the stored data. Real-time update when the firebase database changes.
database.ref("/schedules/").on("value", function(snapshot) {
  // console.log(snapshot.val());
  const schedules = snapshot.val()

  // for( let key in snapshot.val() ) {
  //   console.log(key)
  // }
  if (schedules) {
    const result = Object.keys(snapshot.val());
    // console.log(result);
    
    $('.train-input').empty();

    // If Firebase does not have any train values stored, they remain the same as the values we set when we initialized the variables. In either case, we want to log the values to console and display them on the page.
    
    result.forEach( key => {
      // console.log(schedules[key])
      let trainNames = schedules[key].trainName;
      let currentStations = schedules[key].currentStation;
      let firstTrainTimes = schedules[key].firstTrainTime;
      let frequencies = schedules[key].frequency;
      let closers = schedules[key].closers;
      
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
      const $close = $('<td>').addClass("small py-2 px-1")
      const $closeButton = $(`<button>`).attr({
        'type': 'button',
        'data-key': key
        }
      ).addClass(`btn btn-outline-dark btn-sm closer`).text(`X`);
      
      $close.append($closeButton);
      $newTableRow.append($tTrainName).append($cCurrentStation).append($fFrequency).append($nNextArrival).append($mMinutesAway).append($close);
      $('.train-input').append($newTableRow);
      

    })
  }
  // If any errors are experienced, log them to console.
},function(errorObject) {
  // console.log("The read failed: " + errorObject.code);
});
  


$(document).on(`click`, `.closer`, function() {
  // console.log($(this).attr("data-key"));
  database.ref('/schedules/' + $(this).attr("data-key")).remove();
})     
