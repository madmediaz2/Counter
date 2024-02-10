console.log('main.js loaded');

var redButton = document.getElementById('button--red');
var greenButton = document.getElementById('button--green');
var counter = document.getElementById('counter--value');
var assertText = document.getElementById('counter--assert');

var count = 0;
var minValue = 0;
var maxValue = 10;
var interval = null;
var decrement = -1;
var increment = 1;


//update counter innertext
function updateCounter() {
    counter.innerText = count;
}

//update assert text
function updateAssertText(message) {
    assertText.innerText = message;
    setTimeout(() => {
        assertText.innerText = ""; //reset assert text
    }, 5000); // 5 seconds timeout to clear the message
}

//assert function
function assert(condition, message) {
    if (!condition) {
        console.error(message); //log assertion error message
        clearInterval(interval); //clear interval
        updateAssertText(message);
        count = 0;
        updateCounter();
    }
}

//update counter value
function modifyCount(amount) {
    count += amount; //increment or decrement count
    updateCounter();
    if (count < minValue || count > maxValue) {
        assert(false, `Count: ${count} should be between ${minValue} and ${maxValue}.`);
    }
}

counter.innerText = count; //set initial value of counter


//mouse button click events
redButton.addEventListener('mousedown', function () {
    modifyCount(decrement);
    interval = setInterval(() => modifyCount(decrement), 200);
});


greenButton.addEventListener('mousedown', function () {
    modifyCount(increment);
    interval = setInterval(() => modifyCount(increment), 200);
});


//keyboard events
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown' || event.key === 'Backspace') {
        modifyCount(decrement);
        
    } 
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        modifyCount(increment);
    }
});


//clearing intervals

//clearing intervals redbutton whenmouse up or when mouse leaves the button
redButton.addEventListener('mouseup', function () {
    clearInterval(interval);
});

redButton.addEventListener('mouseleave', function () {
    clearInterval(interval);
});

//clearing intervals greenbutton whenmouse up or when mouse leaves the button
greenButton.addEventListener('mouseup', function () {
    clearInterval(interval);
});

greenButton.addEventListener('mouseleave', function () {
    clearInterval(interval);
});

