$(document).ready(function() {
    $("#fetchAll").click(fetchAll);
    $("#add").click(add);
});

const tourDataURL = "/tourData";

function addToursAsElement(tours) {
    const targetDiv = $("#tours");
    targetDiv.empty();
    const results = [];
    tours.forEach(function(tour) {
        const tourDiv = $("<div>");
        tourDiv.addClass("tour");
        const tourFields = Object.keys(tour);
        for (var i = 0; i < tourFields.length; i++) {
            tourDiv.append(
                $("<span>")
                    .addClass("tourField")
                    .html(tourFields[i] + ": " + tour[tourFields[i]] || "null")
            );
        }
        tourDiv.append(
            $("<button>")
                .html("delete")
                .addClass("delete")
                .attr('id', tour.id)
                .click(function() {
                    remove(tour.id);
                })
        );
        results.push(tourDiv);
    });
    for (var i = 0; i < results.length; i++) {
        targetDiv.append(results[i]);
    }
}

function fetchAll() {
    $.get(tourDataURL, function(response) {
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse.error) {
            console.log(parsedResponse.error);
            alert("error");
        } else {
            addToursAsElement(parsedResponse.data);
        }
    });
}

function add() {
    const hasValue = function(text) {
        return (text.replace(/^\s+/g, '').length > 0);
    };
    const tour = {};
    const ch = $("#tourMenuFields").children();
    for (var i = 0; i < ch.length; i++) {
        if (hasValue(ch[i].lastElementChild.value)) {
            tour[ch[i].lastElementChild.id] = ch[i].lastElementChild.value;
        }
    }
    console.log(tour);
    $.ajax({
        url: tourDataURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(tour),
        success: function(response) {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.error) {
                console.log(parsedResponse.error);
                alert("error");
            } else {
                console.log("success");
                fetchAll();
            }
        }
    });
}

function remove(id) {
    console.log("removing tour " + id);
    $.ajax({
        url: tourDataURL,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({id: id}),
        success: function(response) {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.error) {
                console.log(parsedResponse.error);
                alert("error");
            } else {
                console.log("success");
                fetchAll();
            }
        }
    });
}
