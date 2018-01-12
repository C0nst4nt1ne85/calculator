var func = "", result= 0, prevEntry = "", decimalCheck = false; //checks if a decimal point have entered to number to prevent double entry;
const regex = /[0-9]/g;

$(document).ready(function () {
    //mouse events
    $("button").click(function(){
        buttons($(this).attr("value"));
    });
    //keyboard events
    $(window).keypress (function (evt) {
        console.log(evt.which);
        var value = "";
        switch (evt.which) {
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
        console.log(value);
        buttons(value);
    });
});


function buttons(val) {
    
    switch (val) {
        case "AC":
        //reset
            reset();
            break;
        case "CE":
        //delete last entry
            func = func.slice(0, -1);
            break;
        case "-/+":
        //change the sign of the result
            result *= -1;
            break;
        case "/":
        case "*":
        case "-":
        case "+":
            if (result != 0){
                //checks if we called the = before
                func = result + val;
                result = 0;
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
            calculate(func);
            decimalCheck = false;
            break;
        case ".":
            if (result != 0) {
                reset();
            }
            if (!prevEntry.match(regex) && !decimalCheck) {
                func +="0" + val;
                decimalCheck = true;
            } else if (prevEntry.match(regex) && !decimalCheck) {
                func += val;
                decimalCheck = true;
            }
            break;
        case "0":
            if (!prevEntry.match(regex)) {
                break;
            } else {
                func += val;
            }
            
            break;
        default:
        //numbers except 0
        if (result != 0){
            reset();    
        }
        func += val;
        break;
    }
    display(func, result);
    prevEntry= func.slice(-1);
}

function display(f,r) {
    //display the result and function to the screen
    if (r.toString().length > 13) {
        $("#result").html("Digit Limit Met");
    } else { 
        $("#result").html(r);
    }
    
    if (f.length > 28) {
        $("#calculation").html("Digit Limit Met");
    } else if (f != 0) {
        $("#calculation").html(f);
    } else {
        $("#calculation").html("");
    }
}

function calculate(f) {
    //do the maths
    if (!prevEntry.match(regex)) {
        //prevents error if last entry is not number
        func = func.slice(0, -1);
    }
    result = parseFloat(eval(func).toFixed(5));
    display(func, result);
}

function reset() {
    //resets the calculator
    func = "";
    result = 0;
    prevEntry = "";
}