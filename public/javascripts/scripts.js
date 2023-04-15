// function calcCO2() {
//   var custom = document.getElementById('calcBar');
//   custom.className += 'circle';
//   var x = mpg.value;
//   var y = dist.value;
//   var z = trips.value;
//   var calc4 = (8.8 / x) * 1000;
//   var calc = (calc4 * y) / 1000;
//   var calc2 = (calc * z);
//   var calc3 = (calc2 * 52);
//   calc = calc.toFixed(2);
//   calc2 = calc2.toFixed(2);
//   calc3 = calc3.toFixed(2);
//   calc4 = calc4.toFixed(1);
//   console.log('calc is: ' + calc);
//   res.innerHTML = calc;
//   res2.innerHTML = calc2;
//   res3.innerHTML = calc3;
//   res4.innerHTML = calc4;
// }

// Global + Canada Map Tooltips
$(function () {
  var world = document.getElementsByTagName("path");
  for (var i = 0; i < world.length; i++) {
    var country = world[i];
    country.setAttribute("data-toggle", "tooltip");
    country.setAttribute("data-placement", "top");
    country.setAttribute("title", country.getAttribute("id"));
  }
  $('[data-toggle="tooltip"]').tooltip()
})
