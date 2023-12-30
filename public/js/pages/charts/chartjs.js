var context = $(function () {

});
console.log(context)
$.ajax({
  url: '/admin/product/chartview',
  type: 'get',
  success: function (data) {
  },
  complete: function (dat) {
  new Chart(document.getElementById("line_chart").getContext("2d") , getChartJs('line' , dat));
  },
  error: function (xhr, ajaxOptions, thrownError) {
      alert(ajaxOptions)
  }
});
function getChartJs(type , dat) {
  console.log(dat.responseJSON)
  var config = null;
      config = {
          type: 'line',
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [{
                  label: dat.responseJSON.label,
                  data: dat.responseJSON.data,
                  borderColor: 'rgba(0, 188, 212, 0.75)',
                  backgroundColor: 'rgba(0, 188, 212, 0.3)',
                  pointBorderColor: 'rgba(0, 188, 212, 0)',
                  pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                  pointBorderWidth: 1
              }
              // ,
              //  {
              //         label: "My Second dataset",
              //         data: [28, 48, 40, 19, 86, 27, 90],
              //         borderColor: 'rgba(233, 30, 99, 0.75)',
              //         backgroundColor: 'rgba(233, 30, 99, 0.3)',
              //         pointBorderColor: 'rgba(233, 30, 99, 0)',
              //         pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
              //         pointBorderWidth: 1
              //     }
                ]
          },
          options: {
              responsive: true,
              legend: false
          }
      }
  return config;
}

