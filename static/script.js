// Night Out Javascript

// ~~~~~~~~~~~~~~~ Profile Page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(".decline_plan_btn").click(decline_plan);

function decline_plan() {
    var decline_url;

    // Use value of URL button to send request to the route to decline a plan
    if (confirm("Are you sure you would no longer like to attend this plan?") == true) {
      decline_url = this.value;
      $.post(decline_url, {});
      alert("This plan is no longer in your profile");
    }
}

$(document).ready(function(){
    // Make Line Chart of event frequency by month
    var ctx_line = $("#lineChart").get(0).getContext("2d");

    // Options for Chart JS
    var options = {
          responsive: true
        };

    // AJAX call to request user data for line chart
    $.get("/event-frequency.json", function (data) {
          var myLineChart = Chart.Line(ctx_line, {
                                        data: data,
                                        options: options
                                    });
    });

    // Buttons to show or collapse chart within Analytics tab
    $("#event-jchart").on("hide.bs.collapse", function(){
        $("#chart-btn").html("Show Chart");
    });
    $("#event-jchart").on("show.bs.collapse", function(){
        $("#chart-btn").html("Collapse Chart");
    });
});

// ~~~~~~~~~~~~~~~ Add/ Edit Plan ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}