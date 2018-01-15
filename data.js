
// Opening a random Wikipedia Page 
function openWin() {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
}

// How many Wikipedia Entries are on a page at once. Totally arbitrary number
var limit = 10;

// Search Bar Functionality
var contentContainer = document.getElementById("contentContainer");
var a = document.getElementById('tfnewsearch');
// Event Listener for Input
$('.tftextinput').on('input', function(e) { 
	// If there's words in the search bar
    if ($('.tftextinput').val() !== '') {
		// Call the wiki function with the value in the search bar
        wiki($('.tftextinput').val());
    } else {
		// If there's no words in the search bar, make the results go away
        contentContainer.innerHTML = "";
    }
});

// Called for getting wikipedia articles
function wiki(b) {
	// api URL
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + b + "&limit=" + String(limit) + "&namespace=0&format=json";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(data) {
			// Reset the results
            contentContainer.innerHTML = "";
            for (i = 0; i < limit; i++) {
				// If there are wiki articles to display
                if (data[2][i] != undefined) {
					// Format the data
                    var newData = "<a href=" + "'https://en.wikipedia.org/wiki/" + data[1][i] + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data[1][i] + "</h3>" + "<br>" + data[2][i] + "</a>" + "<br>";\
					// Add the data to the results
                    contentContainer.innerHTML += newData;
                } else if (data[2][i] == undefined) {
					// If there's no wikipedi articles, tell the user
                    contentContainer.innerHTML = "<h3 class='entry'> There are no articles to display </h3>"
                }
            }
        },
		// Error handling: tell the error. 
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}

// Called for getting random wikipedia articles
function generateRandom() {
	// API URL
    var url = "https://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=" + limit;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        success: function(data) {
			// Reset the results
            contentContainer.innerHTML = "";
            for (i = 0; i < limit; i++) {
				// If there are wiki articles to display
                if (data.query.random[i].title != undefined) {
					// Format the data
                    var newData = "<a href=" + "'https://en.wikipedia.org/wiki/" + data.query.random[i].title + "' class='entry' id='" + i + "' target='_blank'>" + "<h3>" + data.query.random[i].title + "</h3></a>" + "<br>";
					// Add the data to the results
                    contentContainer.innerHTML += newData;
                } else {
                    contentContainer.innerHTML = "<h3 class='entry'> There are no articles to display </h3>"
                }
            }
        },
		// Error handling: tell the error. 
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        }
    });
}