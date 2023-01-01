// Set the initial timer value (in seconds)
let timerValue = 20;

// Create a variable to store the initial timer value
let initialTimerValue = timerValue;

var start_sound = new Audio(chrome.runtime.getURL('start_tone.mp3'));
var sound = new Audio(chrome.runtime.getURL('media_singingbowl.m4a'));

const element = document.querySelector('.fade-in');

 // Fetch the timer value from chrome.storage, using the default initial timer value
 chrome.storage.sync.get({initialTimerValue: initialTimerValue}, function(data) {
  // Set the timer value to the value from chrome.storage
  timerValue = data.initialTimerValue;
  console.log('Timer value is fetched from chrome.storage');
  if (isNaN(timerValue) || timerValue == undefined) {
  console.log("chrome.storage.value is undefined")
  }
  else {
    initialTimerValue = timerValue
    console.log("newInitial timer value was fetched from chrome.storage")
    console.log(initialTimerValue)
    console.log(timerValue)
    console.log(data.timerValue)
  }

  // Update the timer display on the page
  updateTimerDisplay();
});

// Get the start timer button from the page
let startTimerButton = document.getElementById('start-timer-button');
updateTimerDisplay()

// Add a click event listener to the start timer button
startTimerButton.addEventListener('click', function() {
  startTimerButton.style.display = 'none';
  start_sound.play();

  // Start the timer
  startTimer();
});

// Create a function to start the timer
function startTimer() {
  // Set the timer to countdown every 1000ms (1 second)
  let timerInterval = setInterval(function() {
    // Decrement the timer value
    timerValue--;

    // If the timer reaches 0, clear the interval and ask the user if they stayed focused
    if (timerValue <= 0) {
      clearInterval(timerInterval);
      askFocus();
      sound.play();
      timerValue = initialTimerValue
    }

    // Update the timer display on the page
    updateTimerDisplay();
  }, 1000);
}

// Create a function to update the timer display on the page
function updateTimerDisplay() {
  // Get the timer display element from the page
  let timerDisplay = document.getElementById('timer-display');

  // Update the timer display with the current timer value
  timerDisplay.innerHTML = timerValue.toFixed(2);
}

// Create a function to ask the user if they stayed focused
function askFocus() {
  // Get the focus question and yes/no buttons from the page
  let focusQuestion = document.getElementById('focus-question');
  let yesNoButtons = document.getElementById('yes-no-buttons');

  // Show the focus question and yes/no buttons
  focusQuestion.style.display = 'block';
  yesNoButtons.style.display = 'block';
}

// Get the yes and no buttons from the page
let yesButton = document.getElementById('yes-button');
let noButton = document.getElementById('no-button');

// Add click event listeners to the yes and no buttons
yesButton.addEventListener('click', function() {
  // Increase the initial timer value by 10%
  initialTimerValue = initialTimerValue * 1.1;
  // Update the timer value
  timerValue = initialTimerValue;
  chrome.storage.sync.set({initialTimerValue: initialTimerValue}, function() {
    console.log('Timer value is saved to chrome.storage');
    console.log(initialTimerValue);
  });

  // Reset the page
  resetPage();
});

noButton.addEventListener('click', function() {
  // Decrease the initial timer value by 12%
  initialTimerValue = initialTimerValue * 0.88;
  // Update the timer value
  timerValue = initialTimerValue;
  chrome.storage.sync.set({initialTimerValue: initialTimerValue}, function() {
    console.log('Timer value is saved to chrome.storage');
    console.log(initialTimerValue);
  });

  // Reset the page
  resetPage();
});
    // Create a function to reset the page
function resetPage() {
  // Get the start timer button, focus question, and yes/no buttons from the page
  let startTimerButton = document.getElementById('start-timer-button');
  let focusQuestion = document.getElementById('focus-question');
  let yesNoButtons = document.getElementById('yes-no-buttons');
  
  // Hide the focus question and yes/no buttons
  focusQuestion.style.display = 'none';
  yesNoButtons.style.display = 'none';
  
  // Show the start timer button
  startTimerButton.style.display = 'block';
  timerValue = initialTimerValue
  
  // Update the timer display on the page
  updateTimerDisplay();
  }