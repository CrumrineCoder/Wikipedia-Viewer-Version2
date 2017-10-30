function openWin() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
} 

// Search Bar Functionality
var a = document.getElementById('tfnewsearch');
$('.tftextinput').on('input', function(e) { // "Borrowed" from https://codepen.io/victoriousj/pen/rLzZkr?editors=1011
  if ($('.tftextinput').val() !== '') {
    wiki($('.tftextinput').val());
  } else {
    $("#content").html(" <p id='randomText'>Click on the icon below to go to a random article, or use the search bar to find an article. </p> <a href='https://en.wikipedia.org/wiki/Special:Random'><img src='https://www.dropbox.com/s/mzk1pqc4stj9qz6/wikipedia%20logo.png?raw=1' id='randomArt'></a>");
  }
});

function wiki(b) { 
 var contentContainer = document.getElementById("contentContainer"); 
  var limit = 10;
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + b + "&limit=" + String(limit) + "&namespace=0&format=json";
  $.ajax({ 
    type: "GET",
    url: url,
    dataType: "jsonp",
    success: function(data) { 
     contentContainer.innerHTML = "";
      for (i = 0; i < limit; i++) {
        if (data[2][i] != undefined) {
		  
          var newData = "<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' >" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>" + "<br>";
          contentContainer.innerHTML += newData;
        } else if (data[2][i] == undefined) {
          contentContainer.innerHTML = "<h3 class='entry'> There are no articles to display </h3>"
        }
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      } 
  });
} 