var func = "", result= "", prevEntry = "", decimalCheck = false; //checks if a decimal point have entered to number to prevent double entry;
const regex = /[0-9]+/g;
const regex0 = /\b0*((\d+\.\d+|\d+))\b/g;
const lastNumRegex = /(\d*\.?\d+)$/g;
//check for unecessary 0
$(document).ready(function () {
    //mouse events
    $("button").click(function(){
        buttons($(this).attr("value"));
    });
    //keyboard events
    $(window).keypress (function (evt) {
        var value = "";
        switch (evt.which) {
            case 44:
            case 46:
                value = ".";
                break;
            case 48:
                value = "0";
                break;
            case 49:
                value = "1";
                break;
            case 50:
                value = "2";
                break;
            case 51:
                value = "3";
                break;
            case 52:
                value = "4";
                break;
            case 53:
                value = "5";
                break;
            case 54:
                value = "6";
                break;
            case 55:
                value = "7";
                break;
            case 56:
                value = "8";
                break;
            case 57:
                value = "9";
                break;
            case 47:
                value = "/";
                break;
            case 42:
                value = "*";
                break;
            case 45:
                value = "-";
                break;
            case 43:
                value = "+";
                break;
            case 13:
                value = "=";
                break;
            default:
                break;
        }
        buttons(value);
    });
});


function buttons(val) {
    if (result == "Not compute!") {
        reset();
    }
    switch (val) {
        case "AC":
        //reset
            reset();
            break;
        case "CE":
        //delete last entry
            func = func.slice(0, -1);
            break;
        case "+/-":
            if (prevEntry.match(regex)){
                // checks if it is a number but not =
                var lastNum = func.match(lastNumRegex);
                func = func.slice(0, -lastNum[0].length) + "-(" + lastNum + ") ";
            }
            else if (result !== "") {
                result *= -1;
            }
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            if (result !== ""){
                //checks if we called the = before
                func = result + val;
                result = "";
            }else if (!prevEntry.match(regex)) {
                //prevents 2 symbols in row
                func = func.slice(0, -1) + val; 
            } else {
                func += val;
            }
            decimalCheck = false;
            break;
        case "=":
        //updates result
            prevEntry = "="; 
            //check for = for the +/-
            calculate(func);
            decimalCheck = false;
            break;
        case ".":
            if (result !== "") {
                reset();
            }
            if (!decimalCheck) {
                func += val;
                decimalCheck = true;
            }
            break;
        default:
        if (result !== ""){
            reset();    
        }
        func += val;
        break;
    }
    //remove unecessary 0s
    func = func.replace(regex0, "$1");
    display(func, result);
   if (prevEntry != "=") {
       prevEntry = func.slice(-1);
    }
    
}

function display(f,r) {
    //display the result and function to the screen
    
    if (r.toString().length > 13) {
        $("#result").html("Digit Limit Met");
    } else if (result == ""){
        $("#result").html("0");
    } else { 
        $("#result").html(r);
    }
    
    if (f.length > 28) {
        $("#calculation").html("Digit Limit Met");
    } else if (f != "") {
        $("#calculation").html(f);
    } else {
        $("#calculation").html("");
    }
}

function calculate(f) {
    //do the maths
    if (!prevEntry.match(regex) && prevEntry != "=") {
        //prevents error if last entry is not number
        func = func.slice(0, -1);
    }
    result = parseFloat(eval(func).toFixed(10));
    if (result == Infinity || result == -Infinity || result == NaN || func == "0/0") {
        result = "Not compute!";
    }
    func += "=" + result;
    display(func, result);
}

function reset() {
    //resets the calculator
    func = "";
    result = "";
    prevEntry = "";
    decimalCheck = false;
}