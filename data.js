function openWin() {
  window.open("https://en.wikipedia.org/wiki/Special:Random");
} 
  var limit = 10;
// Search Bar Functionality
 var contentContainer = document.getElementById("contentContainer"); 
var a = document.getElementById('tfnewsearch');
$('.tftextinput').on('input', function(e) { // "Borrowed" from https://codepen.io/victoriousj/pen/rLzZkr?editors=1011
  if ($('.tftextinput').val() !== '') {
    wiki($('.tftextinput').val());
  } else {
       contentContainer.innerHTML = "";
  }
});

function wiki(b) { 


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

function generateRandom(){
	var url = "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=" + limit; 
	 $.ajax({ 
    type: "GET",
    url: url,
    dataType: "jsonp",
    success: function(data) { 
	console.log(data);
		contentContainer.innerHTML = "";
		for (i = 0; i < limit; i++) {
			if (data.query.random[i].title != undefined) {
				var newData = "<a href=" + "'https://en.wikipedia.org/wiki/" + data.query.random[i].title + "' class='entry' id='" + i + "' >" + "<h3>" + data.query.random[i].title + "</h3></a>" + "<br>";
				contentContainer.innerHTML += newData;
			} else {
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