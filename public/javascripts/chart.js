window.onload = function() {
    var ctx = document.getElementById("myChart");
    var lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jashan", "Simar"],
        datasets: [{
          label: "2015",
          data: [10, 20]
        }]
      }
    })
  }