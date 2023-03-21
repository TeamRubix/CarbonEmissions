var res = document.getElementById('result');
var res2 = document.getElementById("result2");
var res3 = document.getElementById("result3");
var res4 = document.getElementById("result4");
var mpg = document.getElementById('mpg');
var dist = document.getElementById('dist');
var trip = document.getElementById('trips');
function calcCO2() {
    var custom = document.getElementById('calcBar');
    custom.className += 'circle';
    var x = mpg.value;
    var y = dist.value;
    var z = trips.value;
    var calc4 = (8.8 / x) * 1000;
    var calc = (calc4 * y) / 1000;
    var calc2 = (calc * z);
    var calc3 = (calc2 * 52);
    calc = calc.toFixed(2);
    calc2 = calc2.toFixed(2);
    calc3 = calc3.toFixed(2);
    calc4 = calc4.toFixed(1);
    console.log('calc is: ' + calc);
    res.innerHTML = calc;
    res2.innerHTML = calc2;
    res3.innerHTML = calc3;
    res4.innerHTML = calc4;
}