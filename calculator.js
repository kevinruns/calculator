
// Calculator functions

function add(...nums) {
    return nums.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
}


function substract(a, b) {
    return a - b;
}

function multiply(...nums) {
    return nums.reduce((prev, curr) => {
        return prev * curr;
    }, 1);
}

function divide(a, b) {
    if (b === 0) {
        console.log("ERROR: Can't divide by zero");
        return 0;
    }
    return a / b;
}



// round decimals
function fixDecimal(numStr) {

    num = Number(numStr);
    numRound = Math.round(num * 100) / 100;
    if ((numRound * 10) % 1 != 0) {
        return numRound.toFixed(2);
    } else if (numRound % 1 != 0) {
        return numRound.toFixed(1);
    } else {
        return numRound;
    }

}


// take input string and run operation
function processOperation(inputStr) {

    console.log("Processing string: " + inputStr);
    const len = inputStr.length;
    let firstNum = "";
    let op = "";
    let secondNum = "";

    for (i = 0; i < len; i++) {
        let char = inputStr[i];
        if ((char === '-') && (firstNum === "")) {
            firstNum = firstNum.concat(char);
        } else if ((char >= '0' && char <= '9') || (char === '.')) {
            if (op === "") {
                firstNum = firstNum.concat(char);
            } else {
                secondNum = secondNum.concat(char);
            }
        } else {
            if (secondNum) {
                firstNum = window[op](Number(firstNum), Number(secondNum));
                secondNum = "";
            }
            if (char === "+") {
                op = "add";
            } else if (char === "x") {
                op = "multiply";
            } else if (char === "-") {
                op = "substract";
            } else if (char === "÷") {
                op = "divide";
            }
        }
    }

    //   console.log(op, firstNum, secondNum);
    if (firstNum && secondNum && op) {
        let outVal = window[op](Number(firstNum), Number(secondNum));
        console.log("Return value: " + fixDecimal(outVal));
        return (fixDecimal(outVal));
    } else {
        console.log("INPUT ERROR");
    }

}


// process keyboard input
function processKeyInput(event) {

    let inChar = "";
    console.log("event:" + event.keyCode);
    console.log("event:" + event.key);

    if (event.keyCode === 8) {
        inChar = "⌫";
    } else if ((event.keyCode === 13) || (event.keyCode === 187)) {
        inChar = "=";
    } else if ((event.key === "+") || (event.key === "-")) {
        inChar = event.key;
    } else if ((event.key >= 0) && (event.key <= 9)) {
        inChar = event.key;
    } else if ((event.key === "*") || (event.key === "x")) {
        inChar = "x";
    } else {
        inChar = "";
    }
    console.log("inchar " + inChar);
    return inChar;
}

// update display string; 
// process string if has equals
function updateDisplay(inChar, displayStr, clearAfterAnswer) {

    if (clearAfterAnswer) {
        displayStr = "";
        clearAfterAnswer = false;
    }
    if ((inChar === "C") || (inChar === "AC")) {
        displayStr = "";
        inChar = "";
    } else if (inChar === "=") {
        displayStr = processOperation(displayStr);
        clearAfterAnswer = true;
    } else if (inChar === "⌫") {
        displayStr = displayStr.slice(0, -1);
    } else if (inChar === "±") {
        displayStr = String(Number(displayStr) * -1);
    } else {
        displayStr = displayStr.concat(inChar);
    }
    return [displayStr, clearAfterAnswer];
}

