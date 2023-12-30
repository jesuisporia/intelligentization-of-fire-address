$.ajax({
  url: '/admin/siteview',
  type: 'get',
  success: function (data) {},
  complete: function (dat) {
    new Chart(document.getElementById("site_chart").getContext("2d"), getChartJs('line', dat));
  },
  error: function (xhr, ajaxOptions, thrownError) {
    alert(ajaxOptions)
  }
});

function getChartJs(type, dat) {
  console.log(dat.responseJSON.date)
  var config = null;
  config = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      // labels: dat.responseJSON.label  ,
      datasets: [{
          label: 'بازدید سایت',
          data: dat.responseJSON.data,
          borderColor: 'rgba(0, 188, 212, 0.75)',
          backgroundColor: 'rgba(0, 188, 212, 0.3)',
          pointBorderColor: 'rgba(0, 188, 212, 0)',
          pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
          pointBorderWidth: 1
        },
        {
          label: "بازدید کنده های واقعی",
          data: dat.responseJSON.realview,
          borderColor: 'rgba(233, 30, 99, 0.75)',
          backgroundColor: 'rgba(233, 30, 99, 0.3)',
          pointBorderColor: 'rgba(233, 30, 99, 0)',
          pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
          pointBorderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      legend: false
    }
  }
  return config;
}