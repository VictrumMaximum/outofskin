var slideIndex = 1;
var slideTimer;

$(document).ready(function() {
	fetchAll();
	addSelectButtons();
	showSlides(slideIndex);
	slideTimer = setInterval(nextSlide, 8000);
});

function nextSlide() {
	var previousIndex = slideIndex;
	slideIndex += 1;
    showSlides(previousIndex);
}

function showSlides(previousIndex) {
    var quotes = document.getElementsByClassName("quote");
	var selects = document.getElementsByClassName("select");
	
    if (slideIndex > quotes.length) {slideIndex = 1} 
    if (slideIndex < 1) {slideIndex = quotes.length};
	
	var prevQ = quotes[previousIndex - 1];
	var nextQ = quotes[slideIndex - 1];
	
	// fade out for 1 second
	prevQ.style.webkitAnimationName = "fadeOut";
	prevQ.style.webkitAnimationDuration = "1s";
	prevQ.style.animation = "fadeOut 1s";
	
	// don't timeout if this is the first time loading
	var timeout = 900;
	if(previousIndex == slideIndex) {
		timeout = 0;
	}
	setTimeout(function () {
		prevQ.style.display = "none"; // get rid of previous slide
		nextQ.style.display = "block"; // add next slide
		// fade in for 1 second
		nextQ.style.webkitAnimationName = "fadeIn";
		nextQ.style.webkitAnimationDuration = "1s";
		nextQ.style.animation = "fadeIn 1s";
	}, timeout);
	
	// change the highlight of the select buttons
	selects[previousIndex - 1].style.backgroundColor = "transparent";
	selects[slideIndex - 1].style.backgroundColor = "#ffefe0";
}

// adds the appropriate amount of select buttons for the slides/quotes
function addSelectButtons() {
	var selector = document.getElementById('slide-selector');
	var numberOfQuotes = document.getElementsByClassName("quote").length;
	var i;
	for (i = 0; i < numberOfQuotes; i++) {
		var div = document.createElement('div');
		div.className = "select";
		selector.appendChild(div);
	}
}

$(document).on('click', '.select', function() {
	var previousIndex = slideIndex;
	var index = $(this).index();
	slideIndex = index + 1;
	showSlides(previousIndex);
	// reset interval timer
	clearInterval(slideTimer);
	slideTimer = setInterval(nextSlide, 8000);
});

function convertDatetime(sqlDate) {
    const date = new Date(sqlDate);
    return moment(sqlDate).format("DD MMMM HH:mm");
}

function filterTours(tours) {
    const now = moment();
    return tours.filter(function (tour) {
        return now.isBefore(moment(tour.begin));
    });
}

function sortTours(tours) {
    const keys = Object.keys(tours);
    const unsorted = [];
    for (var i = 0; i < keys.length; i++) {
        const tour = tours[keys[i]];
        tour.id = keys[i];
        unsorted.push(tour);
    }
    console.log(unsorted);
    const sorted = [];
    while (unsorted.length > 0) {
        var minTourIndex = 0;
        for (var i = 0; i < unsorted.length; i++) {
            if (moment(unsorted[i].begin).isBefore(moment(unsorted[minTourIndex].begin))) {
                minTourIndex = i;
            }
        }
        sorted.push(unsorted[minTourIndex]);
        unsorted.splice(minTourIndex, 1);
    }
    console.log(sorted);
    return sorted;
}

function addToursAsPrettyElement(tours) {
    const targetDiv = $("#tours");
    targetDiv.empty();
    const results = [];
    tours.forEach(function(tour) {
        const tourTable = $("<table>");
        tourTable.css("width", "100%")
            .append($("<tbody>")
                .append($("<tr>")
                    .append($("<td>")
                        .addClass("datum")
                        .html(convertDatetime(tour.begin))
                    )
                )
                .append($("<tr>")
                    .append($("<td>")
                        .append($("<a>")
                            .html(tour.eventName)
                            .attr("href", tour.eventLink)
                            .attr("target", "_blank")
                        )
                    )
                )
                .append($("<tr>")
                    .append($("<td>")
                        .append($("<a>")
                            .html(tour.location + ", " + tour.city)
                            .attr("href", tour.locationLink)
                            .attr("target", "_blank")
                        )
                    )
                )
            );
        results.push(tourTable.append($("<br>")));
    });
    for (var i = 0; i < results.length; i++) {
        targetDiv.append(results[i]);
    }
}
const tourDataURL = "/tourData";
function fetchAll() {
    const options = {};
    options.limit = 5;
    options.orderBy = "begin";
    $.ajax({
        url: tourDataURL,
        type: 'GET',
        contentType: 'application/json',
        data: options,
        success: function(response) {
            const parsedResponse = JSON.parse(response);
            console.log(parsedResponse);
            if (parsedResponse.error) {
                console.log(parsedResponse.error);
            } else {
                addToursAsPrettyElement(filterTours(sortTours(parsedResponse.data)));
            }
        }
    });
}
